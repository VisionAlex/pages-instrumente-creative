import gql from "graphql-tag";
import { sdk } from "graphqlWrapper";

export const getArticles = (first: number) => {
  return sdk.getArticles({ first });
};

export const getBlogArticle = (handle: string, articleHandle: string) => {
  return sdk.getBlogArticle({ handle, articleHandle });
};

gql`
  query getArticles($first: Int) {
    articles(first: $first) {
      edges {
        node {
          id
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
