import React from "react";

import Head from "next/head";

import { Content } from "@/common/components";
import { EditProfileForm } from "@/modules/user/components";

const EditProfilePage = () => {
  return (
    <>
      <Head>
        <title>EditProfile - E-Learning</title>
      </Head>

      <Content title="Edit Profile">
        <EditProfileForm />
      </Content>
    </>
  );
};

export default EditProfilePage;
