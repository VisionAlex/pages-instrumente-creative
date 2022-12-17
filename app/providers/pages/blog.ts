import gql from "graphql-tag";
import type { SDK } from "~/graphqlWrapper";

export const getBlog = async (sdk: SDK, handle: string) => {
  return await sdk.getBlog({ handle });
};

type GetRecentArticlesOptions = {
  handle: string;
  first: number;
};
export const getRecentArticles = async (
  sdk: SDK,
  { handle, first }: GetRecentArticlesOptions
) => {
  return await sdk.getRecentArticles({ handle, first });
};

gql`
  query getBlog($handle: String, $first: Int = 20) {
    blog(handle: $handle) {
      title
      seo {
        title
        description
      }
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            handle
            id
            publishedAt
            tags
            title
            thumbnail: image {
              url(transform: { maxWidth: 210 })
            }
            blog {
              handle
            }
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

gql`
  query getRecentArticles($handle: String, $first: Int = 20) {
    blog(handle: $handle) {
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
        edges {
          node {
            handle
            id
            publishedAt
            title
            thumbnail: image {
              url(transform: { maxWidth: 210 })
              width
              height
              altText
            }
            blog {
              handle
            }
          }
        }
      }
    }
  }
`;
