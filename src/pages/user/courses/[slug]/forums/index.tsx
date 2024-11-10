import React from "react";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { Loader } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { useGetCourseBySlug } from "@/modules/course/actions";
import { CourseForum } from "@/modules/course/components";
import { CourseDetailProvider } from "@/modules/course/contexts";

export type CourseForumPageProps = {
  slug: string;
};

const CourseForumPage: NextPage<CourseForumPageProps> = ({ slug }) => {
  const { data, isLoading, isRefetching, error } = useGetCourseBySlug({
    id: slug,
  });

  return (
    <>
      <Head>
        <title>Course Forum - E-Learning</title>
      </Head>

      <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
        <CourseDetailProvider course={data?.data.data}>
          <CourseForum slug={slug} />
        </CourseDetailProvider>
      </Loader>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      slug: params?.slug,
    },
  };
};

export default withAuth(CourseForumPage, "user");
