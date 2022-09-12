import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import { Form, Link, useLocation } from "@remix-run/react";
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
      <img
        src={cartItem.thumbnail?.url ?? ""}
        width={87}
        height={60}
        className="h-[60px] w-[87px]"
        alt={cartItem.thumbnail?.altText ?? ""}
      />
      <div className="flex flex-1 flex-col gap-5 ">
        <Link
          prefetch="intent"
          to={`/products/${cartItem.handle}`}
          onClick={() => setShowCart(false)}
        >
          {cartItem.title}
        </Link>
        <div className="flex items-center justify-between">
          <div className="cartItems-center flex max-w-fit gap-2 border border-secondaryBackground px-2">
            <Form method="post" action="/cart">
              <input type="hidden" name="variantID" value={cartItem.id} />
              <input type="hidden" name="_action" value="remove" />
              <input
                type="hidden"
                name="redirectTo"
                value={location.pathname}
              />
              <button>
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
              <button>
                <PlusSmIcon strokeWidth={1.5} className="h-5 w-5" />
              </button>
            </Form>
          </div>
          <div>{parseInt(cartItem.priceV2.amount)} lei</div>
        </div>
      </div>
    </li>
  );
};