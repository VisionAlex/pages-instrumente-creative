import type {
  HeadersFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Link,
  useCatch,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import React from "react";
import { FadeIn } from "~/components/shared/FadeIn";
import { Link as CustomLink } from "~/components/shared/Link";
import { PageHeader } from "~/components/shared/PageHeader";
import { NewsletterWidget } from "~/components/shared/widgets/NewsletterWidget";
import { SocialLinksWidget } from "~/components/shared/widgets/SocialLinksWidget";
import { TagsWidget } from "~/components/shared/widgets/TagsWidget";
import { PAGE_HANDLE } from "~/config";
import type { GetArticlesQuery, GetBlogQuery } from "~/generated/graphql";
import { createSdk } from "~/graphqlWrapper";
import { getArticles } from "~/providers/pages/articles";
import { getBlog } from "~/providers/pages/blog";
import { classNames } from "~/shared/utils/classNames";
import { getImageAspectRatio } from "~/shared/utils/getImageAspectRatio";
import type { RootContext } from "~/types";

type LoaderData = {
  blog: NonNullable<GetBlogQuery["blog"]>;
  articles: GetArticlesQuery["articles"]["edges"];
  tags: string[];
};

export const loader: LoaderFunction = async ({ params, context }) => {
  if (!params.handle) {
    throw new Response("Not found", { status: 404 });
  }

  const sdk = createSdk(context);
  const blogQuery = await getBlog(sdk, params.handle);
  if (!blogQuery.blog) {
    throw new Response("Not found", { status: 404 });
  }

  let articles;
  if (params.handle === PAGE_HANDLE.BLOG_RESOURCES) {
    const articlesQuery = await getArticles(sdk, { first: 30 });
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

export function CatchBoundary() {
  const caught = useCatch();
  if (caught.status === 404) {
    return (
      <div className="mt-8 flex w-full flex-col items-center justify-center gap-4">
        <h1>Oops!</h1>
        <p>Pagina nu exista pe Instrumente Creative</p>
      </div>
    );
  }
  throw new Error(`Unhandled error", ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="mx-auto mt-8 flex w-fit max-w-2xl flex-col items-center justify-center p-4">
      <h1 className="text-center text-lg text-red-700">Eroare!</h1>
      <p className="text-subtitle">Ne pare rău. Serverul e zăpăcit.</p>
      <p className="mt-4">{error.message}</p>
    </div>
  );
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control") ?? "no-cache",
  };
};

export const meta: MetaFunction = ({ data }) => {
  if (!data?.blog) return { title: "Instrumente Creative - Pagina nu exista" };
  return {
    title: data.blog.seo.title,
    description: data.blog.seo.description,
  };
};
const BlogIndex: React.FC = () => {
  const data = useLoaderData<LoaderData>();
  const { user } = useOutletContext<RootContext>();
  const articles = data.articles ? data.articles : data.blog.articles.edges;
  return (
    <FadeIn>
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
            <NewsletterWidget className="mb-8" user={user} />
            <TagsWidget tags={data.tags} />
          </aside>
        </div>
      </div>
    </FadeIn>
  );
};

export default BlogIndex;
