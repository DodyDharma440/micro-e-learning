import React from "react";
import { HiPlus } from "react-icons/hi";

import Head from "next/head";
import Link from "next/link";

import { Button } from "@nextui-org/react";

import { Content } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { CourseList } from "@/modules/course/components";

const CoursesPage = () => {
  return (
    <>
      <Head>
        <title>Courses - E-Learning</title>
      </Head>

      <Content
        title="Courses"
        action={
          <Button
            as={Link}
            href="/trainer/courses/create"
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

export default withAuth(CoursesPage, "trainer");
