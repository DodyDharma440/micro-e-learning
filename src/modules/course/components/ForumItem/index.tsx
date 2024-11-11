import React, { useMemo } from "react";
import { HiOutlineChevronRight } from "react-icons/hi";

import { Avatar, Button, Chip, Divider } from "@nextui-org/react";
import dayjs from "dayjs";

import { useUserContext } from "@/common/contexts";

import { useCourseDetail } from "../../contexts";
import type { ICourseForum } from "../../interfaces";

type ForumItemProps = {
  question: ICourseForum;
  onViewReplies?: () => void;
  withReplies?: boolean;
};

const ForumItem: React.FC<ForumItemProps> = ({
  question,
  onViewReplies,
  withReplies = true,
}) => {
  const { userData } = useUserContext();

  const isAdmin = useMemo(() => {
    return question.user.role === "superadmin";
  }, [question.user.role]);

  const { course } = useCourseDetail();
  const isTrainer = useMemo(() => {
    return (
      question.user.role === "trainer" && course?.trainerId === question.user.id
    );
  }, [course?.trainerId, question.user.id, question.user.role]);

  const isYou = useMemo(() => {
    return userData?.id === question.user.id;
  }, [question.user.id, userData?.id]);

  return (
    <React.Fragment>
      <div className="flex items-center">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <Avatar
              size="sm"
              name={question.user.name}
              src={question.user.avatar?.url}
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold">{question.user.name}</p>
                {isAdmin ? (
                  <Chip size="sm" color="primary">
                    Admin
                  </Chip>
                ) : null}
                {isTrainer ? (
                  <Chip size="sm" color="secondary">
                    Trainer
                  </Chip>
                ) : null}
                {isYou ? <Chip size="sm">You</Chip> : null}
              </div>
              <p className="text-xs text-neutral-500 dark:text-gray-400">
                {dayjs(question.createdAt).fromNow()}{" "}
                {withReplies ? (
                  <>&bull; {question._count?.CourseForumReply ?? 0} replies</>
                ) : null}
              </p>
            </div>
          </div>

          <p className="text-sm">{question.content}</p>
        </div>

        {onViewReplies ? (
          <Button
            variant="light"
            color="secondary"
            endContent={<HiOutlineChevronRight />}
            onClick={onViewReplies}
          >
            View Replies
          </Button>
        ) : null}
      </div>
      <Divider className="my-4" />
    </React.Fragment>
  );
};

export default ForumItem;
