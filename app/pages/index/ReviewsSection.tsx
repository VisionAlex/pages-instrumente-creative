import { useNavigate } from "@remix-run/react";
import { motion } from "framer-motion";
import React from "react";
import { config } from "~/config";

export const ReviewsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto mt-10 max-w-7xl px-5 lg:px-8 xl:px-20">
      <div className="flex h-96 w-full flex-col items-center justify-center bg-banner uppercase">
        <h5 className="mb-5 flex flex-col items-center gap-2 uppercase">
          <span className="text-sm font-light">Descoperă</span>
          <span className="text-[40px] font-bold">părerea</span>
          <span>clienților noștri</span>
        </h5>
        <motion.button
          className="flex h-11 items-center justify-center border border-primary px-4 transition-colors duration-500 hover:bg-primary hover:text-white"
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            navigate(config.pages.recenzii.path);
          }}
        >
          RECENZII
        </motion.button>
      </div>
    </section>
  );
};
