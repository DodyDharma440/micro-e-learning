import type { ToastOptions } from "react-toastify";
import { toast } from "react-toastify";

import type { QueryKey } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";

import type { ApiResponse } from "@/common/interfaces/api";

export type ActionOptions<R> = {
  onSuccess?: (res: AxiosResponse<R>) => void;
  onError?: (res: AxiosError<any> | Error) => void;
  successMessage?: ((res: AxiosResponse<R>) => string) | string;
  errorMessage?:
    | ((res: AxiosError<any> | Error) => string | undefined)
    | string;
  hideError?: boolean;
  successNotifProps?: ToastOptions;
  errorNotifProps?: ToastOptions;
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

        toast.success(message, {
          ...(options?.errorNotifProps || {}),
        });
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
          toast.error(message, {
            ...(options?.errorNotifProps || {}),
          });
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
              toast.error(message, {
                ...(options?.errorNotifProps || {}),
              });
            }, index * 300);
          });
          return;
        }

        if (axiosError?.response?.data?.error) {
          toast.error(axiosError?.response?.data?.error, {
            ...(options?.errorNotifProps || {}),
          });
          return;
        }

        if (axiosError?.response?.data?.message) {
          toast.error(axiosError?.response?.data?.message, {
            ...(options?.errorNotifProps || {}),
          });
          return;
        }

        toast.error(error.message || "Something went wrong.", {
          ...(options?.errorNotifProps || {}),
        });
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
