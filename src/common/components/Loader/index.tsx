import React from "react";

import { CircularProgress } from "@nextui-org/react";
import type { AxiosError } from "axios";

import { getErrorMessage } from "@/common/utils/react-query";

export type LoaderProps = {
  children: React.ReactNode;
  isLoading: boolean;
  isRefetching?: boolean;
  error?: AxiosError<any, any> | null;
  placeholderHeight?: string;
  screenLoader?: boolean;
  loaderElement?: React.ReactNode;
  ignore?: boolean;
};

const Loader: React.FC<LoaderProps> = ({
  children,
  isLoading,
  isRefetching,
  error,
  placeholderHeight = "400px",
  loaderElement,
  ignore,
}) => {
  return (
    <>
      {ignore ? (
        <>{children}</>
      ) : (
        <>
          {isLoading || isRefetching ? (
            <>
              {loaderElement || (
                <div
                  className="flex items-center justify-center"
                  style={{ height: placeholderHeight }}
                >
                  <CircularProgress />
                </div>
              )}
            </>
          ) : error ? (
            <div
              className="flex items-center justify-center"
              style={{ height: placeholderHeight }}
            >
              <p className="text-center">{getErrorMessage(error)}</p>
            </div>
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </>
  );
};

export default Loader;
