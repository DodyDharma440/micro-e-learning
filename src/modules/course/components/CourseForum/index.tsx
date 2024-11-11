import React, { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";

import { useDisclosure } from "@mantine/hooks";
import { Button } from "@nextui-org/react";

import { Content, EmptyPlaceholder, Loader } from "@/common/components";
import { useUserContext } from "@/common/contexts";

import { useGetCourseForum } from "../../actions";
import { useCourseDetail } from "../../contexts";
import type { ICourseForum } from "../../interfaces";
import ForumItem from "../ForumItem";
import QuestionForm from "./QuestionForm";

const CourseForum = () => {
  const { push } = useRouter();

  const { userData } = useUserContext();
  const isAdmin = useMemo(() => {
    return ["superadmin", "trainer"].includes(userData?.role ?? "");
  }, [userData?.role]);

  const { course } = useCourseDetail();
  const { data, isLoading, isRefetching, error } = useGetCourseForum(
    { id: course?.slug ?? "" },
    { enabled: Boolean(course?.slug) }
  );
  const [isOpen, { open, close }] = useDisclosure();
  const [forum, setForum] = useState<ICourseForum[]>([]);

  const makeReplyUrl = (id: string) => {
    if (userData?.role) {
      switch (userData.role) {
        case "superadmin":
          return `/admin/courses/${course?.id}/forum/${id}`;
        case "trainer":
          return `/trainer/courses/${course?.id}/forum/${id}`;
        case "user":
          return `/user/courses/${course?.slug}/forums/${id}`;
      }
    }
    return "";
  };

  useEffect(() => {
    setForum(data?.data.data || []);
  }, [data?.data.data]);

  return (
    <Content
      withBackButton
      title={`Forum Discussion - ${course?.name}`}
      action={
        <Button color="primary" onClick={open}>
          Ask Question {isAdmin ? `/ Send Announcement` : ""}
        </Button>
      }
    >
      <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
        {forum.length ? (
          <>
            {forum.map((question) => {
              return (
                <ForumItem
                  key={question.id}
                  question={question}
                  onViewReplies={() => push(makeReplyUrl(question.id))}
                />
              );
            })}
          </>
        ) : (
          <EmptyPlaceholder message="No discussion yet" />
        )}
      </Loader>

      <QuestionForm
        isOpen={isOpen}
        onClose={close}
        onSuccess={(data) => setForum((prev) => [data, ...prev])}
      />
    </Content>
  );
};

export default CourseForum;
