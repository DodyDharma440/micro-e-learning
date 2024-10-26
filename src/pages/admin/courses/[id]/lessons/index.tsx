import React from "react";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { Loader } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { useGetCourse } from "@/modules/course/actions";
import { CourseLessonForm } from "@/modules/course/components";

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
        <title>Course Lesson - E-Learning</title>
      </Head>

      <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
        <CourseLessonForm course={data?.data.data} />
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

export default withAuth(CourseLessonPage, "superadmin");
