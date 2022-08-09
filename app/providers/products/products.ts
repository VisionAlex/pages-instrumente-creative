import gql from "graphql-tag";
import type { QueryOptions } from "graphqlWrapper";
import { sdk } from "graphqlWrapper";

export function getProducts(first: number, options?: QueryOptions) {
  return sdk.getAllProducts({ first }, options);
}

gql`
  query getAllProducts($first: Int) {
    products(first: $first) {
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
