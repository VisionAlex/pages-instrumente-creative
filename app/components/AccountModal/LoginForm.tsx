import React from "react";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import type { AuthForm } from "./AccountModal";

interface Props {
  setForm: React.Dispatch<React.SetStateAction<AuthForm>>;
}

export const LoginForm: React.FC<Props> = ({ setForm }) => {
  return (
    <form className="mt-10" method="post" action="/account/login">
      <Input name="email" type="email" placeholder="Email*" />
      <Input name="password" type="password" placeholder="Parolă*" />
      <div className="flex justify-end text-subtitle hover:text-primary">
        <button type="button" onClick={() => setForm("reset")}>
          Ți-ai uitat parola?
        </button>
      </div>
      <div className="mt-10 flex flex-col gap-4">
        <Button full type="submit">
          Autentifică-te
        </Button>
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
