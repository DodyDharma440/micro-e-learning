import { useMemo } from "react";
import { Bounce, ToastContainer } from "react-toastify";

import type { AppProps } from "next/app";
import Head from "next/head";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import "@/styles/globals.css";
import { inter } from "@/common/configs/fonts";
import { UserProvider } from "@/common/contexts";
import { PageLayout } from "@/common/layouts";

import "react-toastify/dist/ReactToastify.css";

dayjs.extend(relativeTime);

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
          <NextThemesProvider attribute="class" defaultTheme="light">
            <UserProvider>
              <main className={inter.className}>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable={false}
                  pauseOnHover
                  theme="colored"
                  transition={Bounce}
                />

                <PageLayout>
                  <Component {...pageProps} />
                  <ProgressBar
                    height="3px"
                    color="#016fee"
                    options={{ showSpinner: false }}
                    shallowRouting
                  />
                </PageLayout>
              </main>
            </UserProvider>
          </NextThemesProvider>
        </NextUIProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
