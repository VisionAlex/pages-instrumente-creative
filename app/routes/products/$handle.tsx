import type { LoaderArgs, LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { sdk } from "graphqlWrapper";
import { useLayoutEffect } from "react";
import { ImageGallery } from "~/components/ImageGallery";
import { preloadImage } from "~/shared/utils/preloadImage";
import type { HandleProduct } from "~/types";

type ProductLoaderData = {
  product: HandleProduct;
};

export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderArgs) => {
  const productData = await sdk.getProductByHandle(
    { handle: params.handle! },
    { request }
  );

  if (!productData || !productData.product) {
    throw new Response("Not Found", {
      status: 404,
    });
  }
  const loaderData: ProductLoaderData = {
    product: productData.product,
  };
  return json(loaderData);
};

const SingleProduct: React.FC = () => {
  const { product } = useLoaderData<ProductLoaderData>();
  const images = product.imagesMedium.edges.map(({ node: image }) => image);

  useLayoutEffect(() => {
    Promise.all(images.map((image) => preloadImage(image.url)));
  }, [images]);

  if (!product) return <div>Produsul nu a fost gasit.</div>;

  return (
    <div className="mx-auto px-5 lg:max-w-7xl lg:px-8">
      <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
        <div className="rounded-md border border-line lg:col-span-4 lg:row-end-1">
          <ImageGallery images={images} />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
