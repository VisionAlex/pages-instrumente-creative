import { StarIcon } from "@heroicons/react/solid";
import React from "react";
import { classNames } from "~/shared/utils/classNames";

interface Props {
  rating?: number;
  className?: string;
}

export const ReviewRating: React.FC<Props> = ({ rating = 5, className }) => {
  return (
    <div className={classNames("flex items-center", className)}>
      {[0, 1, 2, 3, 4].map((starNumber) => (
        <StarIcon
          key={starNumber}
          className={classNames(
            rating > starNumber ? "text-yellow-400" : "text-gray-300",
            "h-5 w-5 flex-shrink-0"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};
