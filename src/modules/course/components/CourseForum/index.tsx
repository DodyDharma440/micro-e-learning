import React, { useEffect, useState } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";

import { useDisclosure } from "@mantine/hooks";
import { Avatar, Button, Divider } from "@nextui-org/react";
import dayjs from "dayjs";

import { Content, EmptyPlaceholder, Loader } from "@/common/components";

import { useGetCourseForum } from "../../actions";
import { useCourseDetail } from "../../contexts";
import type { ICourseForum } from "../../interfaces";
import QuestionForm from "./QuestionForm";

type CourseForumProps = {
  slug: string;
};

const CourseForum: React.FC<CourseForumProps> = ({ slug }) => {
  const { course } = useCourseDetail();
  const { data, isLoading, isRefetching, error } = useGetCourseForum({
    id: slug,
  });
  const [isOpen, { open, close }] = useDisclosure();
  const [forum, setForum] = useState<ICourseForum[]>([]);

  useEffect(() => {
    setForum(data?.data.data || []);
  }, [data?.data.data]);

  return (
    <Content
      withBackButton
      title={`Forum Discussion - ${course?.name}`}
      action={
        <Button color="primary" onClick={open}>
          Ask Question
        </Button>
      }
    >
      <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
        {forum.length ? (
          <>
            {forum.map((question) => {
              return (
                <React.Fragment key={question.id}>
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <Avatar
                          size="sm"
                          name={question.user.name}
                          src={question.user.avatar?.url}
                        />
                        <div>
                          <p className="font-bold">{question.user.name}</p>
                          <p className="text-xs text-neutral-500 dark:text-gray-400">
                            {dayjs(question.createdAt).fromNow()} &bull;{" "}
                            {question._count?.CourseForumReply ?? 0} replies
                          </p>
                        </div>
                      </div>

                      <p className="text-sm">{question.content}</p>
                    </div>
                    <Button
                      variant="light"
                      color="secondary"
                      endContent={<HiOutlineChevronRight />}
                    >
                      View Replies
                    </Button>
                  </div>
                  <Divider className="my-4" />
                </React.Fragment>
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
