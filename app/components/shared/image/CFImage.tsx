import React from "react";
import { images } from "~/config";
import { classNames } from "~/shared/utils/classNames";
import { BlurrableImage } from "./BlurableImage";
import type { CloudflareImage } from "./types";

interface Props {
  image: CloudflareImage;
  width?: number;
  className?: string;
  loading?: "lazy" | "eager";
}

export const CFImage: React.FC<Props> = ({
  image,
  width,
  className,
  loading = "lazy",
}) => {
  return (
    <BlurrableImage
      img={
        <img
          src={`${images.baseUrl}${image.src}/w=${width ?? image.width}`}
          alt={image.alt}
          className={classNames(
            "object-cover object-center transition",
            className
          )}
          loading={loading}
        />
      }
      blurDataUrl={image.blurDataUrl}
    />
  );
};
