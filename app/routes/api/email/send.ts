import type { ActionFunction, HeadersFunction } from "@remix-run/cloudflare";
import sendgrid from "~/providers/sendgrid";

export const headers: HeadersFunction = ({ actionHeaders }) => {
  return actionHeaders;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  if (!firstName || !lastName || !email || !message) {
    throw new Error("Missing required fields");
  }
  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    throw new Error("Invalid fields");
  }
  const response = await sendgrid.sendEmail({
    email,
    message,
    firstName: firstName || "",
    lastName: lastName || "",
  });
  if (response.status === 202) {
    return { ok: true, errors: null };
  } else {
    const data = await response.json();
    console.log(data);
  }

  return { ok: true, errors: null };
};
