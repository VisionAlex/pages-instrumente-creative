import gql from "graphql-tag";
import type { ProductSortKeys } from "~/generated/graphql";
import type { QueryOptions, SDK } from "~/graphqlWrapper";
import { storage } from "~/session.server";

type GetProductOptions = {
  first: number;
  query?: string;
  sortKey?: ProductSortKeys;
  options?: QueryOptions;
};

export function getProducts(
  sdk: SDK,
  { first, query, sortKey, options }: GetProductOptions
) {
  return sdk.getProducts({ first, query, sortKey }, options);
}

type GetProductByHandleOptions = {
  handle: string;
  options?: QueryOptions;
};

export function getProductByHandle(
  sdk: SDK,
  { handle, options }: GetProductByHandleOptions
) {
  return sdk.getProductByHandle({ handle }, options);
}

export async function getWishlist(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const wishlist = JSON.parse(session.get("wishlist") || "[]") as string[];
  return wishlist;
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
          description
          availableForSale
          priceRange {
            minVariantPrice {
              amount
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
            }
          }
          thumbnail: featuredImage {
            url(transform: { maxWidth: 200 })
            altText
            width
            height
          }
          imageSmall: images(first: 10) {
            edges {
              node {
                url(transform: { maxWidth: 436 })
                altText
                width
                height
              }
            }
          }
          imageMedium: images(first: 10) {
            edges {
              node {
                url(transform: { maxWidth: 720 })
                altText
                width
                height
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                sku
                availableForSale
                currentlyNotInStock
                price {
                  amount
                }
                compareAtPrice {
                  amount
                }
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
      imagesThumbnail: images(first: 20) {
        edges {
          node {
            id
            url(transform: { maxWidth: 200 })
            altText
            width
            height
          }
        }
      }
      imagesSmall: images(first: 20) {
        edges {
          node {
            id
            url(transform: { maxWidth: 436 })
            altText
            width
            height
          }
        }
      }
      imagesMedium: images(first: 20) {
        edges {
          node {
            id
            url(transform: { maxWidth: 1336 })
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
            title
            sku
            availableForSale
            currentlyNotInStock
            requiresShipping
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
