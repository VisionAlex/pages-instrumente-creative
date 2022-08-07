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
          title
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          imageSmall: images(first: 1) {
            edges {
              node {
                url(transform: { maxWidth: 160 })
                altText
                width
                height
              }
            }
          }
          imageMedium: images(first: 1) {
            edges {
              node {
                url(transform: { maxWidth: 720 })
                altText
                width
                height
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;
