import gql from "graphql-tag";
import { sdk } from "graphqlWrapper";

export const getArticles = (first: number) => {
  return sdk.getArticles({ first });
};

export const getBlogArticle = (
  handle: string | undefined,
  articleHandle: string | undefined
) => {
  if (!handle || !articleHandle) return undefined;
  return sdk.getBlogArticle({ handle, articleHandle });
};

gql`
  query getArticles(
    $first: Int
    $reverse: Boolean = true
    $sortKey: ArticleSortKeys = PUBLISHED_AT
  ) {
    articles(first: $first, reverse: $reverse, sortKey: $sortKey) {
      edges {
        node {
          id
          publishedAt
          tags
          thumbnail: image {
            url(transform: { maxWidth: 210 })
          }
          image {
            altText
            height
            width
            id
            url
          }
          blog {
            handle
          }
          handle
          title
          excerptHtml
        }
      }
    }
  }
`;

gql`
  query getBlogArticle($handle: String!, $articleHandle: String!) {
    blog(handle: $handle) {
      articleByHandle(handle: $articleHandle) {
        id
        publishedAt
        title
        seo {
          title
          description
        }
        authorV2 {
          name
        }
        image {
          url
          height
          width
          altText
        }
        contentHtml
        tags
      }
    }
  }
`;
