import { Link } from "@remix-run/react";
import React from "react";
import { SImage } from "~/components/shared/image/SImage";
import { getImageAspectRatio } from "~/components/shared/image/utils";
import { Link as CustomLink } from "~/components/shared/Link";
import type { GetArticlesQuery } from "~/generated/graphql";

interface Props {
  articles: GetArticlesQuery["articles"]["edges"][number]["node"][];
}

export const ArticlesSection: React.FC<Props> = ({ articles }) => {
  if (!articles.length) {
    return null;
  }
  return (
    <section className="mx-auto mt-10 max-w-7xl px-5 lg:px-8 xl:px-20">
      <h3 className="mb-7 text-center text-3xl leading-tight text-primary">
        Descoperă mai multe despre dezvoltarea armonioasă a copilului tău
      </h3>
      <div className="lg: mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <div
            key={article.id}
            className="border border-secondaryBackground pb-5"
          >
            <Link
              to={`/blog/${article.blog.handle}/${article.handle}`}
              className="mb-5"
            >
              <div className={getImageAspectRatio(article.image)}>
                <SImage
                  image={article.image}
                  width={430}
                  className="cursor-pointer object-cover object-center"
                />
              </div>
              <h4 className="mt-4 px-5 text-center text-xl leading-tight text-primary">
                {article.title}
              </h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: article.excerptHtml ?? "",
                }}
                className="mt-5 px-5 text-subtitle"
              />
            </Link>
            <div className="mt-5 px-5">
              <CustomLink
                className="w-fit"
                to={`/blog/${article.blog.handle}/${article.handle}`}
              >
                Citește mai mult
              </CustomLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
