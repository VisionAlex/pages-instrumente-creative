import gql from "graphql-tag";
import type { QueryOptions } from "graphqlWrapper";
import { sdk } from "graphqlWrapper";

export function getHighlightProducts(
  first: number,
  query?: string,
  options?: QueryOptions
) {
  return sdk.getHighlightProducts({ first, query }, options);
}

gql`
  query getHighlightProducts($first: Int, $query: String) {
    products(first: $first, query: $query) {
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
