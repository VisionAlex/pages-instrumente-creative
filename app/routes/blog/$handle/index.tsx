import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { PageHeader } from "~/components/shared/PageHeader";
import { PAGE_HANDLE } from "~/config";
import type { GetArticlesQuery, GetBlogQuery } from "~/generated/graphql";
import { getArticles } from "~/providers/pages/articles";
import { getBlog } from "~/providers/pages/blog";

type LoaderData = {
  blog: NonNullable<GetBlogQuery["blog"]>;
  articles: GetArticlesQuery["articles"]["edges"];
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
  return json({ blog: blogQuery.blog, articles });
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
      <div className="page mx-auto max-w-7xl px-5 lg:px-8 xl:px-20">
        {articles.map(({ node: article }) => {
          return (
            <div key={article.id}>
              <img
                src={article.image?.url}
                alt={article.image?.altText ?? ""}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogIndex;
