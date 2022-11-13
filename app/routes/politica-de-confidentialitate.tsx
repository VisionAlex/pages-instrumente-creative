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
  const page = await getPage({ handle: PAGE_HANDLE.PRIVACY_POLICY });
  return json({
    page: page.page,
  });
};

export const links = () => {
  return [{ rel: "stylesheet", href: pageStyles }];
};

const PrivacyPolicy: React.FC = () => {
  const { page } = useLoaderData<LoaderData>();
  return (
    <div>
      <PageHeader />
      <div
        className="page mx-5 lg:mx-8 xl:mx-20"
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </div>
  );
};

export default PrivacyPolicy;
