import { useMemo } from "react";

import type { AppProps } from "next/app";
import Head from "next/head";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@/styles/globals.css";
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
        <NextUIProvider>
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </NextUIProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
