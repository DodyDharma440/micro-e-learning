import React from "react";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { Content, Loader } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { useGetUserProgress } from "@/modules/course/actions";
import { UserCourseDetail } from "@/modules/course/components";
import { CourseDetailProvider } from "@/modules/course/contexts";

type UserProgressPageProps = {
  courseId: string;
  userId: string;
};

const UserProgressPage: NextPage<UserProgressPageProps> = ({
  courseId,
  userId,
}) => {
  const { data, isLoading, isRefetching, error } = useGetUserProgress({
    id: courseId,
    userId,
  });

  return (
    <>
      <Head>
        <title>Progress Detail - E-Learning</title>
      </Head>

      <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
        <CourseDetailProvider course={data?.data.data} isReadOnly>
          <Content title="Detail Progress" withBackButton>
            <UserCourseDetail />
          </Content>
        </CourseDetailProvider>
      </Loader>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      courseId: params?.id,
      userId: params?.user_id,
    },
  };
};

export default withAuth(UserProgressPage, "trainer");
