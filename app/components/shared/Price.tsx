import React from "react";

interface Props {
  price: string;
  compareAtPrice?: string;
  isGiftCard?: boolean;
}

export const Price: React.FC<Props> = ({
  price,
  compareAtPrice,
  isGiftCard,
}) => {
  return (
    <p className=" mt-2">
      {isGiftCard ? "de la " : null}
      {Number(compareAtPrice) ? (
        <span className="mr-2 text-lg text-subtitle line-through">
          {Number(compareAtPrice)} lei
        </span>
      ) : null}
      <span className="text-lg text-primary">{Number(price)} lei</span>
    </p>
  );
};
