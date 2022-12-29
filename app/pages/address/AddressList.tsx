import React, { useState } from "react";
import { FadeIn } from "~/components/shared/FadeIn";
import type { AddressType } from "./Address";
import { Address } from "./Address";
import { ConfirmationModal } from "./ConfirmationModal";

type Props = {
  defaultAddress: AddressType | null;
  addresses: AddressType[];
};

export const AddressList: React.FC<Props> = ({ defaultAddress, addresses }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<string>();

  const closeModal = () => setIsOpen(false);
  const deleteAddress = (id: string) => {
    setId(id);
    setIsOpen(true);
  };
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
