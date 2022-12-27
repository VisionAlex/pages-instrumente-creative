export const getImageUrl = (url: string | null | undefined, width: number) => {
  if (!url) return undefined;
  return url.replace(/(\.[^.]*$)/, `_${width}x$1`);
};
