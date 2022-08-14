import React from "react";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import type { AuthForm } from "./AccountModal";

interface Props {
  setForm: React.Dispatch<React.SetStateAction<AuthForm>>;
}

export const ResetForm: React.FC<Props> = ({ setForm }) => {
  return (
    <form className="mt-4">
      <div className="mb-10 text-center text-subtitle">
        Îți vom trimite un e-mail pentru a reseta parola.
      </div>
      <Input type="email" placeholder="Email" />
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
    </form>
  );
};
