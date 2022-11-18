import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import React from "react";
import { NewsletterWidget } from "~/components/shared/widgets/NewsletterWidget";
import { RecentArticlesWidget } from "~/components/shared/widgets/RecentArticlesWidget";
import { SocialLinksWidget } from "~/components/shared/widgets/SocialLinksWidget";
import { TagsWidget } from "~/components/shared/widgets/TagsWidget";
import { PAGE_HANDLE } from "~/config";
import type { GetBlogQuery } from "~/generated/graphql";
import { getRecentArticles } from "~/providers/pages/blog";

type LoaderData = {
  articles: NonNullable<GetBlogQuery["blog"]>["articles"]["edges"];
};

export const loader: LoaderFunction = async () => {
  const blog = await getRecentArticles(PAGE_HANDLE.BLOG_CHILD_DEVELOPMENT, 5);
  return json({
    articles: blog.blog?.articles?.edges,
  });
};

const Index: React.FC = () => {
  const data = useLoaderData<LoaderData>();
  const { tags, id } = useOutletContext<{ tags: string[]; id: string }>();
  const articles = data.articles
    .filter(({ node: article }) => {
      return article.id !== id;
    })
    .slice(0, 3);

  return (
    <div>
      <SocialLinksWidget className="mb-8" />
      <RecentArticlesWidget articles={articles} className="mb-8" />
      <NewsletterWidget className="mb-8" />
      <TagsWidget tags={tags} className="mb-8" />
    </div>
  );
};

export default Index;