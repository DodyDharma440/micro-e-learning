import React from "react";

import Head from "next/head";

import { Content } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { UserCourses } from "@/modules/course/components";

const UserCoursesPage = () => {
  return (
    <>
      <Head>
        <title>Courses - E-Learning</title>
      </Head>

      <Content title="My Courses">
        <UserCourses />
      </Content>
    </>
  );
};

export default withAuth(UserCoursesPage, "user");
