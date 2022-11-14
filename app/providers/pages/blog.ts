import gql from "graphql-tag";
import { sdk } from "graphqlWrapper";

export const getBlog = async (handle: string) => {
  return await sdk.getBlog({ handle });
};

gql`
  query getBlog($handle: String) {
    blog(handle: $handle) {
      title
      seo {
        title
        description
      }
      articles(first: 20) {
        edges {
          node {
            handle
            id
            title
            image {
              altText
              height
              width
              id
              url
            }
            excerptHtml
          }
        }
      }
    }
  }
`;
