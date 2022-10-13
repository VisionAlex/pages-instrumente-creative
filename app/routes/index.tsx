import { useOutletContext } from "@remix-run/react";
import { Hero } from "~/components/Hero";
import { ProductsHighlights } from "~/components/ProductHighlights";
import type { Products } from "~/types";

const Index: React.FC = () => {
  const { products } = useOutletContext<{ products: Products }>();
  return (
    <div>
      <Hero />
      <ProductsHighlights
        products={products
          .filter((product) => product.node.availableForSale)
          .slice(0, 3)}
      />
    </div>
  );
};

export default Index;
