import React from "react";
import { PageHeader } from "~/components/shared/PageHeader";

export const SOCIAL_MEDIA = [
  {
    name: "Instagram",
    link: "https://www.instagram.com/instrumente.creative/",
  },
  {
    name: "Facebook",
    link: "https://www.facebook.com/InstrumenteCreative",
  },
  {
    name: "Pinterest",
    link: "",
  },
  {
    name: "Twitter",
    link: "https://twitter.com/instr_creative",
  },
  {
    name: "Youtube",
    link: "https://www.youtube.com/channel/UCRfuxKsTH26Z6uj9FbdpBxA/videos",
  },
];

const Contact: React.FC = () => {
  return (
    <div>
      <PageHeader />
      <div className=" mx-5 flex flex-col">
        <div className="mb-8">
          <p className="text-subtitle">
            Pentru suport vă rugăm să ne contactați la adresa de e-mail
            instrumentecreative@gmail.com
          </p>
        </div>
        <div className="mb-16 lg:mb-44">
          <p className="mb-5">Ne găsești pe:</p>
          <ul>
            {SOCIAL_MEDIA.map((media) => (
              <li key={media.name} className="mb-5">
                <a href={media.link}>{media.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Contact;
