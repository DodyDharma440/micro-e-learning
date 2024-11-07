import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiPencil } from "react-icons/hi2";

import Image from "next/image";

import { Button, Card, Input } from "@nextui-org/react";

import { useUserContext } from "@/common/contexts";

import { useUpdateProfile } from "../../actions";
import type { IEditProfilePayload } from "../../interfaces";
import PasswordForm from "./PasswordForm";

const EditProfileForm = () => {
  const {
    userData,
    userQuery: { refetch },
  } = useUserContext();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IEditProfilePayload>();

  const { mutate: updateProfile, isPending: isLoadingUpdate } =
    useUpdateProfile({
      onSuccess: () => {
        refetch();
      },
    });

  const submitHandler = (values: IEditProfilePayload) => {
    updateProfile({ formValues: values });
  };

  useEffect(() => {
    reset({
      username: userData?.username,
      name: userData?.name,
    });
  }, [reset, userData?.name, userData?.username]);

  return (
    <div className="mx-auto max-w-[500px]">
      <Card isBlurred className="p-4">
        <div>
          <h2 className="font-bold mb-4">Profile Picture</h2>
          <div className="flex items-center justify-center">
            <div className="w-[150px] h-[150px] bg-gray-200/60 dark:bg-neutral-800 rounded-full relative">
              {userData?.avatarUrl ? (
                <Image
                  src={userData.avatarUrl}
                  alt="avatar"
                  fill
                  className="object-cover"
                />
              ) : null}
              <Button
                isIconOnly
                color="secondary"
                className="absolute bottom-0 right-0"
              >
                <HiPencil />
              </Button>
            </div>
          </div>
        </div>
        <hr className="border-gray-200 dark:border-neutral-800 my-4" />
        <form onSubmit={handleSubmit(submitHandler)}>
          <div>
            <h2 className="font-bold mb-4">Account Information</h2>
            <div className="flex flex-col gap-2">
              <Input
                label="Username"
                isInvalid={Boolean(errors.username?.message)}
                errorMessage={errors.username?.message}
                {...register("username", {
                  required: "Username should not be empty",
                })}
              />
              <Input
                label="Name"
                isInvalid={Boolean(errors.name?.message)}
                errorMessage={errors.name?.message}
                {...register("name", {
                  required: "Name should not be empty",
                })}
              />
              <Button
                isLoading={isLoadingUpdate}
                type="submit"
                className="ml-auto"
                color="primary"
              >
                Update
              </Button>
            </div>
          </div>
        </form>
        <hr className="border-gray-200 dark:border-neutral-800 my-4" />
        <PasswordForm />
      </Card>
    </div>
  );
};

export default EditProfileForm;
