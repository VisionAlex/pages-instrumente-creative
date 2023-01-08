import type { ShopifyImage } from "./types";
import { getShopifyImageUrl } from "./utils";

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  image?: ShopifyImage | null;
  width?: number;
}

export const SImage: React.FC<Props> = ({ image, width, ...rest }) => {
  if (!image) return null;
  return (
    <img
      src={getShopifyImageUrl(image.url, width ?? image.width)}
      alt={image.altText ?? ""}
      {...rest}
    />
  );
};
