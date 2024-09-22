import { inter } from "@/common/configs/fonts";
import { CssBaseline, GeistProvider } from "@geist-ui/core";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>E-Learning</title>
      </Head>

      <GeistProvider>
        <CssBaseline />
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </GeistProvider>
    </>
  );
}
