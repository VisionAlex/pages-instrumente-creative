import { classNames } from "~/shared/utils/classNames";
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

export const SImage: React.FC<Props> = ({
  image,
  width,
  className,
  ...rest
}) => {
  if (!image) return null;
  return (
    <img
      src={getShopifyImageUrl(image.url, width ?? image.width)}
      alt={image.altText ?? ""}
      className={classNames("object-cover object-center transition", className)}
      loading="lazy"
      {...rest}
    />
  );
};
