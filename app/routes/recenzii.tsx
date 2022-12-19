import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { FadeIn } from "~/components/shared/FadeIn";
import { PageHeader } from "~/components/shared/PageHeader";
import { ReviewRating } from "~/components/shared/ReviewRating";
import { PAGE_HANDLE } from "~/config";
import type { GetPageQuery } from "~/generated/graphql";
import { createSdk } from "~/graphqlWrapper";
import { getPage } from "~/providers/pages/page";
import { formatDate } from "~/shared/utils/formatDate";
import pageStyles from "~/styles/page.css";

type Review = {
  id: number;
  priority: number;
  date: string;
  rating?: number;
  author: string;
  handle: string;
  content: string;
};

type LoaderData = {
  page: NonNullable<GetPageQuery["page"]>;
  reviews: Review[];
};

export const loader: LoaderFunction = async ({ context }) => {
  let reviews;
  if (context.ENV === "development") {
    const reviewJson = require("~/kv/reviews.json");
    if (!reviewJson)
      throw new Error(
        "No reviews found. Run 'npm run get:reviews' before starting the dev server."
      );
    reviews = reviewJson;
  } else {
    reviews = JSON.parse(
      (await (context.REVIEWS as KVNamespace).get("reviews")) ?? "[]"
    );
  }
  const sdk = createSdk(context);
  const page = await getPage(sdk, { handle: PAGE_HANDLE.REVIEWS });
  return json(
    {
      reviews,
      page: page.page,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    }
  );
};

export const headers = () => {
  return {
    "Cache-Control": "public, max-age=3600",
  };
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.page.seo.title,
    description: data.page.seo.description,
    keywords: "recenzii, instrumente creative, pareri",
  };
};

export const links = () => {
  return [{ rel: "stylesheet", href: pageStyles }];
};
const Reviews: React.FC = () => {
  const { reviews } = useLoaderData<LoaderData>();
  return (
    <FadeIn>
      <PageHeader />
      <div className="page mx-auto max-w-7xl px-5 lg:px-8 xl:px-20">
        <ul className="mt-6 space-y-10 divide-y divide-gray-200 border-t border-b border-gray-200 pb-10">
          {reviews.map((review) => {
            return (
              <li
                className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
                key={review.id}
              >
                <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                  <div className="flex items-center xl:col-span-1">
                    <ReviewRating />
                  </div>
                  <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                    <div
                      className="mt-3 space-y-6 text-sm text-gray-500"
                      dangerouslySetInnerHTML={{ __html: review.content }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                  <a
                    href={`https://www.instagram.com/${review.handle}/`}
                    className="font-medium text-primary"
                  >
                    {review.author}{" "}
                    <span className="text-subtitle"> @{review.handle}</span>
                  </a>
                  <time
                    dateTime={new Date(review.date).toString()}
                    className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                  >
                    {formatDate(new Date(review.date).toString())}
                  </time>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-10">
          Recenziile sunt transcrise din story-urile realizate de persoanele
          menționate, pe care le găsiți pe pagina de Instagram a{" "}
          <a
            className="font-bold"
            href="https://www.instagram.com/stories/highlights/17931413312260825/"
          >
            Editurii Instrumente Creative.
          </a>
        </div>
      </div>
    </FadeIn>
  );
};

export default Reviews;
