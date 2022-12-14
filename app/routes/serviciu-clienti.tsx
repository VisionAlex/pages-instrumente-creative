import type {
  HeadersFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
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
  const sdk = createSdk(context);
  const page = await getPage(sdk, { handle: PAGE_HANDLE.CUSTOMER_SERVICE });
  return json(
    {
      page: page.page,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=86400",
      },
    }
  );
};

export const links = () => {
  return [{ rel: "stylesheet", href: pageStyles }];
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "public, max-age=86400",
  };
};

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data.page.seo.title,
    description: data.page.seo.description,
  };
};
const CustomerService: React.FC = () => {
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

export default CustomerService;
