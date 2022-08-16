import type { ActionFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useActionData } from "@remix-run/react";
import { Link } from "react-router-dom";
import { Button } from "~/components/shared/Button";
import { FormField } from "~/pages/account/FormField";
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
} from "~/pages/account/validate.server";
import { register } from "~/providers/customers/customers";

export type RegisterActionData = {
  formError?: string;
  fieldErrors?: {
    email?: string | undefined;
    password?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
  };
  fields?: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string"
  ) {
    return json({ formError: "Formularul nu este valid" }, { status: 400 });
  }

  const fieldErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
    firstName: validateFirstName(firstName),
    lastName: validateLastName(lastName),
  };
  const fields = {
    firstName,
    lastName,
    email,
    password,
  };

  const hasErrors = Object.values(fieldErrors).some((error) => error);
  if (hasErrors) {
    return json({ fieldErrors, fields });
  }

  const response = await register({
    email,
    password,
    firstName: firstName ?? undefined,
    lastName: lastName ?? undefined,
  });

  if (response.customerCreate?.customerUserErrors) {
    console.log(response.customerCreate.customerUserErrors);
    throw new Error("Need to implement error handling");
  } else {
    throw new Error("Need to implement success handling");
  }
};

const Register: React.FC = () => {
  const actionData = useActionData<RegisterActionData>();

  return (
    <div>
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
        <FormField
          label="Prenume"
          name="firstName"
          defaultValue={actionData?.fields?.firstName}
          error={actionData?.fieldErrors?.firstName}
        />
        <FormField
          label="Nume de familie"
          name="lastName"
          defaultValue={actionData?.fields?.lastName}
          error={actionData?.fieldErrors?.lastName}
        />
        <FormField
          label="Email*"
          name="email"
          type="email"
          required
          defaultValue={actionData?.fields?.email}
          error={actionData?.fieldErrors?.email}
        />
        <FormField
          label="Parola*"
          name="password"
          type="password"
          required
          defaultValue={actionData?.fields?.password}
          error={actionData?.fieldErrors?.password}
        />
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
