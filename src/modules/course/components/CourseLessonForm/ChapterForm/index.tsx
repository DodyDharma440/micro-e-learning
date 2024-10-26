import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/router";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import { useCreateChapter, useUpdateChapter } from "@/modules/course/actions";
import type {
  ICourseChapter,
  ICourseChapterPayload,
} from "@/modules/course/interfaces";

type ChapterFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: ICourseChapter, action: "update" | "create") => void;
  chapter: ICourseChapter | null;
};

const ChapterForm: React.FC<ChapterFormProps> = ({
  isOpen,
  onClose,
  chapter,
  onSuccess,
}) => {
  const { query } = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<ICourseChapterPayload>({
    defaultValues: {
      order: 0,
    },
  });

  const { mutate: createChapter, isPending: isLoadingCreate } =
    useCreateChapter();
  const { mutate: updateChapter, isPending: isLoadingUpdate } =
    useUpdateChapter();

  const submitHandler = (values: ICourseChapterPayload) => {
    if (chapter) {
      updateChapter(
        {
          formValues: values,
          id: chapter.id,
          courseId: query.id as string,
        },
        {
          onSuccess: ({ data }) => {
            onSuccess(data.data, "update");
            onClose();
          },
        }
      );
    } else {
      createChapter(
        { formValues: values, id: query.id as string },
        {
          onSuccess: ({ data }) => {
            onSuccess(data.data, "create");
            onClose();
          },
        }
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (chapter) {
        reset({ name: chapter.name });
      } else {
        reset();
      }
    }
  }, [chapter, isOpen, reset, setValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <ModalHeader>{chapter ? "Edit" : "Add"} Chapter</ModalHeader>
          <ModalBody>
            <Controller
              control={control}
              name="name"
              render={({ field }) => {
                return (
                  <Input
                    label="Chapter Name"
                    isInvalid={Boolean(errors.name?.message)}
                    errorMessage={errors.name?.message}
                    {...field}
                    onValueChange={field.onChange}
                  />
                );
              }}
            />
          </ModalBody>
          <ModalFooter>
            <div className="flex items-center justify-end gap-2">
              <Button color="danger" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                isLoading={isLoadingCreate || isLoadingUpdate}
              >
                Save
              </Button>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ChapterForm;
