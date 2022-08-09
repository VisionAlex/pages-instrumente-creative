import type { DataFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Hero } from "~/components/Hero";
import { ProductsHighlights } from "~/components/ProductHighlights";
import type { GetAllProductsQuery } from "~/generated/graphql";
import { getProducts } from "~/providers/products/products";

export type Products = GetAllProductsQuery["products"]["edges"];

export type IndexLoaderData = {
  products: Products;
  availableProducts: Products;
};

export const loader = async ({
  request,
  params,
  context,
}: DataFunctionArgs) => {
  const products = await getProducts(20);
  const availableProducts = products.products.edges.filter(
    (p) => p.node.availableForSale
  );
  console.log({ availableProducts });
  const loaderData: IndexLoaderData = {
    products: products.products.edges,
    availableProducts,
  };
  return json(loaderData);
};

export default function Index() {
  const { availableProducts } = useLoaderData<IndexLoaderData>();
  console.log({ availableProducts });
  return (
    <div>
      <Hero />
      <ProductsHighlights products={availableProducts as Products} />
    </div>
  );
}
