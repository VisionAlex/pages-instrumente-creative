import React from "react";
import { Button } from "~/components/shared/Button";

export type AddressType = {
  id: string;
  name?: string | null | undefined;
  formatted: string[];
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
        <Button variant="dark" slim>
          Editeaza
        </Button>
        <Button
          variant="light"
          slim
          onClick={() => {
            deleteAddress(address.id);
          }}
        >
          Șterge
        </Button>
      </div>
    </div>
  );
};
