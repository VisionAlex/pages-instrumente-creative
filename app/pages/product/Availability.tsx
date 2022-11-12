import React from "react";
import { classNames } from "~/shared/utils/classNames";

interface Props {
  inStock?: boolean;
}

export const Availability: React.FC<Props> = ({ inStock }) => {
  return (
    <p>
      Disponibilitate:{" "}
      <span className={classNames(inStock ? "text-primary" : "text-red-500")}>
        {inStock ? "In stoc" : "Stoc epuizat"}
      </span>
    </p>
  );
};
