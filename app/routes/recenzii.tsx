import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { FadeIn } from "~/components/shared/FadeIn";
import { PageHeader } from "~/components/shared/PageHeader";
import { PAGE_HANDLE } from "~/config";
import type { GetPageQuery } from "~/generated/graphql";
import { createSdk } from "~/graphqlWrapper";
import { getPage } from "~/providers/pages/page";
import pageStyles from "~/styles/page.css";

type LoaderData = {
  page: NonNullable<GetPageQuery["page"]>;
};

export const loader: LoaderFunction = async ({ context }) => {
  console.log(context);
  const kv = context.REVIEWS as KVNamespace;
  const reviews = await kv.list({ limit: 10 });
  console.log(reviews);
  const sdk = createSdk(context);
  const page = await getPage(sdk, { handle: PAGE_HANDLE.REVIEWS });
  return json(
    {
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
  const { page } = useLoaderData<LoaderData>();
  return (
    <FadeIn>
      <PageHeader />
      <div
        className="page mx-auto max-w-7xl px-5 lg:px-8 xl:px-20"
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </FadeIn>
  );
};

export default Reviews;
