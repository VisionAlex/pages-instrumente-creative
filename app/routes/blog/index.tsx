import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { PAGE_HANDLE } from "~/config";

export const loader: LoaderFunction = async () => {
  return redirect(`/blog/${PAGE_HANDLE.BLOG_CHILD_DEVELOPMENT}`);
};
