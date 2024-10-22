import React from "react";
import type { IconType } from "react-icons";
import { HiArchiveBox } from "react-icons/hi2";

type EmptyPlaceholderProps = {
  icon?: IconType;
  message?: React.ReactNode;
};

const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = ({
  icon,
  message,
}) => {
  const Icon = icon ?? HiArchiveBox;

  return (
    <div className="flex items-center justify-center bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 p-10 flex-col gap-2 rounded-md text-center text-gray-700 dark:text-gray-400">
      <div className="flex items-center justify-center">
        <Icon size={40} />
      </div>
      <p className="text-sm max-w-[320px]">{message ?? "No data"}</p>
    </div>
  );
};

export default EmptyPlaceholder;
