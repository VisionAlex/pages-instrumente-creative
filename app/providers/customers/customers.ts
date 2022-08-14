import gql from "graphql-tag";
import { sdk } from "graphqlWrapper";
import type { CustomerCreateInput } from "~/generated/graphql";

export const createCustomer = ({
  email,
  password,
  firstName,
  lastName,
}: CustomerCreateInput) => {
  return sdk.customerCreate({
    input: { email, password, firstName, lastName },
  });
};

gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
