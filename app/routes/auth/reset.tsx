import { useNavigate } from "@remix-run/react";
import React from "react";
import { Button } from "~/components/shared/Button";
import { Input } from "~/components/shared/Input";

// https://community.shopify.com/c/shopify-apis-and-sdks/reset-password-token-in-notification-email/td-p/367455

const Reset: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="md:px-10">
      <div className="text-center antialiased">
        <h1 className="mb-5 text-4xl">Resetează parola</h1>
        <p className="text-subtitle">
          Îți vom trimite un e-mail pentru a reseta parola.
        </p>
      </div>
      <form className="mb-5 mt-10">
        <Input
          name="email"
          type="email"
          className="h-14 focus:border-primary"
          placeholder="E-mail"
        />
        <div className="mb-48 flex gap-6">
          <Button full type="submit" className="h-14">
            Trimite
          </Button>
          <Button
            full
            variant="light"
            type="button"
            className="h-14"
            onClick={() => navigate("/auth/login")}
          >
            Anulează
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Reset;
