import { Form } from "@remix-run/react";
import React from "react";
import { classNames } from "~/shared/utils/classNames";
import { Button } from "../Button";

interface Props {
  className?: string;
}

export const NewsletterWidget: React.FC<Props> = ({ className = "" }) => {
  return (
    <div className={classNames("border border-line px-8 py-12", className)}>
      <h3 className="text-center uppercase leading-6 tracking-widest">
        Abonați-vă la newsletter
      </h3>
      <Form className="mt-4 flex w-full flex-col gap-4">
        <input
          className="border border-line py-4 text-center outline-primary placeholder:text-center"
          placeholder="Adresă de email"
        />
        <Button type="submit" variant="dark" className="uppercase" full>
          Abonează-te
        </Button>
      </Form>
    </div>
  );
};
