import React from "react";
import { HiPlus } from "react-icons/hi";

import Head from "next/head";
import { useRouter } from "next/router";

import { Button } from "@nextui-org/react";

import { Content } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { CourseList } from "@/modules/course/components";

const CoursesPage = () => {
  const { push } = useRouter();

  return (
    <>
      <Head>
        <title>Courses - E-Learning</title>
      </Head>

      <Content
        title="Courses"
        action={
          <Button
            onClick={() => push("/admin/courses/create")}
            startContent={<HiPlus />}
            color="primary"
          >
            Create Course
          </Button>
        }
      >
        <CourseList />
      </Content>
    </>
  );
};

export default withAuth(CoursesPage, "superadmin");
