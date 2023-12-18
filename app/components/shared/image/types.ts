export interface CloudflareImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataUrl?: string;
}

export interface ShopifyImage {
  __typename?: "Image" | undefined;
  url: string;
  altText?: string | null | undefined;
  width?: number | null | undefined;
  height?: number | null | undefined;
}
