import type { DataFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Logo } from "~/components/Logo";
import { Menu } from "~/components/Menu";
import { Navbar } from "~/components/Navbar";
import { ProductsTab } from "~/components/ProductsTab";
import { ScrollToTop } from "~/components/ScrollToTop";
import { Toolbar } from "~/components/Toolbar";
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
      <Navbar>
        <Logo />
        <Menu />
        <Toolbar />
      </Navbar>
      <ScrollToTop />
      <main className="pt-[123px]">
        <ProductsTab products={products as Products} />
        <ProductsTab products={products as Products} />
      </main>
    </div>
  );
}
