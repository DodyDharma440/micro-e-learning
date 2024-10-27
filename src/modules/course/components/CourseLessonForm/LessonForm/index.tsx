import React, { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";

import type { RadioProps } from "@nextui-org/react";
import {
  Button,
  cn,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
} from "@nextui-org/react";

import { useUploadImage } from "@/common/actions/imagekit";
import { DocumentUploader } from "@/common/components";
import { useCreateLesson, useUpdateLesson } from "@/modules/course/actions";
import type {
  ICourseChapter,
  ICourseLesson,
  ICourseLessonForm,
} from "@/modules/course/interfaces";

type LessonFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: ICourseLesson, action: "update" | "create") => void;
  chapter: ICourseChapter;
  lesson: ICourseLesson | null;
};

export const CustomRadio = (props: RadioProps) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "w-full flex-row-reverse max-w-full cursor-pointer rounded-lg gap-4 p-4 border-2 border-gray-400 dark:border-gray-700",
          "data-[selected=true]:border-primary dark:data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

const LessonForm: React.FC<LessonFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
  chapter,
  lesson,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<ICourseLessonForm>({
    defaultValues: {
      order: 0,
      lessonType: "VIDEO",
    },
  });
  const lessonType = useWatch({ control, name: "lessonType" });

  const { mutate: createLesson, isPending: isLoadingCreate } =
    useCreateLesson();
  const { mutate: updateLesson, isPending: isLoadingUpdate } =
    useUpdateLesson();

  const { mutateAsync: uploadDocs, isPending: isLoadingUpload } =
    useUploadImage();

  const submitHandler = (values: ICourseLessonForm) => {
    const { documentFile, youtubeUrl, ...formValues } = values;
    formValues.chapterId = chapter.id;

    const makeUploadFd = () => {
      const uploadFd = new FormData();
      if (documentFile) uploadFd.append("file", documentFile);
      uploadFd.append("fileName", `lesson-${values.name}-${chapter.id}`);
      return uploadFd;
    };

    if (lesson) {
      if (values.lessonType === "DOCUMENT") {
        if (documentFile) {
          const uploadFd = makeUploadFd();
          uploadDocs(
            { formValues: uploadFd },
            {
              onSuccess: (res) => {
                formValues.contentUrl = res.data.url;
                updateLesson(
                  {
                    formValues,
                    id: lesson.id,
                    chapterId: chapter.id,
                  },
                  {
                    onSuccess: ({ data }) => {
                      onSuccess(data.data, "update");
                      onClose();
                    },
                  }
                );
              },
            }
          );
        } else {
          updateLesson(
            { formValues, id: lesson.id, chapterId: chapter.id },
            {
              onSuccess: ({ data }) => {
                onSuccess(data.data, "update");
                onClose();
              },
            }
          );
        }
      }

      if (values.lessonType === "VIDEO") {
        formValues.contentUrl = youtubeUrl ?? "";
        updateLesson(
          { formValues, id: lesson.id, chapterId: chapter.id },
          {
            onSuccess: ({ data }) => {
              onSuccess(data.data, "update");
              onClose();
            },
          }
        );
      }
    } else {
      if (values.lessonType === "DOCUMENT") {
        const uploadFd = makeUploadFd();

        uploadDocs(
          { formValues: uploadFd },
          {
            onSuccess: (res) => {
              formValues.contentUrl = res.data.url;
              createLesson(
                { formValues, id: chapter.id },
                {
                  onSuccess: ({ data }) => {
                    onSuccess(data.data, "create");
                    onClose();
                  },
                }
              );
            },
          }
        );
      }

      if (values.lessonType === "VIDEO") {
        formValues.contentUrl = youtubeUrl ?? "";
        createLesson(
          { formValues, id: chapter.id },
          {
            onSuccess: ({ data }) => {
              onSuccess(data.data, "create");
              onClose();
            },
          }
        );
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (lesson) {
        const { name, order, contentUrl, lessonType } = lesson;
        setValue("name", name);
        setValue("order", order);
        setValue("contentUrl", contentUrl);
        setValue("lessonType", lessonType);
      } else {
        reset({
          name: "",
          order: 0,
          lessonType: "VIDEO",
          youtubeUrl: "",
        });
      }
    }
  }, [isOpen, lesson, reset, setValue]);

  useEffect(() => {
    setValue("contentUrl", "");
  }, [lessonType, setValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <ModalHeader>
            {lesson ? "Edit" : "Add"} Lesson in {chapter.name}
          </ModalHeader>

          <ModalBody>
            <Controller
              control={control}
              name="lessonType"
              render={({ field }) => {
                return (
                  <RadioGroup
                    orientation="horizontal"
                    classNames={{
                      wrapper: "flex-nowrap",
                    }}
                    label="Select Lesson Type"
                    {...field}
                  >
                    <CustomRadio value="VIDEO">Video</CustomRadio>
                    <CustomRadio value="DOCUMENT">Document</CustomRadio>
                  </RadioGroup>
                );
              }}
            />
            <Divider className="my-2" />
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Lesson name should not be empty",
              }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    label="Lesson Name"
                    isInvalid={Boolean(errors.name?.message)}
                    errorMessage={errors.name?.message}
                    onValueChange={field.onChange}
                  />
                );
              }}
            />

            {lessonType === "VIDEO" ? (
              <Controller
                control={control}
                name="youtubeUrl"
                rules={{
                  required: "Youtube URL should not be empty",
                }}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      label="Youtube URL"
                      isInvalid={Boolean(errors.youtubeUrl?.message)}
                      errorMessage={errors.youtubeUrl?.message}
                      onValueChange={field.onChange}
                    />
                  );
                }}
              />
            ) : null}

            {lessonType === "DOCUMENT" ? (
              <Controller
                control={control}
                name="documentFile"
                rules={{
                  required: lesson?.contentUrl
                    ? false
                    : "Document must be uploaded",
                  validate: (val) => {
                    if (val) {
                      const sizeMB = val.size / 1024 / 1024;
                      if (sizeMB > 5) {
                        return "Max file size is 5MB";
                      }
                    }
                  },
                }}
                render={({ field }) => {
                  return (
                    <>
                      <DocumentUploader
                        description="lesson document"
                        {...field}
                        onClear={() => setValue("documentFile", null)}
                        errorMessage={errors.documentFile?.message}
                      />
                    </>
                  );
                }}
              />
            ) : null}
          </ModalBody>

          <ModalFooter>
            <div className="flex items-center justify-end gap-2">
              <Button color="danger" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                isLoading={
                  isLoadingCreate || isLoadingUpdate || isLoadingUpload
                }
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

export default LessonForm;
