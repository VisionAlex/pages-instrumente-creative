import React from "react";
import type { DetailedProduct } from "~/types";
import { Variant } from "./Variant";

interface Props {
  variants: DetailedProduct["variants"]["edges"][number]["node"][];
  selectedVariant: number;
  setSelectedVariant: React.Dispatch<React.SetStateAction<number>>;
}

export const Variants: React.FC<Props> = ({
  variants,
  selectedVariant,
  setSelectedVariant,
}) => {
  return (
    <ol className="mt-4 flex flex-wrap gap-2">
      {variants.map((variant, index) => (
        <Variant
          key={index}
          title={variant.title}
          isSelected={index === selectedVariant}
          onClick={() => setSelectedVariant(index)}
        />
      ))}
    </ol>
  );
};
