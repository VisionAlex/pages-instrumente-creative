import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/shared/Button";
import { FadeIn } from "~/components/shared/FadeIn";
import type { GetAddressesQuery } from "~/generated/graphql";
import { createSdk } from "~/graphqlWrapper";
import { getAddresses } from "~/providers/customers/address";

type LoaderData = GetAddressesQuery["customer"];

export const loader: LoaderFunction = async ({ request, context }) => {
  const sdk = createSdk(context);
  const response = await getAddresses(sdk, request);
  return json(response?.customer);
};

const Address: React.FC = () => {
  const data = useLoaderData<LoaderData>();
  return (
    <FadeIn className="mt-4">
      <div className="border border-line">
        <h2 className="border-b border-line px-5 py-5 text-xl">
          Adresă favorită
        </h2>
        <div className="px-5 py-5 text-subtitle">
          <p>{data?.defaultAddress?.name}</p>
          {data?.defaultAddress?.formatted.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <div className="flex gap-3 px-5 pb-5">
          <Button variant="light" slim>
            Editeaza
          </Button>
          <Button variant="light" slim>
            Șterge
          </Button>
        </div>
      </div>
      {data?.addresses.edges.map((address) => {
        if (address.node.id === data.defaultAddress?.id) return null;
        return (
          <div
            key={address.node.id}
            className="mt-5 border border-line p-5  text-subtitle"
          >
            <p>{address.node.name}</p>
            {address.node.formatted.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
            <div className="mt-5 flex gap-3">
              <Button variant="light" slim>
                Editeaza
              </Button>
              <Button variant="light" slim>
                Șterge
              </Button>
            </div>
          </div>
        );
      })}
    </FadeIn>
  );
};

export default Address;
