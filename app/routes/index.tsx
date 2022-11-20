import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { Hero } from "~/components/Hero";
import { ProductsHighlights } from "~/components/ProductHighlights";
import { getWishlist } from "~/providers/products/products";
import type { Product } from "~/types";

type LoaderData = {
  wishlist: string[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const wishlist = await getWishlist(request);
  return json({ wishlist });
};

const Index: React.FC = () => {
  const { wishlist } = useLoaderData<LoaderData>();

  const { products } = useOutletContext<{ products: Product[] }>();
  return (
    <div>
      <Hero />
      <ProductsHighlights
        wishlist={wishlist}
        products={products
          .filter((product) => product.availableForSale)
          .slice(0, 3)}
      />
    </div>
  );
};

export default Index;
