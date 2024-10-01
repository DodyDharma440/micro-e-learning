import type { QueryKey } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import type { ApiResponse } from "../../interfaces/api";

export const useQueryData = <T, R = AxiosResponse<ApiResponse<T>>>(
  key: QueryKey
) => {
  const queryClient = useQueryClient();

  const queryData = queryClient.getQueryData<R>(key);
  const queryState = queryClient.getQueryState<R>(key);

  return { queryData, queryState };
};
