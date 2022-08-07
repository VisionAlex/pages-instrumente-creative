import { Transition } from "@headlessui/react";
import React from "react";

interface Props {
  show: boolean;
}

export const Fade: React.FC<Props> = ({ children, show }) => {
  return (
    <Transition
      show={show}
      enter="transition ease-in duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
};
