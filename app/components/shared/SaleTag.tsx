import React from "react";
import { classNames } from "~/shared/utils/classNames";

interface Props {
  amount: string;
  compareAtPrice?: string;
  variant?: "primary" | "secondary";
}

export const SaleTag: React.FC<Props> = ({
  amount,
  compareAtPrice,
  variant = "primary",
}) => {
  if (!Number(compareAtPrice) || !Number(amount)) return null;
  const salePercentage = Math.round(
    ((Number(compareAtPrice) - Number(amount)) / Number(compareAtPrice)) * 100
  );
  if (variant === "secondary") {
    return (
      <div className="absolute top-0 left-0 rounded-sm bg-primary p-2 text-white">
        Reducere {salePercentage}%
      </div>
    );
  }
  return (
    <div
      className={
        "absolute top-0 left-0 rounded-sm bg-green-600 p-1 text-sm text-white"
      }
    >
      {salePercentage}%
    </div>
  );
};
