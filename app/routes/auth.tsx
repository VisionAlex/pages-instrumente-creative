import { Outlet } from "@remix-run/react";
import { FadeIn } from "~/components/shared/FadeIn";

const Auth: React.FC = () => {
  return (
    <FadeIn className="mx-auto mt-4 max-w-xl px-5 pt-2.5 sm:mt-8 md:mt-16">
      <Outlet />
    </FadeIn>
  );
};

export default Auth;
