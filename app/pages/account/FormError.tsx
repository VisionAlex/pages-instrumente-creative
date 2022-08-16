import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import React from "react";

interface Props {
  error?: string;
}

export const FormError: React.FC<Props> = ({ error }) => {
  if (!error) return null;
  return (
    <div className="mt-5 mb-2 flex w-full items-center bg-errorBackground py-3 px-5 text-error">
      <QuestionMarkCircleIcon className="mr-3 h-5 w-5" />
      {error}
    </div>
  );
};
