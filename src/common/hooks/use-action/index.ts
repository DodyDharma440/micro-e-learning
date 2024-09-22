import type { QueryKey } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";

import type { ApiResponse } from "@/common/interfaces/api";

const AUTO_CLOSE = 3000;

export type ActionOptions<R> = {
  onSuccess?: (res: AxiosResponse<R>) => void;
  onError?: (res: AxiosError<any> | Error) => void;
  successMessage?: ((res: AxiosResponse<R>) => string) | string;
  errorMessage?:
    | ((res: AxiosError<any> | Error) => string | undefined)
    | string;
  hideError?: boolean;
  // successNotifProps?: ToastInput;
  // errorNotifProps?: ToastInput;
  overrideKeys?: QueryKey;
  mapKeysOnSettled?: boolean;
};

export const useAction = <T = any, P = any, R = ApiResponse<T>>(
  queryKey: QueryKey,
  apiFn: (args: P) => Promise<AxiosResponse<R>>,
  options?: ActionOptions<R>
) => {
  const queryClient = useQueryClient();
  // const { setToast } = useToasts();

  return useMutation({
    mutationFn: apiFn,
    onSuccess: (res) => {
      if (options?.successMessage) {
        const { successMessage } = options;
        const message =
          successMessage instanceof Function
            ? successMessage(res)
            : successMessage;

        // const notifProps: ToastInput = {
        //   text: message,
        //   type: "success",
        //   delay: AUTO_CLOSE,
        //   ...(options?.successNotifProps || {}),
        // };
        // setToast(notifProps);
      }

      options?.onSuccess?.(res);
    },
    onError: (error: AxiosError | Error) => {
      if (!options?.hideError) {
        if (options?.errorMessage) {
          const { errorMessage } = options;
          const message =
            errorMessage instanceof Function
              ? errorMessage(error)
              : errorMessage;
          // setToast({
          //   text: message,
          //   type: "error",
          //   delay: AUTO_CLOSE,
          //   ...(options?.errorNotifProps || {}),
          // });
          return;
        }

        const axiosError = error as AxiosError<any>;
        const responseError = axiosError.response?.data?.error;

        if (responseError instanceof Object) {
          Object.values(responseError).forEach((value, index) => {
            let message = "";
            if (value instanceof Object) {
              message = (value as any).message;
            } else if (value instanceof Array) {
              message = value.join(", ");
            } else {
              message = value?.toString() || "Something went wrong";
            }

            setTimeout(() => {
              // setToast({
              //   text: message || "Something went wrong.",
              //   type: "error",
              //   delay: AUTO_CLOSE,
              //   ...(options?.errorNotifProps || {}),
              // });
            }, index * 300);
          });
          return;
        }

        if (axiosError?.response?.data?.message) {
          // setToast({
          //   text: axiosError?.response?.data?.message,
          //   type: "error",
          //   delay: AUTO_CLOSE,
          //   ...(options?.errorNotifProps || {}),
          // });
          return;
        }

        // setToast({
        //   text:
        //     axiosError.response?.data?.error?.toString() ||
        //     error.message ||
        //     "Something went wrong.",
        //   type: "error",
        //   delay: AUTO_CLOSE,
        //   ...(options?.errorNotifProps || {}),
        // });
      }
      options?.onError?.(error);
    },
    onSettled: () => {
      if (queryKey.length) {
        if (options?.mapKeysOnSettled) {
          queryKey.forEach((key) => {
            queryClient.refetchQueries({ queryKey: [key] });
          });
        } else {
          queryClient.refetchQueries({ queryKey });
        }
      }
    },
  });
};
