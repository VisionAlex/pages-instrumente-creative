import gql from "graphql-tag";
import { sdk } from "graphqlWrapper";

export const getBlog = async (handle: string) => {
  return await sdk.getBlog({ handle });
};

gql`
  query getBlog($handle: String) {
    blog(handle: $handle) {
      id
      handle
      title
      seo {
        title
        description
      }
      articles(first: 20) {
        nodes {
          handle
          id
          image {
            altText
            height
            width
            id
            url
          }
          authorV2 {
            firstName
            lastName
          }
          comments(first: 20) {
            nodes {
              author {
                email
                name
              }
            }
          }
          content
          contentHtml
          excerpt
          excerptHtml
          seo {
            title
            description
          }
        }
      }
    }
  }
`;
