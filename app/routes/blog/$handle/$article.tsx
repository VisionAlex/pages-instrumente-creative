import { CalendarIcon } from "@heroicons/react/outline";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Outlet,
  useCatch,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import React from "react";
import invariant from "tiny-invariant";
import { FadeIn } from "~/components/shared/FadeIn";
import type { GetBlogArticleQuery } from "~/generated/graphql";
import { createSdk } from "~/graphqlWrapper";
import { getBlogArticle } from "~/providers/pages/articles";
import { classNames } from "~/shared/utils/classNames";
import { formatDate } from "~/shared/utils/formatDate";
import { getImageAspectRatio } from "~/shared/utils/getImageAspectRatio";
import blogStyles from "~/styles/blog.css";
import type { RootContext } from "~/types";

export type BlogArticle = NonNullable<
  NonNullable<GetBlogArticleQuery["blog"]>["articleByHandle"]
>;

type LoaderData = {
  article: BlogArticle;
};

export const loader: LoaderFunction = async ({ params, context }) => {
  const sdk = createSdk(context);
  const { handle, article } = params;
  invariant(typeof handle === "string", "Missing param");
  invariant(typeof article === "string", "Missing param");

  const articleQuery = await getBlogArticle(sdk, {
    handle,
    articleHandle: article,
  });
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

export function CatchBoundary() {
  const caught = useCatch();
  if (caught.status === 404) {
    return (
      <div className="mt-8 flex w-full flex-col items-center justify-center gap-4">
        <h1>Oops!</h1>
        <p>Acest articol nu exista pe Instrumente Creative</p>
      </div>
    );
  }
  throw new Error(`Unhandled error", ${caught.status}`);
}
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <FadeIn className="mx-auto mt-8 flex w-fit max-w-2xl flex-col items-center justify-center p-4">
      <h1 className="text-center text-lg text-red-700">Eroare!</h1>
      <p className="text-subtitle">Ne pare rău. Serverul e zăpăcit.</p>
      <p className="mt-4">{error.message}</p>
    </FadeIn>
  );
}

const Article: React.FC = () => {
  const { article } = useLoaderData<LoaderData>();
  const { user } = useOutletContext<RootContext>();

  return (
    <FadeIn className="page mx-auto  px-5 lg:px-8 xl:px-20">
      <div className="mt-8 grid grid-cols-7 gap-x-8">
        <section className="col-span-7 lg:col-span-5">
          <p className="mb-4 flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-primary" aria-hidden="true" />
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
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
        </section>
        <aside className="col-span-7 lg:col-span-2">
          <Outlet context={{ tags: article.tags, id: article.id, user }} />
        </aside>
      </div>
    </FadeIn>
  );
};
export default Article;
