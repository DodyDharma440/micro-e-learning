import React from "react";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { Loader } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { useGetCourse } from "@/modules/course/actions";
import { CourseUserProgress } from "@/modules/course/components";
import { CourseDetailProvider } from "@/modules/course/contexts";

type CourseLessonPageProps = {
  courseId: string;
};

const CourseLessonPage: NextPage<CourseLessonPageProps> = ({ courseId }) => {
  const { data, isLoading, isRefetching, error } = useGetCourse({
    id: courseId,
  });

  return (
    <>
      <Head>
        <title>Course Progress - E-Learning</title>
      </Head>

      <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
        <CourseDetailProvider course={data?.data.data}>
          <CourseUserProgress />
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

export default withAuth(CourseLessonPage, "trainer");
