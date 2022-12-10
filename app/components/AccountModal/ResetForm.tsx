import { CheckCircleIcon } from "@heroicons/react/outline";
import { useFetcher } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import type { AuthForm } from "./AccountModal";

interface Props {
  setForm: React.Dispatch<React.SetStateAction<AuthForm>>;
}

export const ResetForm: React.FC<Props> = ({ setForm }) => {
  const fetcher = useFetcher();
  const state = fetcher.submission || fetcher.data ? "success" : "idle";
  console.log(fetcher.data);
  return (
    <AnimatePresence exitBeforeEnter>
      {state === "idle" && (
        <motion.div
          key="idle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-[248px]"
        >
          <fetcher.Form className="mt-4" method="post" action="/auth/reset">
            <div className="mb-10 text-center text-subtitle">
              Îți vom trimite un e-mail pentru a reseta parola.
            </div>
            <Input name="email" type="email" placeholder="Email" required />
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Button full type="submit">
                  Trimite
                </Button>
                <Button
                  full
                  variant="light"
                  type="button"
                  onClick={() => setForm("login")}
                >
                  Anulează
                </Button>
              </div>
              <Button
                type="button"
                full
                variant="light"
                onClick={() => setForm("register")}
              >
                Crează un cont
              </Button>
            </div>
          </fetcher.Form>
        </motion.div>
      )}
      {state === "success" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          key="success"
          className="flex h-[264px] items-center justify-center"
        >
          <p className="flex max-w-md items-center justify-center bg-[#d3eadd] p-2 text-center text-[#437257] sm:mx-auto">
            <CheckCircleIcon className="mr-2 h-4 w-4" /> Ți-am trimis un e-mail
            cu un link pentru a actualiza parola.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
