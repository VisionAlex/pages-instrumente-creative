import React, { useEffect, useState } from "react";
import { IoChevronUpOutline } from "react-icons/io5";
import { FaSquareFull } from "react-icons/fa";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export const ScrollToTop: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <AnimatePresence exitBeforeEnter>
      {show && (
        <motion.div
          key="scroll-to-top"
          transition={{ duration: 0.4 }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-[60px] right-[20px] z-40 flex h-[42px] w-[26px] cursor-pointer flex-col items-center justify-center bg-primary text-white transition duration-300 ease-in-out "
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <IoChevronUpOutline size={16} className="mt-[-5px]" />
          <FaSquareFull size="3px" />
          <FaSquareFull size="3px" className="mt-1" />
          <FaSquareFull size="3px" className="mt-1" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
