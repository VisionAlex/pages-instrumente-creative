import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Hero } from "~/components/Hero";
import { ProductsHighlights } from "~/components/ProductHighlights";
import type { GetHighlightProductsQuery } from "~/generated/graphql";
import { getHighlightProducts } from "~/providers/products/products";

export type Products = GetHighlightProductsQuery["products"]["edges"];

export type IndexLoaderData = {
  products: Products;
};

export const loader = async () => {
  const products = await getHighlightProducts(3, "available_for_sale:true");

  const loaderData: IndexLoaderData = {
    products: products.products.edges,
  };
  return json(loaderData);
};

const Index: React.FC = () => {
  const { products } = useLoaderData<IndexLoaderData>();
  return (
    <div>
      <Hero />
      <ProductsHighlights products={products as Products} />
    </div>
  );
};

export default Index;
