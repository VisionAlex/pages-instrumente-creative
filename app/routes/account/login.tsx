import React from "react";
import { Link } from "react-router-dom";
import { Button } from "~/components/shared/Button";
import { Input } from "~/components/shared/Input";

const Login: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-center pb-7 text-title antialiased">
        <h1 className="relative px-4 after:absolute after:right-[-3px] after:top-1/2 after:block after:h-[5px] after:w-[5px] after:bg-primary">
          Autentificare
        </h1>
        <Link
          className="px-4 text-input hover:text-primary"
          to="/account/register"
        >
          Creează un cont
        </Link>
      </div>
      <form className="mb-5">
        <div>
          <label className="mb-1 text-lg text-subtitle" htmlFor="email">
            Email*
          </label>
          <Input name="email" type="email" className="focus:border-primary" />
        </div>
        <div>
          <label className="mb-1" htmlFor="password">
            Parolă*
          </label>
          <Input
            name="password"
            type="password"
            className="focus:border-primary"
          />
        </div>
        <div className="mb-48 flex items-center justify-between">
          <Button className="w-1/2">Autentifica-te</Button>
          <Link to="/account/reset" className="text-subtitle">
            Ți-ai uitat parola?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
