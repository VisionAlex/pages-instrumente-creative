import { useOutletContext } from "@remix-run/react";
import { Hero } from "~/components/Hero";
import { ProductsHighlights } from "~/components/ProductHighlights";
import type { Product } from "~/types";

const Index: React.FC = () => {
  const { products } = useOutletContext<{ products: Product[] }>();
  return (
    <div>
      <Hero />
      <ProductsHighlights
        products={products
          .filter((product) => product.availableForSale)
          .slice(0, 3)}
      />
    </div>
  );
};

export default Index;
