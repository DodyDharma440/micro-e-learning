import React from "react";
import { HiArrowLeft } from "react-icons/hi";

import { useRouter } from "next/router";

import { Button, cn } from "@nextui-org/react";

type ContentProps = {
  title?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  withBackButton?: boolean;
  backAction?: () => void;
  backHref?: string;
  classNames?: Partial<Record<"container", string>>;
};

const Content: React.FC<ContentProps> = ({
  title,
  action,
  children,
  withBackButton,
  backAction,
  backHref,
  classNames,
}) => {
  const { push, back } = useRouter();

  return (
    <div className="px-5">
      <div
        className={cn(
          "flex items-center justify-between mb-5",
          classNames?.container
        )}
      >
        <div className="flex items-center gap-4">
          {withBackButton ? (
            <Button
              isIconOnly
              aria-label="Back"
              variant="light"
              onClick={() =>
                backAction ? backAction() : backHref ? push(backHref) : back()
              }
            >
              <HiArrowLeft />
            </Button>
          ) : null}
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
};

export default Content;
