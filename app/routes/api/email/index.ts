import type { ActionFunction, HeadersFunction } from "@remix-run/cloudflare";
import { createSendGridSdk } from "~/providers/sendgrid";

export const headers: HeadersFunction = ({ actionHeaders }) => {
  return actionHeaders;
};

export const action: ActionFunction = async ({ request, context }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  if (!email || typeof email !== "string") {
    return { success: false, errors: ["Email is required"] };
  }
  const sendgrid = createSendGridSdk(context);
  const response = await sendgrid.addEmail(email);
  if (!response.errors) {
    return { ok: true, errors: null };
  }
  console.log("sendgrid.addEmail error:", response.errors);
  return {
    ok: false,
    errors: response.errors,
  };
};
