import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import { Form, Link, useLocation } from "@remix-run/react";
import { config } from "~/config";
import type { VariantInfo } from "~/types";

interface Props {
  cartItem: VariantInfo;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartItem: React.FC<Props> = ({ cartItem, setShowCart }) => {
  const location = useLocation();
  return (
    <li
      key={cartItem.id}
      className="flex gap-5 border-t border-secondaryBackground pt-5 pb-5 first:border-none first:pt-0"
    >
      <Link
        prefetch="intent"
        to={`${config.pages.produse.path}/${cartItem.handle}`}
        onClick={() => {
          setShowCart(false);
        }}
      >
        <img
          src={cartItem.thumbnail?.url ?? ""}
          width={87}
          height={60}
          className="h-[60px] w-[87px]"
          alt={cartItem.thumbnail?.altText ?? ""}
        />
      </Link>
      <div className="flex flex-1 flex-col gap-5 ">
        <Link
          prefetch="intent"
          to={`${config.pages.produse.path}/${cartItem.handle}`}
          onClick={() => setShowCart(false)}
          className="hover:opacity-70"
        >
          {cartItem.productTitle}
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex max-w-fit items-center gap-2 border border-secondaryBackground px-2">
            <Form method="post" action="/cart">
              <input type="hidden" name="variantID" value={cartItem.id} />
              <input type="hidden" name="_action" value="remove" />
              <input
                type="hidden"
                name="redirectTo"
                value={location.pathname}
              />
              <button className="flex items-center justify-center">
                <MinusSmIcon strokeWidth={1.5} className="h-5 w-5" />
              </button>
            </Form>
            <div>{cartItem.quantity}</div>
            <Form method="post" action="/cart">
              <input type="hidden" name="variantID" value={cartItem.id} />
              <input type="hidden" name="_action" value="add" />
              <input
                type="hidden"
                name="redirectTo"
                value={location.pathname}
              />
              <button className="flex items-center justify-center">
                <PlusSmIcon strokeWidth={1.5} className="h-5 w-5" />
              </button>
            </Form>
          </div>
          <div>{parseInt(cartItem.price.amount)} lei</div>
        </div>
      </div>
    </li>
  );
};
