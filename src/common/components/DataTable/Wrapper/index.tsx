import React, { forwardRef } from "react";

import { cn } from "@nextui-org/react";

type DataTableWrapperProps = {
  content: "add-button" | "search-perpage";
  children: React.ReactNode;
} & Omit<JSX.IntrinsicElements["div"], "children">;

const DataTableWrapper = forwardRef<HTMLDivElement, DataTableWrapperProps>(
  ({ content, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(props.className, "flex items-center justify-between", {
          ["mb-4"]: content === "search-perpage",
        })}
      >
        {children}
      </div>
    );
  }
);

DataTableWrapper.displayName = "DataTableWrapper";

export default DataTableWrapper;
