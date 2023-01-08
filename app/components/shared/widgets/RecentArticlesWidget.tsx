import { Link } from "@remix-run/react";
import React from "react";
import type { GetRecentArticlesQuery } from "~/generated/graphql";
import { classNames } from "~/shared/utils/classNames";
import { formatDate } from "~/shared/utils/formatDate";
import { SImage } from "../image/SImage";
import { WidgetTitle } from "./WidgetTitle";

interface Props {
  articles: NonNullable<GetRecentArticlesQuery["blog"]>["articles"]["edges"];
  className?: string;
}

export const RecentArticlesWidget: React.FC<Props> = ({
  articles,
  className,
}) => {
  if (!articles) return null;
  return (
    <div className={classNames(className)}>
      <WidgetTitle title="Postări recente" />
      <ul>
        {articles.map(({ node: article }) => {
          return (
            <li
              key={article.id}
              className="flex gap-4 border-b border-secondaryBackground py-4"
            >
              <SImage
                image={article.image}
                className="object-cover object-center"
                width={80}
                height={80}
              />
              <div>
                <Link
                  to={`/blog/${article.blog.handle}/${article.handle}`}
                  prefetch="intent"
                  className="text-lg line-clamp-2"
                >
                  {article.title}
                </Link>

                <time
                  dateTime={article.publishedAt}
                  className="block text-[#bcbcbc]"
                >
                  {formatDate(article.publishedAt)}
                </time>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
