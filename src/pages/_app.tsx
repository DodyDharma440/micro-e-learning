import { useMemo } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";

import { CssBaseline, GeistProvider } from "@geist-ui/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { inter } from "@/common/configs/fonts";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    });
  }, []);

  return (
    <>
      <Head>
        <title>E-Learning</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <GeistProvider>
          <CssBaseline />
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </GeistProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
