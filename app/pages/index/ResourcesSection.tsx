import { Link } from "@remix-run/react";
import React from "react";
import { SImage } from "~/components/shared/image/SImage";
import { getImageAspectRatio } from "~/components/shared/image/utils";
import type { GetArticlesQuery } from "~/generated/graphql";
import { classNames } from "~/shared/utils/classNames";

interface Props {
  resources: GetArticlesQuery["articles"]["edges"][number]["node"][];
}

export const ResourcesSection: React.FC<Props> = ({ resources }) => {
  if (!resources.length) return null;
  return (
    <section className="mx-auto mt-10 max-w-screen-2xl px-5 lg:px-8 xl:px-20">
      <h3 className="mb-7 text-center text-3xl leading-tight text-primary">
        Resurse gratuite
      </h3>
      <p className="text-center text-subtitle">
        Pentru dezvoltarea si educația copilului
      </p>
      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {resources.slice(0, 6).map((resource, index) => {
          return (
            <Link
              to={`/blog/${resource.blog.handle}/${resource.handle}`}
              key={resource.id}
              className={classNames(
                "mb-5",
                index === 3 ? "sm:hidden md:block" : "",
                index === 4 ? "hidden lg:block" : "",
                index === 5 ? "hidden xl:block" : ""
              )}
            >
              <div className={getImageAspectRatio(resource.image)}>
                <SImage
                  image={resource.image}
                  width={430}
                  className="cursor-pointer object-cover object-center"
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
