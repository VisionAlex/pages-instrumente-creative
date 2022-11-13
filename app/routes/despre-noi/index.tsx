import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
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
  const page = await getPage({ handle: PAGE_HANDLE.ABOUT });
  return json({
    page: page.page,
  });
};

export const links = () => {
  return [{ rel: "stylesheet", href: pageStyles }];
};

const About: React.FC = () => {
  const { page } = useLoaderData<LoaderData>();
  return (
    <div>
      <PageHeader />
      <div
        className="page mx-auto max-w-7xl px-5 lg:px-8 xl:px-20"
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </div>
  );
};

export default About;
