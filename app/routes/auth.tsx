import { Outlet } from "@remix-run/react";

const Auth: React.FC = () => {
  return (
    <div className="mx-auto mt-4 max-w-xl px-5 pt-2.5 sm:mt-8 md:mt-16">
      <Outlet />
    </div>
  );
};

export default Auth;
