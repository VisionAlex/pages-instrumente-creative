import gql from "graphql-tag";

gql`
  query getCustomers($query: String!) {
    customers(first: 1, query: $query) {
      edges {
        node {
          id
          firstName
        }
      }
    }
  }
`;
