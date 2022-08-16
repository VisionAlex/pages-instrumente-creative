import type { ActionFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useActionData } from "@remix-run/react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "~/components/shared/Button";
import { Input } from "~/components/shared/Input";
import { FormError } from "~/pages/account/FormError";
import { login } from "~/providers/customers/customers";
import { storage } from "~/session.server";

type ActionData = {
  formError: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return json(
      { error: "Adresă de e-mail sau parolă incorectă." },
      { status: 401 }
    );
  }

  const data = await login({ email, password });
  if (!data.customerAccessTokenCreate?.customerAccessToken) {
    return json(
      { formError: "Adresă de e-mail sau parolă incorectă." },
      { status: 401 }
    );
  } else {
    const session = await storage.getSession();
    session.set(
      "accessToken",
      data.customerAccessTokenCreate.customerAccessToken.accessToken
    );
    return redirect("/", {
      headers: {
        "Set-Cookie": await storage.commitSession(session),
      },
    });
  }
};

const Login: React.FC = () => {
  const actionData = useActionData<ActionData>();
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
      <FormError error={actionData?.formError} />
      <form className="mb-5" method="post" action="/account/login">
        <div>
          <label className="mb-1 text-subtitle md:text-lg" htmlFor="email">
            Email*
          </label>
          <Input
            required
            name="email"
            type="email"
            className="focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1 text-subtitle md:text-lg" htmlFor="password">
            Parolă*
          </label>
          <Input
            name="password"
            type="password"
            required
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
