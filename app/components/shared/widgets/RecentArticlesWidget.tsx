import { Link } from "@remix-run/react";
import React from "react";
import type { GetRecentArticlesQuery } from "~/generated/graphql";
import { classNames } from "~/shared/utils/classNames";
import { formatDate } from "~/shared/utils/formatDate";
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
              <img
                width={70}
                height={70}
                src={article.thumbnail?.url}
                alt={article.thumbnail?.altText ?? ""}
              />
              <div>
                <Link to={article.handle} prefetch="intent" className="text-lg">
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
