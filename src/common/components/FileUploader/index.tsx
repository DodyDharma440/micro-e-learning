import React, { forwardRef } from "react";
import { HiUpload } from "react-icons/hi";

import { cn } from "@nextui-org/react";

type FileUploaderProps = JSX.IntrinsicElements["label"] & {
  description?: string;
  fileType?: "image" | "video" | "document";
};

const FileUploader = forwardRef<HTMLLabelElement, FileUploaderProps>(
  ({ children, description, ...props }, ref) => {
    return (
      <div className="w-full relative">
        <label
          {...props}
          className={cn(
            "flex items-center justify-center z-[1] border rounded-md p-5 border-dashed border-gray-600 dark:border-gray-400 cursor-pointer relative overflow-hidden flex-col bg-gray-100 dark:bg-neutral-900",
            props.className
          )}
          ref={ref}
        >
          {children ? (
            <>{children}</>
          ) : (
            <>
              <div className="w-10 h-10 relative">
                <HiUpload size={40} className="opacity-50" />
              </div>
              {description ? (
                <p className="mt-2 text-xs text-center max-w-[115px]">
                  Please{" "}
                  <span className="text-primary-500 font-medium">Upload</span>{" "}
                  {description}
                </p>
              ) : null}
            </>
          )}
        </label>
      </div>
    );
  }
);

FileUploader.displayName = "FileUploader";

export default FileUploader;
