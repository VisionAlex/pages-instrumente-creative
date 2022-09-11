import type { GetProductsQuery } from "./generated/graphql";

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type Products = GetProductsQuery["products"]["edges"];

export type Product = ArrayElement<Products>["node"];

export type Variants = Product["variants"]["edges"];

export type Variant = ArrayElement<Variants>["node"];

export type VariantInfo = Variant & {
  productID: string;
  title: string;
  handle: string;
  thumbnail: Product["thumbnail"];
  quantity: number;
};
