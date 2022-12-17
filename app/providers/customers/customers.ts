import gql from "graphql-tag";
import type {
  CustomerAccessTokenCreateInput,
  CustomerCreateInput,
} from "~/generated/graphql";
import type { SDK } from "~/graphqlWrapper";
import { storage } from "~/session.server";

export const register = (
  sdk: SDK,
  { email, password, firstName, lastName }: CustomerCreateInput
) => {
  return sdk.register({
    input: { email, password, firstName, lastName },
  });
};

export const login = (
  sdk: SDK,
  { email, password }: CustomerAccessTokenCreateInput
) => {
  return sdk.login({
    input: { email, password },
  });
};

export const getUser = async (request: Request, sdk: SDK) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  if (!accessToken || typeof accessToken !== "string") return null;
  const user = await sdk.getUser({ accessToken });
  return user;
};

type CustomerRecoverOptions = {
  email: string;
};

export const customerRecover = (
  sdk: SDK,
  { email }: CustomerRecoverOptions
) => {
  return sdk.customerRecover({ email });
};

gql`
  mutation register($input: CustomerCreateInput!) {
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

gql`
  mutation login($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

gql`
  query getUser($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      id
      firstName
      lastName
      acceptsMarketing
      email
    }
  }
`;

gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
