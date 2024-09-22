import React from "react";

import Head from "next/head";

import { AuthContainer } from "@/modules/auth/components";

const Home = () => {
  return (
    <>
      <Head>
        <title>Login - E-Learning</title>
      </Head>

      <AuthContainer />
    </>
  );
};

export default Home;
