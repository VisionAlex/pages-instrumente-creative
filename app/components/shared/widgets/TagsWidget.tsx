import { Link } from "@remix-run/react";
import { classNames } from "~/shared/utils/classNames";
import { WidgetTitle } from "./WidgetTitle";

interface Props {
  tags: string[];
  className?: string;
}

export const TagsWidget: React.FC<Props> = ({ tags, className }) => {
  return (
    <div className={classNames(className)}>
      <WidgetTitle title="Etichete" />
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => {
          return (
            <Link
              to={`/blog/tags/${tag}`}
              key={tag}
              className="rounded-xl border border-secondaryBackground px-2 py-1 text-xs uppercase tracking-[0.01em] transition-colors duration-400 hover:border-primary "
            >
              {tag}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
