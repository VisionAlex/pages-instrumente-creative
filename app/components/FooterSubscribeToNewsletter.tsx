import { CheckCircleIcon } from "@heroicons/react/outline";
import { useFetcher } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import type { GetUserQuery } from "~/generated/graphql";

interface Props {
  user: GetUserQuery | null;
}

export const FooterSubscribeToNewsletter: React.FC<Props> = ({ user }) => {
  const fetcher = useFetcher();
  const state = fetcher.submission || fetcher.data ? "success" : "idle";

  if (user?.customer?.acceptsMarketing) return null;
  return (
    <div className="h-8">
      <AnimatePresence exitBeforeEnter>
        {state === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            key="success"
            className="mx-5 flex h-8 max-w-md items-center justify-center bg-[#d3eadd] text-[#437257] sm:mx-auto"
          >
            <CheckCircleIcon className="mr-2 h-4 w-4" /> Te-ai abonat cu
            success! Mulțumim!
          </motion.div>
        )}
        {state === "idle" ? (
          <fetcher.Form method="post" action="/api/email?index">
            <motion.fieldset
              key="fieldset"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="my-4 mx-5  flex  h-8 items-center justify-center"
            >
              <input
                className="grow-1 mr-5 max-w-sm grow border-b border-line bg-background pl-2 leading-loose text-primary outline-none"
                type="email"
                required
                name="email"
                placeholder="Adresă de e-mail"
              />
              <button
                className="h-8 leading-relaxed text-subtitle transition duration-500 hover:text-primary"
                type="submit"
              >
                Abonează-te
              </button>
            </motion.fieldset>
          </fetcher.Form>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
