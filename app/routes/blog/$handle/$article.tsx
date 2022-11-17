import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import type { GetBlogArticleQuery } from "~/generated/graphql";
import { getBlogArticle } from "~/providers/pages/articles";
import { CalendarIcon } from "@heroicons/react/outline";
import { getImageAspectRatio } from "~/shared/utils/getImageAspectRatio";
import { classNames } from "~/shared/utils/classNames";
import blogStyles from "~/styles/blog.css";
import { SocialLinksWidget } from "~/components/shared/widgets/SocialLinksWidget";
import { NewsletterWidget } from "~/components/shared/widgets/NewsletterWidget";
import { TagsWidget } from "~/components/shared/widgets/TagsWidget";

type LoaderData = {
  article: NonNullable<
    NonNullable<GetBlogArticleQuery["blog"]>["articleByHandle"]
  >;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { handle, article } = params;
  const articleQuery = await getBlogArticle(handle, article);
  if (!articleQuery?.blog?.articleByHandle) {
    throw new Response("Not found", { status: 404 });
  }
  return json({
    article: articleQuery["blog"].articleByHandle,
  });
};

export const links = () => {
  return [{ rel: "stylesheet", href: blogStyles }];
};

const Article: React.FC = () => {
  const { article } = useLoaderData<LoaderData>();

  return (
    <div className="page mx-auto  px-5 lg:px-8 xl:px-20">
      <div className="mt-8 grid grid-cols-7 gap-x-8">
        <main className="col-span-7 lg:col-span-5">
          <p className="mb-4 flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-primary" aria-hidden="true" />
            {new Date(article.publishedAt).toLocaleDateString("ro-RO", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="mt-4 mb-8">
            <h1 className="text-3xl">{article.title}</h1>
          </div>
          <div
            className={classNames(
              getImageAspectRatio(article.image),
              "object-contain object-center"
            )}
          >
            <img src={article.image?.url} alt={article.image?.altText ?? ""} />
          </div>
          <div>
            <div
              className="blog my-8"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          </div>
        </main>
        <aside className="col-span-7 lg:col-span-2">
          <SocialLinksWidget className="mb-8" />
          <NewsletterWidget className="mb-8" />
          <TagsWidget tags={article.tags} />
        </aside>
      </div>
    </div>
  );
};
export default Article;
