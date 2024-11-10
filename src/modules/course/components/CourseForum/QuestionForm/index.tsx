import React, { useEffect, useMemo } from "react";
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
import { useSendQuestion } from "@/modules/course/actions";
import { useCourseDetail } from "@/modules/course/contexts";
import type {
  ICourseForum,
  ICourseForumPayload,
} from "@/modules/course/interfaces";

type QuestionFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: ICourseForum) => void;
};

const QuestionForm: React.FC<QuestionFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { userData } = useUserContext();
  const isAdmin = useMemo(() => {
    return ["superadmin", "trainer"].includes(userData?.role ?? "");
  }, [userData?.role]);

  const { course } = useCourseDetail();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICourseForumPayload>();
  const { mutate: sendQuestion, isPending } = useSendQuestion({
    onSuccess: ({ data }) => {
      onSuccess({ ...data.data, user: userData });
      onClose();
    },
  });

  const submitHandler = (values: ICourseForumPayload) => {
    sendQuestion({
      formValues: {
        courseId: course?.id ?? "",
        content: values.content,
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
          <ModalHeader>
            Ask Question {isAdmin ? `/ Send Announcement` : ""}
          </ModalHeader>
          <ModalBody>
            <Textarea
              label={isAdmin ? "Question/Announcement" : "Question"}
              errorMessage={errors.content?.message}
              isInvalid={Boolean(errors.content?.message)}
              {...register("content", {
                required: `${
                  isAdmin ? "Question/Announcement" : "Question"
                } should not be empty`,
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

export default QuestionForm;
