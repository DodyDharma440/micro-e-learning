import React from "react";

import type { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = req.cookies[process.env.COOKIE_NAME!];

  if (token) {
    return {
      redirect: {
        destination: "/admin/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
