import React, { useCallback, useEffect, useMemo } from "react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { HiSave } from "react-icons/hi";

import { useRouter } from "next/router";

import {
  Button,
  Card,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@nextui-org/react";

import { useUploadImage } from "@/common/actions/imagekit";
import { Content, ImageUploader } from "@/common/components";
import { useGetTrainers, useGetWorkPositions } from "@/modules/user/actions";

import { useCreateCourse, useUpdateCourse } from "../../actions";
import type { ICourse, ICourseForm } from "../../interfaces";
import Keypoints from "./Keypoints";

type CourseFormProps = {
  course?: ICourse;
};

const CourseForm: React.FC<CourseFormProps> = ({ course }) => {
  const { push } = useRouter();

  const formMethods = useForm<ICourseForm>({
    defaultValues: {
      keypointsUi: [{ description: "" }],
      enableForumUi: "yes",
      isTrailer: true,
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = formMethods;
  const isTrailer = useWatch({ control, name: "isTrailer" });
  const thumbFile = useWatch({ control, name: "thumbnailFile" });

  const { data: dataTrainers, isLoading: isLoadingTrainers } = useGetTrainers(
    {},
    { uniqueKey: ["course-form"] }
  );
  const trainerOptions = useMemo(() => {
    return (dataTrainers?.data.data || []).map((t) => ({
      label: t.name,
      value: t.id,
    }));
  }, [dataTrainers?.data.data]);

  const { data: dataPositions, isLoading: isLoadingPositions } =
    useGetWorkPositions();
  const positionOptions = useMemo(() => {
    return (dataPositions?.data.data || []).map((t) => ({
      label: t.name,
      value: t.id,
    }));
  }, [dataPositions?.data.data]);

  const { mutate: createCourse, isPending: isLoadingCreate } = useCreateCourse({
    onSuccess: () => {
      push("/admin/courses");
    },
  });
  const { mutate: updateCourse, isPending: isLoadingUpdate } = useUpdateCourse({
    onSuccess: () => {
      push("/admin/courses");
    },
  });

  const { mutateAsync: uploadImage, isPending: isLoadingUpload } =
    useUploadImage();

  const submitHandler = useCallback(
    (values: ICourseForm) => {
      const {
        thumbnailFile,
        keypointsUi,
        enableForumUi,
        isTrailer,
        ...formValues
      } = values;

      formValues.keypoints = keypointsUi.map((k) => k.description);
      formValues.hideTrailer = !isTrailer;
      formValues.enableForum = enableForumUi === "yes";

      const makeUploadFd = () => {
        const uploadFd = new FormData();
        if (thumbnailFile) uploadFd.append("file", thumbnailFile);
        uploadFd.append("fileName", `${values.name} Thumb`);
        return uploadFd;
      };

      if (course) {
        if (thumbFile) {
          const uploadFd = makeUploadFd();
          uploadImage(
            { formValues: uploadFd },
            {
              onSuccess: (res) => {
                formValues.thumbnailUrl = res.data.url;

                updateCourse({ formValues, id: course.id });
              },
            }
          );
        } else {
          updateCourse({ formValues, id: course.id });
        }
      } else {
        const uploadFd = makeUploadFd();

        uploadImage(
          { formValues: uploadFd },
          {
            onSuccess: (res) => {
              formValues.thumbnailUrl = res.data.url;
              createCourse({ formValues });
            },
          }
        );
      }
    },
    [course, createCourse, thumbFile, updateCourse, uploadImage]
  );

  useEffect(() => {
    if (course) {
      const {
        name,
        categoryId,
        trainerId,
        trailerUrl,
        hideTrailer,
        enableForum,
        description,
        keypoints,
      } = course;
      reset({
        name,
        categoryId,
        trainerId,
        isTrailer: !hideTrailer,
        trailerUrl,
        enableForumUi: enableForum ? "yes" : "no",
        description,
        keypointsUi: keypoints.map((k) => ({ description: k })),
      });
    }
  }, [course, reset]);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Content
          title={`${course ? "Edit" : "Create"} Course`}
          withBackButton
          backHref="/admin/courses"
          action={
            <div className="flex items-center">
              <Button
                type="submit"
                color="primary"
                startContent={<HiSave />}
                isLoading={
                  isLoadingCreate || isLoadingUpload || isLoadingUpdate
                }
              >
                Save
              </Button>
            </div>
          }
        >
          <Card className="p-4 bg-opacity-20 backdrop-blur-md">
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-4">
                <div className="mb-6">
                  <p className="text-lg font-bold mb-2">Thumbnail</p>
                  <Controller
                    control={control}
                    name="thumbnailFile"
                    rules={{
                      required: course?.thumbnailUrl
                        ? false
                        : "Thumbnail must be uploaded",
                      validate: (val) => {
                        if (val) {
                          const sizeMB = val.size / 1024 / 1024;
                          if (sizeMB > 1) {
                            return "Max file size is 1MB";
                          }
                        }
                      },
                    }}
                    render={({ field }) => {
                      return (
                        <>
                          <ImageUploader
                            description="course thumbnail"
                            {...field}
                            imageUrl={course?.thumbnailUrl}
                            errorMessage={errors.thumbnailFile?.message}
                          />
                        </>
                      );
                    }}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <p className="text-lg font-bold flex-1">Trailer</p>
                    <Controller
                      control={control}
                      name="isTrailer"
                      render={({ field }) => {
                        return (
                          <Switch
                            size="sm"
                            {...field}
                            value=""
                            isSelected={field.value}
                          />
                        );
                      }}
                    />
                  </div>
                  {isTrailer ? (
                    <Input
                      label="Youtube URL"
                      isInvalid={Boolean(errors.trailerUrl?.message)}
                      errorMessage={errors.trailerUrl?.message}
                      {...register("trailerUrl", {
                        required: "Trailer URL should not be empty",
                      })}
                    />
                  ) : null}
                </div>
              </div>

              <div className="col-span-8">
                <div className="mb-6">
                  <p className="text-lg font-bold mb-2">Course Information</p>
                  <div className="grid grid-cols-12 w-full gap-5">
                    <div className="col-span-6">
                      <Input
                        label="Course Name"
                        isInvalid={Boolean(errors.name?.message)}
                        errorMessage={errors.name?.message}
                        {...register("name", {
                          required: "Name should not be empty",
                        })}
                      />
                    </div>
                    <div className="col-span-6">
                      <Controller
                        control={control}
                        name="categoryId"
                        rules={{
                          required: "Target user must be selected",
                        }}
                        render={({ field }) => {
                          return (
                            <Select
                              label="Target User"
                              isInvalid={Boolean(errors.categoryId?.message)}
                              errorMessage={errors.categoryId?.message}
                              isDisabled={isLoadingPositions}
                              selectedKeys={[field.value]}
                              {...field}
                            >
                              {positionOptions.map((pos) => (
                                <SelectItem key={pos.value}>
                                  {pos.label}
                                </SelectItem>
                              ))}
                            </Select>
                          );
                        }}
                      />
                    </div>

                    <div className="col-span-6">
                      <Controller
                        control={control}
                        name="trainerId"
                        rules={{
                          required: "Trainer must be selected",
                        }}
                        render={({ field }) => {
                          return (
                            <Select
                              label="Trainer"
                              isInvalid={Boolean(errors.trainerId?.message)}
                              errorMessage={errors.trainerId?.message}
                              {...field}
                              selectedKeys={[field.value]}
                              isDisabled={isLoadingTrainers}
                            >
                              {trainerOptions.map((trainer) => (
                                <SelectItem key={trainer.value}>
                                  {trainer.label}
                                </SelectItem>
                              ))}
                            </Select>
                          );
                        }}
                      />
                    </div>

                    <div className="col-span-6">
                      <Controller
                        control={control}
                        name="enableForumUi"
                        render={({ field }) => {
                          return (
                            <RadioGroup
                              orientation="horizontal"
                              label="Forum Discussion"
                              {...field}
                            >
                              <Radio value="yes">Enable</Radio>
                              <Radio value="no">Disable</Radio>
                            </RadioGroup>
                          );
                        }}
                      />
                    </div>

                    <div className="col-span-12">
                      <Textarea
                        label="Description"
                        isInvalid={Boolean(errors.description?.message)}
                        errorMessage={errors.description?.message}
                        {...register("description", {
                          required: "Description should not be empty",
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-lg font-bold mb-2">Keypoints</p>
                  <Keypoints />
                </div>
              </div>
            </div>
          </Card>
        </Content>
      </form>
    </FormProvider>
  );
};

export default CourseForm;
