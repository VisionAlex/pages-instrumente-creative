import gql from "graphql-tag";
import type {
  CustomerAccessTokenCreateInput,
  CustomerCreateInput,
} from "~/generated/graphql";
import { sdk } from "~/graphqlWrapper";
import { storage } from "~/session.server";

export const register = ({
  email,
  password,
  firstName,
  lastName,
}: CustomerCreateInput) => {
  return sdk.register({
    input: { email, password, firstName, lastName },
  });
};

export const login = ({ email, password }: CustomerAccessTokenCreateInput) => {
  return sdk.login({
    input: { email, password },
  });
};

export const getUser = async (request: Request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const accessToken = session.get("accessToken");
  if (!accessToken || typeof accessToken !== "string") return null;
  const user = await sdk.getUser({ accessToken });
  if (!user.customer) return null;
  return user;
};

export const customerRecover = (email: string) => {
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
