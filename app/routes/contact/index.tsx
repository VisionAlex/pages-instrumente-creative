import { useFetcher } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FaFacebook, FaPinterest, FaTiktok, FaYoutube } from "react-icons/fa";
import { Button } from "~/components/shared/Button";
import { InstagramIcon } from "~/components/shared/icons/InstagramIcon";
import { Input } from "~/components/shared/Input";
import { PageHeader } from "~/components/shared/PageHeader";
import { SocialLink } from "~/components/shared/SocialLinks/SocialLinks";
import { config, links } from "~/config";

const size = 28;

const Contact: React.FC = () => {
  const [emailSent, setEmailSent] = useState(false);
  const fetcher = useFetcher();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (fetcher.data) {
      setEmailSent(true);
      formRef.current?.reset();
    }
  }, [fetcher.data]);

  return (
    <div>
      <PageHeader className="max-w-screen-2xl" />
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-5 md:grid-cols-2 lg:px-8 xl:px-20">
        <div>
          <div className="mb-8 max-w-lg text-subtitle">
            Pentru intrebări și suport va rugăm să ne contactați la adresa de
            e-mail{" "}
            <a className="mr-2 text-primary" href={`mailto:${config.email}`}>
              {config.email}
            </a>
            sau folosiți formularul de contact.
          </div>
          <fetcher.Form
            ref={formRef}
            method="post"
            action="/api/email/send"
            className="max-w-lg"
          >
            <Input name="email" required type="email" placeholder="Email*" />
            <Input
              name="lastName"
              autoComplete="family-name"
              type="text"
              placeholder="Nume"
            />
            <Input
              name="firstName"
              autoComplete="given-name"
              type="text"
              placeholder="Prenume"
            />
            <div>
              <div className="text-right text-sm text-subtitle">
                Max. 500 caractere
              </div>
              <textarea
                placeholder="Mesajul tau"
                rows={5}
                maxLength={500}
                name="message"
                required
                className="mb-5 block w-full border border-secondaryBackground py-3 px-4 shadow-sm outline-none  focus:border-primary focus:ring-primary"
              />
              <Button
                full
                disabled={fetcher.state === "loading"}
                onClick={() => setEmailSent(false)}
              >
                {fetcher.state === "idle" ? "Trimite mesajul" : "Se trimite..."}
              </Button>
            </div>
            <div className="mt-5 flex h-6 items-center justify-center text-green-700">
              <AnimatePresence>
                {emailSent && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    Mesajul a fost trimis cu succes! Iți vom răspunde în cel mai
                    scurt timp.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </fetcher.Form>
        </div>
        <div>
          <div>
            Suntem activi si pe retelele de socializare asa ca ne puteti urmari
            pe:
          </div>
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center">
              <SocialLink href={links.facebook}>
                <FaFacebook size={size} className="text-[#4267B2]" />
              </SocialLink>
              <a href={links.facebook}>Facebook</a>
            </div>
            <div className="flex items-center">
              <SocialLink href={links.instagram}>
                <InstagramIcon width={size} />
              </SocialLink>
              <a href={links.instagram}>Instagram</a>
            </div>
            <div className="flex items-center">
              <SocialLink href={links.youtube}>
                <FaYoutube size={size} className="text-[#FF0000]" />
              </SocialLink>
              <a href={links.youtube}>Youtube</a>
            </div>
            <div className="flex items-center">
              <SocialLink href={links.tiktok}>
                <FaTiktok size={size} className="text-black" />
              </SocialLink>
              <a href={links.tiktok}>TikTok</a>
            </div>
            <div className="flex items-center">
              <SocialLink href={links.pinterest}>
                <FaPinterest size={size} className="text-[#E60023]" />
              </SocialLink>
              <a href={links.pinterest}>Pinterest</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;

export function ErrorBoundary({ error }: { error: Error }) {
  console.log("contact error", error);
  return (
    <div className="mx-auto mt-8 flex w-fit max-w-2xl flex-col items-center justify-center p-4">
      <h1 className="text-center text-lg text-red-700">Eroare!</h1>
      <p className="text-subtitle">Ne pare rău. Serverul e zăpăcit.</p>
      <p className="mt-4">{error.message}</p>
    </div>
  );
}
