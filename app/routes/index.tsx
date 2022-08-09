import type { DataFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Hero } from "~/components/Hero";
import { ProductsTab } from "~/components/ProductsTab";
import { getProducts } from "~/providers/products/products";

export type Products = Awaited<ReturnType<typeof getProducts>>;

export type IndexLoaderData = {
  products: Products;
};

export const loader = async ({
  request,
  params,
  context,
}: DataFunctionArgs) => {
  const products = await getProducts(3);
  const loaderData: IndexLoaderData = {
    products,
  };
  return json(loaderData);
};

export default function Index() {
  const { products } = useLoaderData<IndexLoaderData>();
  return (
    <div>
      <Hero />
    </div>
  );
}
