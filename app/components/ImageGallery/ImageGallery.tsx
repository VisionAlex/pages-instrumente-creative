import React, { useState } from "react";
import { wrap } from "popmotion";
import { AnimatePresence, motion } from "framer-motion";
import { Dots } from "./Dots";
import type { DetailedProduct } from "~/types";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

interface Props {
  images: DetailedProduct["imagesMedium"]["edges"][number]["node"][];
}

export const ImageGallery: React.FC<Props> = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-md">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={imageIndex}
            src={images[imageIndex].url}
            alt={images[imageIndex].altText ?? ""}
            custom={direction}
            variants={variants}
            className="cursor-pointer object-cover object-center"
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragElastic={1}
            dragConstraints={{ left: 0, right: 0 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        </AnimatePresence>
      </div>
      <Dots size={images.length} selected={imageIndex} />
    </>
  );
};
