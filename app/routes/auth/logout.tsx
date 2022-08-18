import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { storage } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  session.unset("accessToken");
  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};
