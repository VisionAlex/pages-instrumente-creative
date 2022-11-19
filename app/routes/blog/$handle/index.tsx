import type {
  HeadersFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { Link as CustomLink } from "~/components/shared/Link";
import React from "react";
import { PageHeader } from "~/components/shared/PageHeader";
import { NewsletterWidget } from "~/components/shared/widgets/NewsletterWidget";
import { SocialLinksWidget } from "~/components/shared/widgets/SocialLinksWidget";
import { TagsWidget } from "~/components/shared/widgets/TagsWidget";
import { PAGE_HANDLE } from "~/config";
import type { GetArticlesQuery, GetBlogQuery } from "~/generated/graphql";
import { getArticles } from "~/providers/pages/articles";
import { getBlog } from "~/providers/pages/blog";
import { classNames } from "~/shared/utils/classNames";
import { getImageAspectRatio } from "~/shared/utils/getImageAspectRatio";

type LoaderData = {
  blog: NonNullable<GetBlogQuery["blog"]>;
  articles: GetArticlesQuery["articles"]["edges"];
  tags: string[];
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.handle) {
    throw new Response("Not found", { status: 404 });
  }
  const blogQuery = await getBlog(params.handle);
  if (!blogQuery.blog) {
    throw new Response("Not found", { status: 404 });
  }
  let articles;
  if (params.handle === PAGE_HANDLE.BLOG_RESOURCES) {
    const articlesQuery = await getArticles(30);
    articles = articlesQuery.articles.edges.filter(({ node: article }) => {
      return article.blog.handle === PAGE_HANDLE.BLOG_RESOURCES;
    });
  } else {
    articles = blogQuery.blog.articles.edges;
  }

  let tagScores: Record<string, number> = {};
  articles?.forEach(({ node: article }) => {
    article.tags.forEach((tag: string) => {
      if (!tagScores[tag]) {
        tagScores[tag] = 1;
      } else {
        tagScores[tag] += 1;
      }
    });
  });
  const tags = Object.keys(tagScores).sort((a, b) => {
    return tagScores[b] - tagScores[a];
  });

  return json(
    { blog: blogQuery.blog, articles, tags: tags.slice(0, 8) },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
};

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control") ?? "no-cache",
  };
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.blog.seo.title,
    description: data.blog.seo.description,
  };
};
const BlogIndex: React.FC = () => {
  const data = useLoaderData<LoaderData>();

  const articles = data.articles ? data.articles : data.blog.articles.edges;
  return (
    <div>
      <PageHeader customTitle={data.blog.title} />
      <div className="page mx-auto  px-5 lg:px-8 xl:px-20">
        <div className="grid grid-cols-7 gap-x-8 gap-y-8">
          <section className="col-span-7 lg:col-span-5 ">
            <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3">
              {articles.map(({ node: article }) => {
                return (
                  <li
                    key={article.id}
                    className="flex flex-col border border-secondaryBackground"
                  >
                    <Link
                      to={article.handle}
                      prefetch="intent"
                      key={article.id}
                    >
                      <div
                        className={classNames(
                          getImageAspectRatio(article.image),
                          "object-contain object-center"
                        )}
                      >
                        <img
                          src={article.image?.url}
                          alt={article.image?.altText ?? ""}
                        />
                      </div>
                    </Link>
                    <div className="mt-4 flex flex-grow flex-col p-5">
                      <Link className="mb-4" to={`/blog/${article.handle}`}>
                        <h2 className=" text-xl">{article.title}</h2>
                      </Link>
                      <div
                        className="mb-4 text-subtitle"
                        dangerouslySetInnerHTML={{
                          __html: article.excerptHtml!,
                        }}
                      />
                      <div className="flex-grow"></div>
                      <div>
                        <CustomLink
                          className="w-fit"
                          to={`/blog/${article.handle}`}
                        >
                          Citește mai mult
                        </CustomLink>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
          <aside className="col-span-7 lg:col-span-2">
            <SocialLinksWidget className="mb-8" />
            <NewsletterWidget className="mb-8" />
            <TagsWidget tags={data.tags} />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogIndex;
