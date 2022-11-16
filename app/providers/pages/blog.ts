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
      articles(first: 20, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            handle
            id
            publishedAt
            tags
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
