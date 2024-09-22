import type {
  QueryFunction,
  QueryFunctionContext,
  QueryKey,
} from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";

import type { ActionOptions, UseFetchOptions } from "../hooks";
import { useAction, useFetch } from "../hooks";
import type { ApiResponse, BasicData } from "../interfaces/api";

type FindFn<P, R> = (
  args: P,
  ctx?: QueryFunctionContext<QueryKey> & { prevRoute?: string | null }
) => ReturnType<QueryFunction<AxiosResponse<R>>>;

type MutationFn<P, R> = (
  args: P & { signal?: AbortSignal }
) => Promise<AxiosResponse<R>>;

type FindFnQueryKey<P> = QueryKey | ((args: P) => QueryKey);

export type FindAll<D extends object> = { urlParams?: string } & D;
export const get = <
  T = any,
  D extends object = object,
  R = ApiResponse<T>,
  P extends FindAll<D> | undefined = FindAll<D>
>(
  apiFn: FindFn<P | undefined, R>,
  queryKey: FindFnQueryKey<P | undefined>
) => {
  const useHookFn = (args?: P, options?: UseFetchOptions<T, R>) => {
    const key = queryKey instanceof Function ? queryKey(args) : queryKey;

    return useFetch<T, R>(
      [...key, ...(options?.uniqueKey || [])],
      (ctx) => apiFn(args || ({} as P), ctx),
      options
    );
  };

  return useHookFn;
};

export type FindById<I, D extends object = object> = { id: I } & D;
export const getById = <
  T,
  D extends object = object,
  R = ApiResponse<T>,
  I = string | number,
  P = FindById<I, D>
>(
  apiFn: FindFn<P, R>,
  queryKey: FindFnQueryKey<P>
) => {
  const useHookFn = (args: P, options?: UseFetchOptions<T, R>) => {
    const key = queryKey instanceof Function ? queryKey(args) : queryKey;
    return useFetch(
      [...key, ...(options?.uniqueKey || [])],
      (ctx) => apiFn(args, ctx),
      options
    );
  };

  return useHookFn;
};

const createMutationFunction = <T, P, R = ApiResponse<T>>(
  apiFn: MutationFn<P, R>,
  queryKey: FindFnQueryKey<ActionOptions<R> | undefined>,
  defaultOptions?: Omit<ActionOptions<R>, "overrideKeys">
) => {
  const useHookFn = (options?: ActionOptions<R>, uniqueKey?: QueryKey) => {
    const _options = {
      ...(defaultOptions || {}),
      ...options,
    };

    const keys =
      options?.overrideKeys ||
      (queryKey instanceof Function ? queryKey(options) : queryKey);
    return useAction([...keys, ...(uniqueKey || [])], apiFn, _options);
  };
  return useHookFn;
};

export type PostData<T, D extends object = object> = { formValues: T } & D;
export const post = <T, F, D extends object = object, R = ApiResponse<T>>(
  apiFn: MutationFn<PostData<F, D>, R>,
  queryKey: FindFnQueryKey<ActionOptions<R> | undefined>,
  defaultOptions?: ActionOptions<R>
) => {
  return createMutationFunction(apiFn, queryKey, defaultOptions);
};

export type UpdateData<T, I = string, D extends object = object> = {
  formValues: T;
  id: I;
} & D;
export const patch = <
  T,
  F,
  I = string,
  D extends object = object,
  R = ApiResponse<T>
>(
  apiFn: MutationFn<UpdateData<F, I, D>, R>,
  queryKey: FindFnQueryKey<ActionOptions<R> | undefined>,
  defaultOptions?: ActionOptions<R>
) => {
  return createMutationFunction(apiFn, queryKey, defaultOptions);
};

export type DeleteData<I = string, D extends object = object> = { id: I } & D;
export const remove = <
  T,
  I = string,
  D extends object = object,
  R = ApiResponse<T>
>(
  apiFn: MutationFn<DeleteData<I, D>, R>,
  queryKey: FindFnQueryKey<ActionOptions<R> | undefined>,
  defaultOptions?: ActionOptions<R>
) => {
  return createMutationFunction(apiFn, queryKey, defaultOptions);
};

export const getErrorMessage = (error: AxiosError<any>) => {
  if (error) {
    if (error?.response?.data) {
      const resDataError = error?.response?.data?.error;
      if (resDataError) {
        if (resDataError === Object(resDataError)) {
          return resDataError?.message;
        }
        return resDataError;
      }

      return error?.response?.data?.message;
    } else if (error.message) {
      return error.message;
    } else {
      return "Terjadi kesalahan";
    }
  }
  return "";
};

export const createSignal = (timeoutMs?: number) => {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
};

export const divideBasicData = <T extends object & BasicData>(data: T) => {
  const {
    id,
    createdAt,
    updatedAt,
    deletedAt,
    createdBy,
    updatedBy,
    deletedBy,
    ...rest
  } = data;

  return {
    basicData: {
      id,
      createdAt,
      updatedAt,
      deletedAt,
      createdBy,
      updatedBy,
      deletedBy,
    },
    divided: rest as Omit<T, keyof BasicData>,
  };
};
