import { UserIcon } from "@heroicons/react/outline";
import { UserIcon as UserIconSolid } from "@heroicons/react/solid";
import { useNavigate } from "@remix-run/react";
import React, { useMemo } from "react";
import type { GetUserQuery } from "~/generated/graphql";
import { classNames } from "~/shared/utils/classNames";

interface Props {
  openModal: () => void;
  user: GetUserQuery | null;
  className?: string;
}

export const AccountIcon: React.FC<Props> = ({
  openModal,
  user,
  className = "",
}) => {
  const navigate = useNavigate();

  const handleClickAccount = useMemo(() => {
    if (user) return () => navigate("/account");
    return openModal;
  }, [navigate, openModal, user]);
  const User = useMemo(() => {
    if (user) return UserIconSolid;
    return UserIcon;
  }, [user]);
  return (
    <User
      strokeWidth={1}
      className={classNames(
        "h-5 w-5 cursor-pointer text-primary hover:opacity-70",
        className
      )}
      onClick={handleClickAccount}
    />
  );
};
