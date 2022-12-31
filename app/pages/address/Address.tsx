import React, { useState } from "react";
import { Button } from "~/components/shared/Button";
import { AddressForm } from "./AddressForm";

export type AddressType = {
  id: string;
  name?: string;
  formatted: string[];
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  province?: string;
  zip?: string;
  phone?: string;
};

interface Props {
  isDefault?: boolean;
  address: AddressType | null;
  deleteAddress: (id: string) => void;
}

export const Address: React.FC<Props> = ({
  address,
  isDefault,
  deleteAddress,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  if (!address) return null;
  return (
    <div className="border border-line">
      {isDefault ? (
        <h2 className="border-b border-line px-5 py-5 text-xl">
          Adresă favorită
        </h2>
      ) : null}
      <div className="px-5 py-5 text-subtitle">
        <p>{address.name}</p>
        {address.formatted.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <div className="flex gap-3 px-5 pb-5">
        <Button variant="dark" onClick={() => setIsFormOpen(true)}>
          Editeaza
        </Button>
        <Button
          variant="light"
          onClick={() => {
            deleteAddress(address.id);
          }}
        >
          Șterge
        </Button>
      </div>
      {isFormOpen ? (
        <div className="mx-5 mb-5">
          <AddressForm
            address={address}
            isDefault={isDefault}
            onClose={() => setIsFormOpen(false)}
          />
        </div>
      ) : null}
    </div>
  );
};
