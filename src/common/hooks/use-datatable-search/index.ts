import type React from "react";
import { useCallback, useMemo, useState } from "react";

import { useDebouncedValue } from "@mantine/hooks";

export type UseDataTableSearch = {
  defaultValue?: string;
  delay?: number;
  paramType?: "single" | "multiple";
};

export const useDataTableSearch = (props?: UseDataTableSearch) => {
  const paramType = useMemo(() => {
    return props?.paramType || "single";
  }, [props?.paramType]);

  const [searchValue, setSearchValue] = useState(props?.defaultValue || "");
  const [debouncedSearch] = useDebouncedValue(searchValue, props?.delay || 300);

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  const searchParams = useMemo(() => {
    const params = new URLSearchParams();
    params.append("search", debouncedSearch);

    return params.toString();
    // eslint-disable-next-line
  }, [debouncedSearch, paramType]);

  const searchProps = {
    value: searchValue,
    onChange: onChangeSearch,
  };

  const searchLifecycle = {
    search: debouncedSearch,
  };

  return {
    searchValue,
    debouncedSearch,
    onChangeSearch,
    searchParams,
    searchProps,
    searchLifecycle,
  };
};
