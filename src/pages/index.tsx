import React from "react";

import type { GetServerSideProps } from "next";
import Head from "next/head";

import { decodeJwt } from "jose";

import { AuthContainer } from "@/modules/auth/components";
import type { UserRole } from "@/modules/auth/interfaces";
import { redirectDest } from "@/modules/user/constants";

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
  const token = req.cookies[process.env["COOKIE_NAME"]!];
  if (token) {
    const decodedToken = decodeJwt<{ id: string; role: UserRole }>(token ?? "");
    const { role } = decodedToken;

    return {
      redirect: {
        destination: redirectDest[role],
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
