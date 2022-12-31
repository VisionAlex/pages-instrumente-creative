import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Form } from "@remix-run/react";
import { Fragment } from "react";
import { Button } from "~/components/shared/Button";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string | undefined;
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  id,
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-400"
          enterFrom="opacity-0 "
          enterTo="opacity-100"
          leave="ease-in-out duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-primary bg-opacity-25"></div>
        </Transition.Child>
        <div className="fixed inset-0">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-400"
            enterFrom="scale-125 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transform transition ease-in-out duration-400"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-125 opacity-0"
          >
            <Dialog.Panel className="absolute inset-0 m-auto max-h-fit w-[95vw] max-w-[490px] bg-white px-5 py-8 md:px-12 md:py-14">
              <Dialog.Title className="text-center text-title md:text-3xl">
                Șterge adresă
              </Dialog.Title>
              <div className="absolute right-4 top-4">
                <span className="sr-only">Close</span>
                <button
                  className="cursor-pointer text-primary outline-none hover:text-subtitle"
                  onClick={onClose}
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-5">
                <p className="mb-5 text-center text-subtitle">
                  Ești sigur ca vrei să ștergi această adresă ?
                </p>
                <div className="flex justify-end gap-4">
                  <Button onClick={onClose} variant="light">
                    Înapoi
                  </Button>
                  <Form method="post" action="/account/address">
                    <input type="hidden" name="_action" value="delete" />
                    <input type="hidden" name="id" value={id} />
                    <Button type="submit" variant="dark" onClick={onClose}>
                      Șterge
                    </Button>
                  </Form>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
