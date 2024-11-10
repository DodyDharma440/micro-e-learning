import React from "react";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { Loader } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { useGetCourse } from "@/modules/course/actions";
import { CourseForum } from "@/modules/course/components";
import { CourseDetailProvider } from "@/modules/course/contexts";

type CourseForumPageProps = {
  courseId: string;
};

const CourseForumPage: NextPage<CourseForumPageProps> = ({ courseId }) => {
  const { data, isLoading, isRefetching, error } = useGetCourse({
    id: courseId,
  });

  return (
    <>
      <Head>
        <title>Course Lesson - E-Learning</title>
      </Head>

      <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
        <CourseDetailProvider course={data?.data.data}>
          <CourseForum />
        </CourseDetailProvider>
      </Loader>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      courseId: params?.id,
    },
  };
};

export default withAuth(CourseForumPage, "superadmin");
