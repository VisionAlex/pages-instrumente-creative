import { useFetcher } from "@remix-run/react";
import { motion } from "framer-motion";
import React from "react";
import type { GetUserQuery } from "~/generated/graphql";
import { classNames } from "~/shared/utils/classNames";
import { Button } from "../Button";

interface Props {
  className?: string;
  user: GetUserQuery | null;
}

const variants = {
  open: { opacity: 1, scale: 1 },
  closed: { opacity: 0, scale: 0.8 },
};

export const NewsletterWidget: React.FC<Props> = ({ user, className = "" }) => {
  const fetcher = useFetcher();
  const state = fetcher.submission || fetcher.data ? "success" : "idle";

  if (user?.customer?.acceptsMarketing) return null;
  return (
    <div
      className={classNames(
        "border border-secondaryBackground px-8 py-12",
        className
      )}
    >
      <h3 className="text-center uppercase leading-6 tracking-widest">
        Abonați-vă la newsletter
      </h3>
      <div className="relative">
        <fetcher.Form
          method="post"
          action="/api/email"
          aria-hidden={state === "success"}
        >
          <motion.fieldset
            key="fieldset"
            animate={state !== "success" ? "open" : "closed"}
            variants={variants}
            transition={{ duration: 0.3 }}
            className={classNames(
              "z-10 mt-4 flex w-full flex-col gap-4",
              state !== "success"
                ? "pointer-events-auto"
                : "pointer-events-none"
            )}
          >
            <input
              className="border border-secondaryBackground py-4 text-center outline-primary placeholder:text-center"
              name="email"
              type="email"
              required
              placeholder="Adresă de e-mail"
            />
            <Button type="submit" variant="dark" className="uppercase" full>
              Abonează-te
            </Button>
          </motion.fieldset>
        </fetcher.Form>
        <motion.div
          key="success"
          aria-hidden={state !== "success"}
          variants={variants}
          animate={state === "success" ? "open" : "closed"}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 -z-10 flex items-center justify-center  opacity-0"
        >
          <p className=" bg-[#d3eadd] p-2 text-[#437257]">
            Te-ai abonat cu success! Mulțumim!
          </p>
        </motion.div>
      </div>
    </div>
  );
};
