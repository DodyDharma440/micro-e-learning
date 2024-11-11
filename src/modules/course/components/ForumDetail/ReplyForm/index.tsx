import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";

import { useUserContext } from "@/common/contexts";
import { useSendQuestionReply } from "@/modules/course/actions";
import { useCourseDetail } from "@/modules/course/contexts";
import type {
  ICourseForumReply,
  ICourseForumReplyPayload,
} from "@/modules/course/interfaces";

type ReplyFormProps = {
  isOpen: boolean;
  onClose: () => void;
  parentId: string;
  onSuccess: (data: ICourseForumReply) => void;
};

const ReplyForm: React.FC<ReplyFormProps> = ({
  isOpen,
  onClose,
  parentId,
  onSuccess,
}) => {
  const { userData } = useUserContext();

  const { course } = useCourseDetail();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICourseForumReplyPayload>();
  const { mutate: sendReply, isPending } = useSendQuestionReply({
    onSuccess: ({ data }) => {
      onSuccess({ ...data.data, user: userData });
      onClose();
      reset({ content: "" });
    },
  });

  const submitHandler = (values: ICourseForumReplyPayload) => {
    sendReply({
      formValues: {
        courseId: course?.id ?? "",
        content: values.content,
        parentId,
      },
    });
  };

  useEffect(() => {
    if (isOpen) {
      reset({ content: "", courseId: "" });
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <ModalHeader>Reply</ModalHeader>
          <ModalBody>
            <Textarea
              label="Reply"
              placeholder="Write your reply..."
              errorMessage={errors.content?.message}
              isInvalid={Boolean(errors.content?.message)}
              {...register("content", {
                required: `Reply should not be empty`,
              })}
            />
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-end gap-4 mt-4">
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" isLoading={isPending} color="primary">
                Send
              </Button>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ReplyForm;
