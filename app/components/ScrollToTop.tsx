import React, { useEffect, useState } from "react";
import { IoChevronUpOutline } from "react-icons/io5";
import { FaSquareFull } from "react-icons/fa";
import { Fade } from "./shared/Fade";

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
    <Fade show={show}>
      <div
        className="fixed bottom-[60px] right-[20px] flex h-[42px] w-[26px] cursor-pointer flex-col items-center justify-center bg-primary text-white transition duration-300 ease-in-out "
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <IoChevronUpOutline size={16} className="mt-[-5px]" />
        <FaSquareFull size="3px" />
        <FaSquareFull size="3px" className="mt-1" />
        <FaSquareFull size="3px" className="mt-1" />
      </div>
    </Fade>
  );
};
