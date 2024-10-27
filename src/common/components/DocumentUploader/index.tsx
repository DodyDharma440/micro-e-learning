import React, { forwardRef, useId, useMemo } from "react";
import { HiOutlineDocument } from "react-icons/hi";
import { HiDocument, HiOutlineTrash } from "react-icons/hi2";

import { Button } from "@nextui-org/react";

import FileUploader from "../FileUploader";

type DocumentUploaderProps = Omit<
  JSX.IntrinsicElements["input"],
  "value" | "onChange"
> & {
  value?: File | null;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (file: File) => void;
  docUrl?: string | null;
  frameProps?: Omit<JSX.IntrinsicElements["label"], "children">;
  frameRef?: React.MutableRefObject<HTMLLabelElement>;
  description?: string;
  onClear?: () => void;
  errorMessage?: string;
};

const DocumentUploader = forwardRef<HTMLInputElement, DocumentUploaderProps>(
  (
    {
      onChange,
      onChangeInput,
      value,
      docUrl: defaultUrl,
      frameProps,
      frameRef,
      description,
      onClear,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const id = useId();
    const docUrl = useMemo(() => {
      return value ? URL.createObjectURL(value) : defaultUrl || "";
    }, [defaultUrl, value]);

    const fileName = useMemo(() => {
      const fileNameUrl = docUrl.split("/");
      return value?.name ?? fileNameUrl[fileNameUrl.length - 1];
    }, [docUrl, value]);

    return (
      <>
        <input
          id={id}
          type="file"
          accept={[
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
          ].join(",")}
          ref={ref}
          {...props}
          value=""
          style={{ display: "none" }}
          onChange={(e) => {
            onChangeInput?.(e);

            const file = e.target.files?.[0];
            if (file) {
              onChange?.(file);
            }
          }}
        />
        <div className="relative">
          <FileUploader
            htmlFor={docUrl ? "" : id}
            description={description}
            {...frameProps}
            errorMessage={errorMessage}
            ref={frameRef}
          >
            {docUrl ? (
              <>
                <HiDocument size={40} />
                <p className="text-xs mt-1 text-center">{fileName}</p>
                <div className="flex items-center gap-2 mt-4">
                  <Button
                    color="danger"
                    startContent={<HiOutlineTrash size={20} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onClear?.();
                    }}
                    size="sm"
                  >
                    Delete
                  </Button>

                  <Button
                    color="primary"
                    as="label"
                    htmlFor={id}
                    className="cursor-pointer"
                    startContent={<HiOutlineDocument size={20} />}
                    size="sm"
                  >
                    Browse
                  </Button>
                </div>
              </>
            ) : null}
          </FileUploader>
        </div>
      </>
    );
  }
);

DocumentUploader.displayName = "DocumentUploader";

export default DocumentUploader;
