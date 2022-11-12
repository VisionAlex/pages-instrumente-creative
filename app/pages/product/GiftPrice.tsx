import React from "react";

interface Props {
  price: string;
}

export const GiftPrice: React.FC<Props> = ({ price }) => {
  return (
    <p className="text-lg text-primary">
      Valoare: <span className="text-subtitle">{price} lei</span>
    </p>
  );
};
