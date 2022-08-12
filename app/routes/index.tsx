import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Hero } from "~/components/Hero";
import { ProductsHighlights } from "~/components/ProductHighlights";
import type { GetProductsQuery } from "~/generated/graphql";
import { getProducts } from "~/providers/products/products";

export type Products = GetProductsQuery["products"]["edges"];

export type IndexLoaderData = {
  products: Products;
};

export const loader = async () => {
  const products = await getProducts(3, "available_for_sale:true");

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
