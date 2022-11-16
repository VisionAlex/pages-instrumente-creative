import type { GetArticlesQuery } from "~/generated/graphql";

export type ImageEntity =
  GetArticlesQuery["articles"]["edges"][number]["node"]["image"];

export const getImageAspectRatio = (image: ImageEntity) => {
  if (!image) return "";

  const { width, height } = image;
  if (!width || !height) return "aspect-w-1 aspect-h-1";

  const ratio = width / height;
  if (ratio === 1) {
    return "aspect-w-1 aspect-h-1";
  }
  if (ratio > 1 && ratio <= 1.5) {
    return "aspect-w-4 aspect-h-3";
  }
  if (ratio > 1.5) {
    return "aspect-w-3 aspect-h-2";
  }
  return "aspect-w-2 aspect-h-3";
};
