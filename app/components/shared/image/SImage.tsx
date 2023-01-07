import type { ShopifyImage } from "./types";
import { getShopifyImageUrl } from "./utils";

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  image: ShopifyImage;
  width?: number;
}

export const SImage: React.FC<Props> = ({ image, width, ...rest }) => {
  return (
    <img
      src={getShopifyImageUrl(image.url, width ?? image.width)}
      alt={image.altText ?? ""}
      {...rest}
    />
  );
};
