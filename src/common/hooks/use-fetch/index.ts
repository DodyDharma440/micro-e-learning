import { useCallback } from "react";

import { useDidUpdate } from "@mantine/hooks";
import type { QueryFunction, QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";

import type { ApiResponse } from "@/common/interfaces/api";

export type UseFetchOptions<T, R = ApiResponse<T>> = {
  cancellation?: any[];
  uniqueKey?: QueryKey;
} & Omit<UseQueryOptions<AxiosResponse<R>, AxiosError<any>, AxiosResponse<R>, QueryKey>, "queryKey"> & {
    queryKey?: QueryKey;
  };

export const useFetch = <T, R = ApiResponse<T>>(
  queryKey: QueryKey,
  apiFn: QueryFunction<AxiosResponse<R>, QueryKey>,
  options?: UseFetchOptions<T, R>
) => {
  const queryClient = useQueryClient();
  const cancel = useCallback(() => {
    queryClient.cancelQueries({ queryKey });
  }, [queryClient, queryKey]);

  useDidUpdate(() => {
    if (options?.cancellation) {
      cancel();
    }
  }, [...(options?.cancellation || []), queryClient, queryKey]);

  const query = useQuery<AxiosResponse<R>, AxiosError<any>, AxiosResponse<R>, QueryKey>({
    queryFn: apiFn,
    queryKey,
    ...options,
  });

  return {
    ...query,
    cancel,
  } as typeof query & { cancel: typeof cancel };
};
