import { Link } from "@remix-run/react";
import React from "react";
import {
  getImageAspectRatio,
  getShopifyImageUrl,
} from "~/components/shared/image/utils";
import type { GetArticlesQuery } from "~/generated/graphql";
import { useBreakpoint } from "~/shared/hooks/useBreakpoint";

interface Props {
  resources: GetArticlesQuery["articles"]["edges"][number]["node"][];
}

export const ResourcesSection: React.FC<Props> = ({ resources }) => {
  const isDesktop = useBreakpoint("md");

  if (!resources.length) return null;
  return (
    <section className="mx-auto mt-10 max-w-7xl px-5 lg:px-8 xl:px-20">
      <h3 className="mb-7 text-center text-3xl leading-tight text-primary">
        Resurse gratuite
      </h3>
      <p className="text-center text-subtitle">
        Pentru dezvoltarea si educația copilului
      </p>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {resources.slice(0, isDesktop ? 3 : 4).map((resource) => {
          return (
            <Link
              to={`/blog/${resource.blog.handle}/${resource.handle}`}
              key={resource.id}
              className="mb-5"
            >
              <div className={getImageAspectRatio(resource.image)}>
                <img
                  src={getShopifyImageUrl(resource.image?.url, 430)}
                  alt={
                    resource.image?.altText ??
                    "cursor-pointer object-cover object-center"
                  }
                />
              </div>
              <h4 className="mt-3 text-center text-xl leading-tight text-primary">
                {resource.title}
              </h4>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
