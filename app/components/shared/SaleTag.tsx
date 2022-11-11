import React from "react";
import { classNames } from "~/shared/utils/classNames";

interface Props {
  amount: string;
  compareAtPrice?: string;
}

export const SaleTag: React.FC<Props> = ({ amount, compareAtPrice }) => {
  if (!Number(compareAtPrice) || !Number(amount)) return null;
  const salePercentage = Math.round(
    ((Number(compareAtPrice) - Number(amount)) / Number(compareAtPrice)) * 100
  );
  return (
    <div className={"absolute top-4 left-4 bg-green-500 text-white"}>
      {salePercentage}%
    </div>
  );
};
