import React from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { useDisclosure } from "@mantine/hooks";
import { Button } from "@nextui-org/react";

import { Content, Loader } from "@/common/components";
import { withAuth } from "@/common/hocs";
import { useGetCourseBySlug } from "@/modules/course/actions";
import {
  ModalCourseDetail,
  UserCourseDetail,
} from "@/modules/course/components";
import { CourseDetailProvider } from "@/modules/course/contexts";

type UserCourseDetailPageProps = {
  courseSlug: string;
};

const UserCourseDetailPage: NextPage<UserCourseDetailPageProps> = ({
  courseSlug,
}) => {
  const { data, isLoading, isRefetching, error } = useGetCourseBySlug({
    id: courseSlug,
  });
  const [isOpen, { open, close }] = useDisclosure();

  return (
    <>
      <Head>
        <title>Courses - E-Learning</title>
      </Head>

      <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
        <CourseDetailProvider course={data?.data.data}>
          <Content
            withBackButton
            title={data?.data.data.name}
            classNames={{
              container: "flex-col !items-start md:flex-row !md:items-center",
            }}
            action={
              <div className="flex items-center gap-2 justify-end w-full md:w-fit mt-2 md:mt-0">
                <Button
                  color="primary"
                  startContent={<HiOutlineInformationCircle />}
                  onClick={open}
                >
                  Detail
                </Button>
                {data?.data.data?.enableForum ? (
                  <Button
                    as={Link}
                    href={`/user/courses/${data.data.data.slug}/forums`}
                    color="secondary"
                    startContent={<HiOutlineChatBubbleLeftEllipsis />}
                  >
                    Open Discussion
                  </Button>
                ) : null}
              </div>
            }
          >
            <UserCourseDetail />
          </Content>

          <ModalCourseDetail isOpen={isOpen} onClose={close} />
        </CourseDetailProvider>
      </Loader>
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

export default withAuth(UserCourseDetailPage, "user");
