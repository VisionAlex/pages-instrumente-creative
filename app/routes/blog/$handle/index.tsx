import type {
  HeadersFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import { PageHeader } from "~/components/shared/PageHeader";
import { NewsletterWidget } from "~/components/shared/widgets/NewsletterWidget";
import { SocialLinksWidget } from "~/components/shared/widgets/SocialLinksWidget";
import { TagsWidget } from "~/components/shared/widgets/TagsWidget";
import { PAGE_HANDLE } from "~/config";
import type { GetArticlesQuery, GetBlogQuery } from "~/generated/graphql";
import { getArticles } from "~/providers/pages/articles";
import { getBlog } from "~/providers/pages/blog";

const resoursesPageTags = [
  "CÂND ÎNVĂȚĂM CORPUL UMAN",
  "COLOREAZA",
  "CORPUL UMAN",
  "CUM SĂ ÎNVĂȚ COPILUL DESPRE CORPUL UMAN",
  "DE CE TREBUIE SĂ ÎNVEȚE COPILUL CORPUL UMAN",
  "DESCARCA GRATUIT",
];

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
  let articles = null;
  if (params.handle === PAGE_HANDLE.BLOG_RESOURCES) {
    const articlesQuery = await getArticles(30);
    articles = articlesQuery.articles.edges.filter(({ node: article }) => {
      return article.blog.handle === PAGE_HANDLE.BLOG_RESOURCES;
    });
  }
  let tags: string[] | undefined;
  if (params.handle === PAGE_HANDLE.BLOG_RESOURCES) {
    tags = resoursesPageTags;
  } else {
    tags = articles?.reduce((acc, { node: article }) => {
      if (article.tags) return [...acc, ...article.tags];
      return acc;
    }, [] as string[]);
  }
  return json(
    { blog: blogQuery.blog, articles, tags },
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
          <main className="col-span-7 lg:col-span-5 ">
            <ol className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {articles.map(({ node: article }) => {
                return (
                  <li
                    key={article.id}
                    className="border border-secondaryBackground"
                  >
                    <Link
                      to={article.handle}
                      prefetch="intent"
                      key={article.id}
                    >
                      <div className="aspect-w-1 aspect-h-1 object-contain object-center">
                        <img
                          src={article.image?.url}
                          alt={article.image?.altText ?? ""}
                        />
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </main>
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
