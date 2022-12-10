import type { HeadersFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import React from "react";
import { PageHeader } from "~/components/shared/PageHeader";
import { PAGE_HANDLE } from "~/config";
import type { GetPageQuery } from "~/generated/graphql";
import { getPage } from "~/providers/pages/page";
import pageStyles from "~/styles/page.css";

type LoaderData = {
  page: NonNullable<GetPageQuery["page"]>;
};

export const loader = async () => {
  const page = await getPage({ handle: PAGE_HANDLE.CUSTOMER_SERVICE });
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader />
      <div
        className="page mx-auto max-w-7xl px-5 lg:px-8 xl:px-20"
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </motion.div>
  );
};

export default CustomerService;
