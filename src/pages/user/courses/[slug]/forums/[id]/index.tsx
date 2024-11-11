import React from "react";

import type { GetServerSideProps } from "next";
import Head from "next/head";

import { Loader } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { useGetCourseBySlug } from "@/modules/course/actions";
import { ForumDetail } from "@/modules/course/components";
import { CourseDetailProvider } from "@/modules/course/contexts";

type ForumDetailPageProps = {
  slug: string;
  questionId: string;
};

const ForumDetailPage: React.FC<ForumDetailPageProps> = ({
  slug,
  questionId,
}) => {
  const { data, isLoading, isRefetching, error } = useGetCourseBySlug({
    id: slug,
  });

  return (
    <>
      <Head>
        <title>Question Detail - E-Learning</title>
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
      slug: params?.slug,
      questionId: params?.id,
    },
  };
};

export default withAuth(ForumDetailPage, "user");
