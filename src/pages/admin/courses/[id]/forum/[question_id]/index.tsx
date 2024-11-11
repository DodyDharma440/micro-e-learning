import React from "react";

import type { GetServerSideProps } from "next";
import Head from "next/head";

import { Loader } from "@/common/components";
import { useGetCourse } from "@/modules/course/actions";
import { ForumDetail } from "@/modules/course/components";
import { CourseDetailProvider } from "@/modules/course/contexts";

type ForumDetailPageProps = {
  courseId: string;
  questionId: string;
};

const ForumDetailPage: React.FC<ForumDetailPageProps> = ({
  courseId,
  questionId,
}) => {
  const { data, isLoading, isRefetching, error } = useGetCourse({
    id: courseId,
  });

  return (
    <>
      <Head>
        <title>Forum Detail - E-Learning</title>
      </Head>

      <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
        <CourseDetailProvider course={data?.data.data}>
          <ForumDetail questionId={questionId} />
        </CourseDetailProvider>
      </Loader>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      courseId: params?.id,
      questionId: params?.question_id,
    },
  };
};

export default ForumDetailPage;
