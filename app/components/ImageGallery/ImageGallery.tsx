import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import { useState } from "react";
import type { DetailedProduct } from "~/types";
import { getShopifyImageUrl } from "../shared/image/utils";
import { Dots } from "./Dots";

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
  images: DetailedProduct["images"]["edges"][number]["node"][];
  imgSize: number;
}

export const ImageGallery: React.FC<Props> = ({ images, imgSize }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-md">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={imageIndex}
            src={getShopifyImageUrl(images[imageIndex].url, imgSize)}
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
      {images.length > 1 ? (
        <Dots size={images.length} selected={imageIndex} />
      ) : null}
    </>
  );
};
