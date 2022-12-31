import { Form, useActionData, useTransition } from "@remix-run/react";
import React, { useEffect } from "react";
import { Button } from "~/components/shared/Button";
import { FormCheckbox } from "~/components/shared/Form/FormCheckbox";
import { FormInput } from "~/components/shared/Form/FormInput";
import { FormSelect } from "~/components/shared/Form/FormSelect";
import { Spinner } from "~/components/shared/Spinner";
import type { AddressType } from "./Address";

interface Props {
  address: AddressType;
  isDefault?: boolean;
  onClose: () => void;
}

const countyNames = [
  "Alba",
  "Arad",
  "Argeș",
  "Bacău",
  "Bihor",
  "Bistrița-Năsăud",
  "Botoșani",
  "Brașov",
  "Brăila",
  "București",
  "Buzău",
  "Caraș-Severin",
  "Călărași",
  "Cluj",
  "Constanța",
  "Covasna",
  "Dâmbovița",
  "Dolj",
  "Galați",
  "Giurgiu",
  "Gorj",
  "Harghita",
  "Hunedoara",
  "Ialomița",
  "Iași",
  "Ilfov",
  "Maramureș",
  "Mehedinți",
  "Mureș",
  "Neamț",
  "Olt",
  "Prahova",
  "Satu Mare",
  "Sălaj",
  "Sibiu",
  "Suceava",
  "Teleorman",
  "Timiș",
  "Tulcea",
  "Vâlcea",
  "Vaslui",
  "Vrancea",
];

export const AddressForm: React.FC<Props> = ({
  address,
  isDefault,
  onClose,
}) => {
  const actionData = useActionData();
  const transition = useTransition();
  const isLoading =
    (transition.state === "loading" || transition.state === "submitting") &&
    transition.submission?.formData.get("id") === address.id;
  useEffect(() => {
    if (
      actionData?.success &&
      transition.submission?.formData.get("id") === address.id
    ) {
      onClose();
    }
  }, [actionData, address, onClose, isLoading, transition]);
  return (
    <Form method="post" action="/account/address">
      <input type="hidden" name="_action" value="edit" />
      <input
        type="hidden"
        name="isDefaultAddress"
        value={isDefault ? "true" : "false"}
      />
      <input type="hidden" name="id" value={address.id} />
      <div className="flex gap-5">
        <FormInput
          label="Prenume"
          name="firstName"
          defaultValue={address.firstName}
        />
        <FormInput
          label="Nume"
          name="lastName"
          defaultValue={address.lastName}
        />
      </div>
      <FormInput
        label="Companie"
        name="company"
        defaultValue={address.company}
      />
      <FormInput
        label="Adresa"
        name="address1"
        defaultValue={address.address1}
      />
      <FormInput
        label="Apartament, etaj, etc."
        name="address2"
        defaultValue={address.address2}
      />
      <div className="flex items-center gap-5">
        <FormInput label="Localitate" name="city" defaultValue={address.city} />
        <FormSelect name="country" label="Tara" defaultValue={address.country}>
          <option value="Romania">România</option>
        </FormSelect>
      </div>
      <FormSelect name="province" label="Județ" defaultValue={address.province}>
        {countyNames.map((county) => (
          <option key={county} value={county}>
            {county}
          </option>
        ))}
      </FormSelect>
      <FormInput label="Cod poștal" name="zip" defaultValue={address.zip} />
      <FormInput label="Telefon" name="phone" defaultValue={address.phone} />
      <FormCheckbox
        label=" Setează ca adresă favorită"
        name="default"
        defaultValue={isDefault}
      />
      <div className="flex justify-between">
        <Button type="submit" disabled={isLoading} className="min-w-[183px]">
          {isLoading ? <Spinner /> : "Actualizează adresa"}
        </Button>
        <Button type="button" variant="light" onClick={onClose}>
          Anulează
        </Button>
      </div>
    </Form>
  );
};
