import React from "react";

import Head from "next/head";

import { Content } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { CourseForum } from "@/modules/course/components";

const CourseForumPage = () => {
  return (
    <>
      <Head>
        <title>Course Forum - E-Learning</title>
      </Head>

      <Content title="Forum Discussions">
        <CourseForum />
      </Content>
    </>
  );
};

export default withAuth(CourseForumPage, "user");
