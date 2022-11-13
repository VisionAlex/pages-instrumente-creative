import gql from "graphql-tag";
import { sdk } from "graphqlWrapper";
import type { PageHandle } from "~/config";

export const getPage = async ({ handle }: { handle: PageHandle }) => {
  return sdk.getPage({ handle });
};

gql`
  query getPage($handle: String) {
    page(handle: $handle) {
      id
      body
      bodySummary
      handle
      seo {
        title
        description
      }
    }
  }
`;
