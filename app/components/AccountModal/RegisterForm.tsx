import React from "react";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import type { AuthForm } from "./AccountModal";

interface Props {
  setForm: React.Dispatch<React.SetStateAction<AuthForm>>;
}

export const RegisterForm: React.FC<Props> = ({ setForm }) => {
  return (
    <form className="mt-10">
      <Input type="text" placeholder="Prenume" />
      <Input type="text" placeholder="Nume de familie" />
      <Input type="email" placeholder="Email*" />
      <Input type="password" placeholder="Parolă*" />
      <div className="flex justify-end text-subtitle hover:text-primary">
        <button>Ți-ai uitat parola?</button>
      </div>
      <div className="mt-10 flex flex-col gap-4">
        <Button full type="submit">
          Înregistrează-te
        </Button>
        <Button
          type="button"
          full
          variant="light"
          onClick={() => setForm("login")}
        >
          Autentificare
        </Button>
      </div>
    </form>
  );
};
