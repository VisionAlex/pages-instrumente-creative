import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import { BsSearch } from "react-icons/bs";
import { AddToCart } from "~/components/AddToCart";
import { AddToWishlist } from "~/components/AddToWishlist";
import { ProductModal } from "~/components/ProductModal";
import { useProductModal } from "~/components/ProductModal/useProductModal";
import { FadeIn } from "~/components/shared/FadeIn";
import { SImage } from "~/components/shared/image/SImage";
import { PageHeader } from "~/components/shared/PageHeader";
import { Price } from "~/components/shared/Price";
import { SaleTag } from "~/components/shared/SaleTag";
import { config } from "~/config";
import { getWishlist } from "~/providers/products/products";
import type { RootContext } from "~/types";

export const meta: MetaFunction = () => {
  return {
    title: "Produse - Instrumente Creative",
  };
};

type LoaderData = {
  wishlist: string[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const wishlist = await getWishlist(request);
  return json({ wishlist });
};

const AllProducts: React.FC = () => {
  const { wishlist } = useLoaderData<LoaderData>();
  const { products, showNotification } = useOutletContext<RootContext>();
  const { isOpen, product, openModal, closeModal } = useProductModal(products);
  if (!products) return null;
  return (
    <FadeIn>
      <PageHeader className="max-w-screen-2xl" />
      <ProductModal
        open={isOpen}
        onClose={closeModal}
        product={product}
        wishlist={wishlist}
      />
      <div>
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-6 px-5 md:grid-cols-2 lg:grid-cols-3 lg:px-8 xl:px-20 2xl:grid-cols-4">
          {products.map((product, index) => {
            const isFavorite = wishlist.some((item) => item === product.id);
            return (
              <div
                key={product.id}
                className="max-2xl grid grid-cols-1 overflow-hidden border border-secondaryBackground "
                data-testId={`product-${index}`}
              >
                <Link
                  to={`${config.pages.produse.path}/${product.handle}`}
                  className=" relative cursor-pointer"
                >
                  <div className="aspect-w-3 aspect-h-4 object-contain object-center">
                    <SImage
                      image={product.images.edges[0].node}
                      loading="lazy"
                    />
                  </div>
                  {!product.availableForSale && (
                    <div className="absolute top-8 left-8 bg-tag py-0.5 px-1 text-sm text-white">
                      Stoc epuizat
                    </div>
                  )}
                  {product.availableForSale &&
                  product.productType !== "Gift Cards" ? (
                    <SaleTag
                      amount={product.priceRange.minVariantPrice.amount}
                      compareAtPrice={
                        product.compareAtPriceRange.minVariantPrice.amount
                      }
                      variant="secondary"
                    />
                  ) : null}
                </Link>
                <div className="z-10 flex flex-col border-t border-secondaryBackground py-8 px-8 text-subtitle xs:my-8 xs:border-t-0 xs:border-l xs:py-0">
                  <Link
                    className="hover:text-primary"
                    to={`${config.pages.produse.path}/${product.handle}`}
                  >
                    {product.title}
                  </Link>
                  <Price
                    price={product.priceRange.minVariantPrice.amount}
                    compareAtPrice={
                      product.compareAtPriceRange.minVariantPrice.amount
                    }
                    isGiftCard={product.productType === "Gift Cards"}
                  />
                  <div className="grow" />
                  <div className="mt-5 flex items-center gap-1.5 text-primary">
                    <AddToCart
                      product={product}
                      openModal={openModal}
                      asText
                      showNotification={showNotification}
                    />
                    <button
                      onClick={() => openModal(product)}
                      className="flex h-[44px] w-[44px] cursor-pointer items-center justify-center border border-primary transition-colors duration-500 hover:bg-primary hover:text-white"
                    >
                      <BsSearch />
                    </button>
                    <AddToWishlist
                      productID={product.id}
                      isFavorite={isFavorite}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
};

export default AllProducts;
