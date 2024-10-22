import React, { useCallback } from "react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { HiSave } from "react-icons/hi";

import {
  Button,
  Card,
  Input,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Textarea,
} from "@nextui-org/react";

import { Content, ImageUploader } from "@/common/components";

import type { ICourseForm } from "../../interfaces";
import Keypoints from "./Keypoints";

const CourseForm = () => {
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
  } = formMethods;
  const isTrailer = useWatch({ control, name: "isTrailer" });

  const submitHandler = useCallback((values: ICourseForm) => {}, []);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Content
          title="Create Course"
          withBackButton
          backHref="/admin/courses"
          action={
            <div className="flex items-center">
              <Button type="submit" color="primary" startContent={<HiSave />}>
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
                  <ImageUploader description="course thumbnail" />
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
                              {...field}
                            >
                              {[]}
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
                            >
                              {[]}
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
