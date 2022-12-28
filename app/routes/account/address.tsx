import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import invariant from "tiny-invariant";
import { Button } from "~/components/shared/Button";
import { FadeIn } from "~/components/shared/FadeIn";
import { createSdk } from "~/graphqlWrapper";
import type { AddressType } from "~/pages/address/Address";
import { Address } from "~/pages/address/Address";
import { ConfirmationModal } from "~/pages/address/ConfirmationModal";
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
  const { addresses, defaultAddress } = useLoaderData<LoaderData>();
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<string>();

  const closeModal = () => setIsOpen(false);
  const deleteAddress = (id: string) => {
    setId(id);
    setIsOpen(true);
  };

  if (!addresses || addresses.length === 0)
    return (
      <FadeIn>
        <div>
          <Button variant="dark">Adaugă o adresă</Button>
        </div>
      </FadeIn>
    );
  return (
    <>
      <ConfirmationModal isOpen={isOpen} onClose={closeModal} id={id} />
      <FadeIn className="mt-4">
        <div className="flex flex-col gap-5">
          <Address
            address={defaultAddress}
            isDefault
            deleteAddress={deleteAddress}
          />
          {addresses.map((address) => {
            if (address.id === defaultAddress?.id) return null;
            return (
              <Address
                key={address.id}
                address={address}
                deleteAddress={deleteAddress}
              />
            );
          })}
        </div>
      </FadeIn>
    </>
  );
};

export default AddressPage;
