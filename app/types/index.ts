import type {
  GetProductByHandleQuery,
  GetProductsQuery,
} from "../generated/graphql";

export type Product = GetProductsQuery["products"]["edges"][number]["node"];

export type Variant = Product["variants"]["edges"][number]["node"];

export type VariantInfo = Variant & {
  productID: string;
  title: string;
  handle: string;
  thumbnail: Product["thumbnail"];
  quantity: number;
};

export type DetailedProduct = NonNullable<GetProductByHandleQuery["product"]>;

export type RootContext = {
  products: Product[];
};
