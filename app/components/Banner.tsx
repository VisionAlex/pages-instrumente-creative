import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";

interface Props {
  closeBanner: () => void;
  showBanner: boolean;
}

export const Banner: React.FC<Props> = ({ closeBanner, showBanner }) => {
  return (
    <AnimatePresence exitBeforeEnter initial={showBanner} key="banner">
      {showBanner ? (
        <motion.div
          initial={{ translateY: -100 }}
          animate={{ translateY: 0 }}
          exit={{ translateY: -100 }}
          className="fixed top-0 z-40 flex h-9 w-screen items-center justify-center bg-primary px-5"
        >
          <p className="grow text-center text-white ">
            Transport gratuit pentru toate comenzile
          </p>
          <IoCloseOutline
            className="text-white"
            fontSize={30}
            onClick={closeBanner}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
