import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Fragment } from "react";

interface Props {
  title: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export const Drawer: React.FC<Props> = ({ title, open, onClose, children }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-400"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-primary bg-opacity-25 transition-opacity"></div>
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
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full overflow-y-auto bg-white pb-6 shadow-xl">
                    <div className="flex-1 overflow-y-auto">
                      <div className="flex items-center justify-between bg-secondaryBackground py-6 px-6">
                        <Dialog.Title className="text-lg">{title}</Dialog.Title>
                        <div>
                          <span className="sr-only">Close wishlist</span>
                          <button
                            className="cursor-pointer outline-none hover:text-subtitle"
                            onClick={onClose}
                          >
                            <XIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div>{children}</div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
