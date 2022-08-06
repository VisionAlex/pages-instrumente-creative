import type { DataFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getProducts } from "~/providers/products/products";

export type IndexLoaderData = {
  products: Awaited<ReturnType<typeof getProducts>>;
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
      {products.products.edges.map(({ node: product }) => (
        <div key={product.id}>
          <h5>{product.title}</h5>
          <img
            src={product.imageSmall.edges[0].node.url}
            alt={product.imageSmall.edges[0].node.altText ?? ""}
          />
        </div>
      ))}
    </div>
  );
}
