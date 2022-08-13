import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { LinkButton } from "./shared/LinkButton";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

interface Props {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ShoppingCart: React.FC<Props> = ({ showCart, setShowCart }) => {
  return (
    <Transition.Root show={showCart} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={setShowCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-400"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-primary bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-400"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-400"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md ">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white pb-6 shadow-xl">
                    <div className="flex-1 overflow-y-auto">
                      <div className="flex items-start justify-between bg-background py-6 px-6">
                        <Dialog.Title className="text-lg font-medium text-primary">
                          Coșul Tău
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-primary hover:text-subtitle"
                            onClick={() => setShowCart(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon
                              className="-none h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>

                      <div className="mt-10 px-6">
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-gray-200">
                            {products.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-primary">
                                      <h3>
                                        <a href={product.href}>
                                          {" "}
                                          {product.name}{" "}
                                        </a>
                                      </h3>
                                      <p className="ml-4">
                                        {Number(product.price)} lei
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {product.color}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {product.quantity}
                                    </p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="py-6 px-6">
                      <div className="flex justify-between text-base  text-primary">
                        <p>Subtotal</p>
                        <p className="text-lg text-subtitle">262 lei</p>
                      </div>
                      <div className="mt-6">
                        <LinkButton
                          to="#"
                          text="Finalizează Comanda"
                          variant="dark"
                          className="mb-3 text-lg"
                        />
                        <LinkButton
                          to="#"
                          text="Vezi Coșul de cumpărături"
                          variant="light"
                          className="text-lg"
                        />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
