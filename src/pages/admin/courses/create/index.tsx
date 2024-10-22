import React from "react";

import Head from "next/head";

import { withAuth } from "@/common/hocs";
import { CourseForm } from "@/modules/course/components";

const CreateCoursePage = () => {
  return (
    <>
      <Head>
        <title>Create Course - E-Learning</title>
      </Head>

      <CourseForm />
    </>
  );
};

export default withAuth(CreateCoursePage, "superadmin");
