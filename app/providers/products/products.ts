import gql from "graphql-tag";
import type { QueryOptions } from "graphqlWrapper";
import { sdk } from "graphqlWrapper";
import type { ProductSortKeys } from "~/generated/graphql";

export function getProducts(
  first: number,
  query?: string,
  sortKey?: ProductSortKeys,
  options?: QueryOptions
) {
  return sdk.getProducts({ first, query, sortKey }, options);
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
