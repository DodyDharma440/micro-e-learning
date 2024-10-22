import React, { forwardRef, useId, useMemo } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi2";

import Image from "next/image";

import { Button } from "@nextui-org/react";

import FileUploader from "../FileUploader";

type ImageUploaderProps = Omit<
  JSX.IntrinsicElements["input"],
  "value" | "onChange"
> & {
  value?: File | null;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (file: File) => void;
  imageUrl?: string | null;
  frameProps?: Omit<JSX.IntrinsicElements["label"], "children">;
  frameRef?: React.MutableRefObject<HTMLLabelElement>;
  description?: string;
  withActionOverlay?: boolean;
  onClear?: () => void;
  errorMessage?: string;
};

const ImageUploader = forwardRef<HTMLInputElement, ImageUploaderProps>(
  (
    {
      onChange,
      onChangeInput,
      value,
      imageUrl: defaultUrl,
      frameProps,
      frameRef,
      description,
      withActionOverlay,
      onClear,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const id = useId();
    const imageUrl = useMemo(() => {
      return value ? URL.createObjectURL(value) : defaultUrl || "";
    }, [defaultUrl, value]);

    return (
      <>
        <input
          id={id}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
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
            htmlFor={withActionOverlay && imageUrl ? "" : id}
            description={description}
            {...frameProps}
            errorMessage={errorMessage}
            ref={frameRef}
          >
            {imageUrl ? (
              <>
                <Image
                  src={imageUrl}
                  alt="Uploaded image"
                  fill
                  style={{ objectFit: "contain" }}
                />
                {withActionOverlay ? (
                  <div className="flex items-center justify-center opacity-0 transition-opacity duration-300 gap-4 absolute inset-0 bg-white bg-opacity-20 backdrop-blur-[4px] group-hover:opacity-100 z-10">
                    <Button
                      color="danger"
                      startContent={<HiOutlineTrash size={20} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onClear?.();
                      }}
                    >
                      Delete
                    </Button>

                    <Button
                      color="primary"
                      as="label"
                      htmlFor={id}
                      className="cursor-pointer"
                      startContent={<HiOutlinePhotograph size={20} />}
                    >
                      Browse
                    </Button>
                  </div>
                ) : null}
              </>
            ) : null}
          </FileUploader>
        </div>
      </>
    );
  }
);

ImageUploader.displayName = "ImageUploader";

export default ImageUploader;
