import React, { useEffect, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

export const NAVBAR_HEIGHT = 123;

export const Navbar: React.FC<Props> = ({ children }) => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 20) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <nav
      className="linear fixed top-0 flex w-screen items-center justify-between bg-background transition-transform duration-300 sm:px-[20px] lg:px-[34px] xl:px-[80]"
      style={{
        height: NAVBAR_HEIGHT,
        transform: !show ? "translateY(-100%)" : undefined,
      }}
    >
      {children}
    </nav>
  );
};
