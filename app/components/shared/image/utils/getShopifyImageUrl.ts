export const getShopifyImageUrl = (
  url: string | null | undefined,
  width: number | undefined | null
) => {
  if (!url) return undefined;
  if (!width) return url;
  return url.replace(/(\.[^.]*$)/, `_${width}x$1`);
};
