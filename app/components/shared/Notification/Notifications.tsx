import { CheckCircleIcon, XIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useBreakpoint } from "~/shared/hooks/useBreakpoint";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Notifications: React.FC<Props> = ({ show, setShow }) => {
  const isDesktop = useBreakpoint("md");
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [setShow, show]);
  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 bottom-[60px] z-50  flex items-end px-4 sm:p-4 md:bottom-0 md:items-start"
    >
      <div className="flex w-full flex-col items-center space-y-4 md:mt-[123px] md:items-end">
        <AnimatePresence exitBeforeEnter>
          {show && (
            <motion.div
              initial={{
                opacity: 0,
                y: isDesktop ? 0 : 100,
                x: isDesktop ? 100 : 0,
              }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{
                opacity: 0,
                y: isDesktop ? 0 : 100,
                x: isDesktop ? 100 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-sm bg-white shadow-lg ring-1 ring-primary ring-opacity-5"
            >
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon
                      className="h-6 w-6 text-primary"
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="font-medium text-primary">
                      Produs adăugat in coș
                    </p>
                    <p className="mt-1 text-sm text-gray-500"></p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-1 w-full origin-left rounded-md bg-subtitle"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
