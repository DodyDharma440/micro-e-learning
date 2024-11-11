import React, { useEffect, useState } from "react";

import { useDisclosure } from "@mantine/hooks";
import { Avatar, Button, Divider } from "@nextui-org/react";
import dayjs from "dayjs";

import { Content, EmptyPlaceholder, Loader } from "@/common/components";

import { useGetForumDetail } from "../../actions";
import type { ICourseForumReply } from "../../interfaces";
import ForumItem from "../ForumItem";
import ReplyForm from "./ReplyForm";

type ForumDetailProps = {
  questionId: string;
};

const ForumDetail: React.FC<ForumDetailProps> = ({ questionId }) => {
  const { data, isLoading, isRefetching, error } = useGetForumDetail({
    id: questionId,
  });
  const [isOpen, { open, close }] = useDisclosure();

  const question = data?.data.data;
  const [replies, setReplies] = useState<ICourseForumReply[]>([]);

  useEffect(() => {
    setReplies(question?.CourseForumReply ?? []);
  }, [question?.CourseForumReply]);

  return (
    <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
      <Content
        title={question?.content}
        action={
          <Button color="primary" onClick={open}>
            Add Reply
          </Button>
        }
      >
        <div className="flex items-center gap-3">
          <Avatar size="sm" src={question?.user.avatar?.url} />
          <h6 className="text-neutral-500 dark:text-gray-400">
            {question?.user.name} <span className="mx-1">|</span>{" "}
            {dayjs(question?.createdAt).fromNow()}
          </h6>
        </div>

        <Divider className="my-4" />

        <div>
          <p className="font-bold mb-4">Replies ({replies.length ?? 0})</p>

          <div className="pl-6">
            {replies?.length ? (
              <>
                {replies.map((rep) => {
                  return (
                    <ForumItem
                      question={rep}
                      key={rep.id}
                      withReplies={false}
                    />
                  );
                })}
              </>
            ) : (
              <EmptyPlaceholder message="No replies yet" />
            )}
          </div>
        </div>

        <ReplyForm
          isOpen={isOpen}
          onClose={close}
          parentId={questionId}
          onSuccess={(data) => setReplies((prev) => [...prev, data])}
        />
      </Content>
    </Loader>
  );
};

export default ForumDetail;
