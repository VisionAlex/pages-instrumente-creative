import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { FadeIn } from "~/components/shared/FadeIn";
import { PageHeader } from "~/components/shared/PageHeader";
import { ReviewRating } from "~/components/shared/ReviewRating";
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
  reviews: Review[];
};

export const loader: LoaderFunction = async ({ context }) => {
  let reviews;
  if (context.ENV === "development") {
    reviews = await fetch("https://reviews.adm-alexandru1.workers.dev/").then(
      (res) => res.json()
    );
  } else {
    reviews = JSON.parse(
      (await (context.REVIEWS as KVNamespace).get("reviews")) ?? "[]"
    );
  }
  return json(
    {
      reviews,
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

export const meta: MetaFunction = () => {
  return {
    title: "Recenzii produse Editura Instrumente Creative",
    description:
      "Află părerea celor care au intrat în posesia produselor Editurii Instrumente Creative. Recenzii ale produselor: Animale și mediul lor de viață, Casa mea! Potrivește, Primele Cuvinte - singular și plural, Sunete, Seturi Puzzle Animale Hrană și foloase.",
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
                      className="mt-3 space-y-6 text-sm text-subtitle"
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
