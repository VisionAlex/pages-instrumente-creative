import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import React, { Fragment, useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ResetForm } from "./ResetForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export type AuthForm = "login" | "register" | "reset";

export const AccountModal: React.FC<Props> = ({ open, onClose }) => {
  const [form, setForm] = useState<AuthForm>("login");
  const title =
    form === "login"
      ? "Autentificare"
      : form === "register"
      ? "Crează un cont"
      : "Resetează parola";
  return (
    <Transition show={open} as={Fragment}>
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
        <div className="fixed inset-0 px-1.5 py-4">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-400"
            enterFrom="scale-125 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transform transition ease-in-out duration-400"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-125 opacity-0"
          >
            <Dialog.Panel className="absolute inset-0 m-auto max-h-fit w-screen max-w-[490px] bg-white px-5 py-8 md:px-12 md:py-14">
              <Dialog.Title className="text-center text-title md:text-3xl">
                {title}
              </Dialog.Title>
              <div className="absolute right-4 top-4">
                <span className="sr-only">Close</span>
                <button className="cursor-pointer text-primary outline-none hover:text-subtitle">
                  <XIcon className="h-4 w-4" onClick={onClose} />
                </button>
              </div>
              {form === "login" && <LoginForm setForm={setForm} />}
              {form === "register" && <RegisterForm setForm={setForm} />}
              {form === "reset" && <ResetForm setForm={setForm} />}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
