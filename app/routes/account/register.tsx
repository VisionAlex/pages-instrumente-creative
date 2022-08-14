import type { ActionFunction } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { useActionData } from "@remix-run/react";
import { sdk } from "graphqlWrapper";
import { Link } from "react-router-dom";
import { Button } from "~/components/shared/Button";
import { Input } from "~/components/shared/Input";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const firstName = body.get("firstName");
  const lastName = body.get("lastName");
  const email = body.get("email");
  const password = body.get("password");

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  )
    return json({ error: "Invalid fields" });

  const response = await sdk.customerCreate(
    { input: { firstName, lastName, email, password } },
    { request }
  );
  if (response.customerCreate?.customerUserErrors?.length) {
    return json(response.customerCreate.customerUserErrors);
  } else {
    return redirect("/");
  }
};

const Register: React.FC = () => {
  const errors = useActionData();

  return (
    <div>
      <div className="text-red-500">
        <pre>{JSON.stringify(errors, null, 2)}</pre>
      </div>
      <div className="flex items-center justify-center pb-7 text-title antialiased">
        <h1 className="relative px-4 after:absolute after:right-[-3px] after:top-1/2 after:block after:h-[5px] after:w-[5px] after:bg-primary">
          Creează un cont
        </h1>
        <Link
          className="px-4 text-input hover:text-primary"
          to="/account/login"
        >
          Autentificare
        </Link>
      </div>
      <form className="mb-5" method="post" action="/account/register">
        <div>
          <label className="mb-1 text-lg text-subtitle" htmlFor="firstname">
            Prenume
          </label>
          <Input name="firstName" className="focus:border-primary" />
        </div>
        <div>
          <label className="mb-1 text-lg text-subtitle" htmlFor="lastname">
            Nume de familie
          </label>
          <Input name="lastName" className="focus:border-primary" />
        </div>
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
        <div className="mb-48 mt-4 flex items-center justify-between">
          <Button type="submit" full>
            Înregistrează-Te
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
