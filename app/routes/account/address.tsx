import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { z } from "zod";
import { createSdk } from "~/graphqlWrapper";
import type { AddressType } from "~/pages/address/Address";
import { AddressList } from "~/pages/address/AddressList";
import {
  deleteAddress,
  getAddresses,
  updateAddress,
  updateDefaultAddress,
} from "~/providers/customers/address";

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
  const action = formData.get("_action");
  if (action === "delete") {
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
  }

  if (action === "edit") {
    const data = addressValidator.parse(Object.fromEntries(formData));
    const {
      firstName,
      lastName,
      id,
      address1,
      address2,
      city,
      country,
      province,
      company,
      phone,
      zip,
    } = data;
    const isDefaultAddress = formData.get("isDefaultAddress") === "true";
    const response = await updateAddress(
      sdk,
      id,
      {
        firstName,
        lastName,
        company,
        address1,
        address2,
        city,
        country,
        province,
        zip,
        phone,
      },
      request
    );
    const errors = response?.customerAddressUpdate?.customerUserErrors;
    if (!errors || errors.length === 0) {
      if (data.default === "on" && !isDefaultAddress) {
        const defaultAddressResponse = await updateDefaultAddress(
          sdk,
          id,
          request
        );
        const defaultAddressErrors =
          defaultAddressResponse?.customerDefaultAddressUpdate
            ?.customerUserErrors;
        if (defaultAddressErrors && defaultAddressErrors.length > 0) {
          console.log(errors);
          return json({
            errors,
          });
        }
      }
      return json({ success: true });
    } else {
      console.log("edit address errors", errors);
      return json(
        {
          errors,
        },
        {
          status: 400,
        }
      );
    }
  }
};

const AddressPage: React.FC = () => {
  const { defaultAddress, addresses } = useLoaderData<LoaderData>();

  return <AddressList addresses={addresses} defaultAddress={defaultAddress} />;
};

export default AddressPage;

export const addressValidator = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  company: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  country: z.string(),
  province: z.string(),
  zip: z.string().optional(),
  phone: z.string().optional(),
  default: z.literal("on").optional(),
  id: z.string(),
  _action: z.literal("edit" || "delete"),
});
