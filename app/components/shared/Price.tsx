import React from "react";

interface Props {
  amount: string;
  compareAtPrice?: string;
  isGiftCard?: boolean;
}

export const Price: React.FC<Props> = ({
  amount,
  compareAtPrice,
  isGiftCard,
}) => {
  return (
    <p className=" mt-2">
      {isGiftCard ? "de la " : null}
      {Number(compareAtPrice) ? (
        <span className="mr-2 text-subtitle line-through">
          {Number(compareAtPrice)} lei
        </span>
      ) : null}
      <span className="text-primary">{Number(amount)} lei</span>
    </p>
  );
};
