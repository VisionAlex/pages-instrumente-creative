import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createSdk } from "~/graphqlWrapper";
import type { AddressType } from "~/pages/address/Address";
import { AddressList } from "~/pages/address/AddressList";
import { deleteAddress, getAddresses } from "~/providers/customers/address";

export const loader: LoaderFunction = async ({ request, context }) => {
  const sdk = createSdk(context);
  const response = await getAddresses(sdk, request);
  const defaultAddress = response?.customer?.defaultAddress;
  const addresses = response?.customer?.addresses.edges.map(
    (address) => address.node
  );
  return json({ defaultAddress, addresses });
};

type LoaderData = {
  defaultAddress: AddressType | null;
  addresses: AddressType[];
};

export const action: ActionFunction = async ({ request, context }) => {
  const sdk = createSdk(context);
  const formData = await request.formData();
  const id = formData.get("id");
  invariant(typeof id === "string", "Invalid id");
  const response = await deleteAddress(sdk, id, request);
  const errors = response?.customerAddressDelete?.customerUserErrors;
  if (errors && errors.length > 0) {
    return json(
      { error: errors[0].message, code: errors[0].code },
      {
        status: 400,
      }
    );
  }
  return json({ success: true });
};

const AddressPage: React.FC = () => {
  const { defaultAddress, addresses } = useLoaderData<LoaderData>();

  return <AddressList addresses={addresses} defaultAddress={defaultAddress} />;
};

export default AddressPage;
