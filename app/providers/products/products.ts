import gql from "graphql-tag";
import type { QueryOptions } from "graphqlWrapper";
import { sdk } from "graphqlWrapper";
import type { ProductSortKeys } from "~/generated/graphql";
import { storage } from "~/session.server";

export function getProducts(
  first: number,
  query?: string,
  sortKey?: ProductSortKeys,
  options?: QueryOptions
) {
  return sdk.getProducts({ first, query, sortKey }, options);
}

export function getProductByHandle(handle: string, options?: QueryOptions) {
  return sdk.getProductByHandle({ handle }, options);
}

export interface WishlistItem {
  id: string;
  title: string;
  handle: string;
  featuredImage: {
    altText: string | null;
    url: string;
    width: number | null;
    height: number | null;
  };
  variants: {
    edges: {
      node: {
        id: string;
        sku?: string | null;
        availableForSale: boolean;
        currentlyInStock: boolean;
        priceV2: { amount: string };
      };
    }[];
  };
}

export async function getWishlist(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const wishlist = JSON.parse(session.get("wishlist") || "[]") as string[];
  return wishlist;
}

export async function getWishlistInfo(wishlist: string[]) {
  const products = await sdk.getWishlistInfo({ ids: wishlist });
  return products.nodes as WishlistItem[];
}

gql`
  query getProducts(
    $first: Int
    $query: String
    $sortKey: ProductSortKeys = BEST_SELLING
  ) {
    products(first: $first, query: $query, sortKey: $sortKey) {
      edges {
        node {
          id
          productType
          title
          handle
          availableForSale
          priceRange {
            minVariantPrice {
              amount
            }
          }
          imageSmall: images(first: 2) {
            edges {
              node {
                url(transform: { maxWidth: 436 })
                altText
                width
                height
              }
            }
          }
          imageMedium: images(first: 2) {
            edges {
              node {
                url(transform: { maxWidth: 720 })
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

gql`
  query getWishlistInfo($ids: [ID!]!) {
    nodes(ids: $ids) {
      id
      ... on Product {
        title
        handle
        featuredImage {
          altText
          url(transform: { maxWidth: 200 })
          width
          height
        }
        variants(first: 20) {
          edges {
            node {
              id
              sku
              availableForSale
              currentlyNotInStock
              priceV2 {
                amount
              }
            }
          }
        }
      }
    }
  }
`;

gql`
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      availableForSale
      productType

      tags
      title
      description
      descriptionHtml
      images(first: 20) {
        edges {
          node {
            url(transform: { maxWidth: 880 })
            altText
            width
            height
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            sku
            availableForSale
            currentlyNotInStock
            requiresShipping
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
