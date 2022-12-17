import { CheckCircleIcon } from "@heroicons/react/outline";
import type { ActionFunction } from "@remix-run/cloudflare";
import { useFetcher } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { Button } from "~/components/shared/Button";
import { Input } from "~/components/shared/Input";
import { LinkButton } from "~/components/shared/LinkButton";
import { createSdk } from "~/graphqlWrapper";

// https://community.shopify.com/c/shopify-apis-and-sdks/reset-password-token-in-notification-email/td-p/367455

export const action: ActionFunction = async ({ request, context }) => {
  const sdk = createSdk(context);
  const formData = await request.formData();
  const email = formData.get("email");

  if (typeof email === "string") {
    sdk.customerRecover({ email });
    return { ok: true };
  }
  return { ok: false };
};

const Reset: React.FC = () => {
  const fetcher = useFetcher();
  const state = fetcher.submission || fetcher.data ? "success" : "idle";

  return (
    <div className="md:px-10">
      <div className="text-center antialiased">
        <h1 className="mb-5 text-4xl">Resetează parola</h1>
      </div>
      <AnimatePresence exitBeforeEnter>
        {state === "idle" ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-[196px]"
          >
            <p className="text-center text-subtitle">
              Îți vom trimite un e-mail pentru a reseta parola.
            </p>
            <fetcher.Form className="mb-5 mt-10" method="post">
              <Input
                name="email"
                type="email"
                required
                className="h-14 focus:border-primary"
                placeholder="E-mail"
              />
              <div className="mb-48 flex gap-6">
                <Button full type="submit" className="h-14">
                  Trimite
                </Button>
                <LinkButton
                  full
                  variant="light"
                  className="h-14"
                  to="/auth/login"
                  text="Anulează"
                />
              </div>
            </fetcher.Form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            key="success"
            className="flex h-[196px] items-center justify-center"
          >
            <p className="flex h-8 max-w-md items-center justify-center bg-[#d3eadd] p-4 text-[#437257] sm:mx-auto">
              <CheckCircleIcon className="mr-2 h-4 w-4" /> Ți-am trimis un
              e-mail cu un link pentru a actualiza parola.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Reset;
