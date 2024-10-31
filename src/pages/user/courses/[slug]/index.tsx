import React from "react";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { Content, Loader } from "@/common/components";
import { useGetCourseBySlug } from "@/modules/course/actions";
import { UserCourseDetail } from "@/modules/course/components";

type UserCourseDetailPageProps = {
  courseSlug: string;
};

const UserCourseDetailPage: NextPage<UserCourseDetailPageProps> = ({
  courseSlug,
}) => {
  const { data, isLoading, isRefetching, error } = useGetCourseBySlug({
    id: courseSlug,
  });

  return (
    <>
      <Head>
        <title>Courses - E-Learning</title>
      </Head>

      <Content title="My Courses">
        <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
          <UserCourseDetail course={data?.data.data} />
        </Loader>
      </Content>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      courseSlug: params?.slug,
    },
  };
};

export default UserCourseDetailPage;
