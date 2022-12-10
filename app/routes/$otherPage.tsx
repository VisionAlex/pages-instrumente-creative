import type { LoaderFunction } from "@remix-run/cloudflare";
import { useCatch } from "@remix-run/react";
import { Logo } from "~/components/Logo";
import { FadeIn } from "~/components/shared/FadeIn";

export const loader: LoaderFunction = async () => {
  throw new Response("Not Found", { status: 404 });
};

export function CatchBoundary() {
  const caught = useCatch();
  if (caught.status === 404) {
    return (
      <FadeIn className="mt-8 flex w-full flex-col items-center justify-center gap-4">
        <Logo />
        <h1>Oops!</h1>
        <p>Pagina nu exista pe Instrumente Creative</p>
      </FadeIn>
    );
  }
  throw new Error(`Unhandled error", ${caught.status}`);
}

const OtherPage: React.FC = () => {
  return null;
};

export default OtherPage;
