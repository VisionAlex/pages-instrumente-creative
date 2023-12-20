import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { FadeIn } from "~/components/shared/FadeIn";
import { PageHeader } from "~/components/shared/PageHeader";
import { PAGE_HANDLE, images } from "~/config";
import type { GetPageQuery } from "~/generated/graphql";
import { createSdk } from "~/graphqlWrapper";
import { getPage } from "~/providers/pages/page";
import pageStyles from "~/styles/page.css";

const about = `${images.baseUrl}${images.images.about.src}`;

type LoaderData = {
  page: NonNullable<GetPageQuery["page"]>;
};

export const loader: LoaderFunction = async ({ context }) => {
  const sdk = createSdk(context);
  const page = await getPage(sdk, { handle: PAGE_HANDLE.ABOUT });
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

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: pageStyles }];
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "public, max-age=86400",
  };
};

const About: React.FC = () => {
  const { page } = useLoaderData<LoaderData>();
  return (
    <FadeIn>
      <PageHeader />
      <div className="aspect-w-3 aspect-h-2 w-full overflow-hidden">
        <picture className="object-cover object-center transition">
          <source srcSet={`${about}/w=1980`} media="(min-width: 1536px)" />
          <source srcSet={`${about}/w=1536`} media="(min-width: 1280px)" />
          <source srcSet={`${about}/w=1280`} media="(min-width: 1024px)" />
          <source srcSet={`${about}/w=1024`} media="(min-width: 768px)" />
          <source srcSet={`${about}/w=768`} media="(min-width:640px)" />
          <img src={`${about}/w=500`} alt="Instrumente Creative" />
        </picture>
      </div>
      <div
        className="page mx-auto mt-4 max-w-7xl px-5 lg:px-8 xl:px-20"
        dangerouslySetInnerHTML={{ __html: page.body }}
      />
    </FadeIn>
  );
};

export default About;
