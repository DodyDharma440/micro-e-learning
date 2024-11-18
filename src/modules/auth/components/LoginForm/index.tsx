import React, { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

import { useDisclosure } from "@mantine/hooks";
import { Button, Checkbox, Input } from "@nextui-org/react";

import { redirectDest } from "@/modules/user/constants";

import { useLogin } from "../../actions";
import type { ILoginInput } from "../../interfaces";

const LoginForm = () => {
  const [isShowPw, { toggle: togglePw }] = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ILoginInput>();
  const { mutate: login, isPending } = useLogin({
    onSuccess: ({ data }) => {
      window.location.replace(redirectDest[data.data.role]);
      localStorage.setItem("isLoggedIn", "true");
    },
  });

  const submitHandler = useCallback(
    (values: ILoginInput) => {
      const { isRemember, ...formValues } = values;
      if (isRemember) {
        localStorage.setItem("login-data", JSON.stringify(values));
      } else {
        localStorage.removeItem("login-data");
      }

      login({ formValues });
    },
    [login]
  );

  useEffect(() => {
    const loginData = JSON.parse(
      localStorage.getItem("login-data") ?? "null"
    ) as ILoginInput | null;

    if (loginData) {
      const { username, password, isRemember } = loginData;
      reset({ username, password, isRemember });
    }
  }, [reset]);

  return (
    <form
      className="w-full  max-w-md px-10 mx-auto"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h1 className="text-2xl font-bold mb-4">Selamat Datang</h1>
      <div className="flex flex-col gap-4 items-center justify-center w-full">
        <Input
          label="Username"
          isInvalid={Boolean(errors.username?.message)}
          errorMessage={errors.username?.message}
          {...register("username", {
            required: "Username should not be empty",
          })}
        />
        <Input
          label="Password"
          type={isShowPw ? "text" : "password"}
          isInvalid={Boolean(errors.password?.message)}
          errorMessage={errors.password?.message}
          {...register("password", {
            required: "Password should not be empty",
          })}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={togglePw}
              aria-label="toggle password visibility"
            >
              {isShowPw ? (
                <HiEyeSlash className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <HiEye className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
        />

        <div className="w-full">
          <Controller
            control={control}
            name="isRemember"
            render={({ field }) => {
              return (
                <Checkbox
                  {...field}
                  value=""
                  isSelected={field.value}
                  color="default"
                  size="sm"
                >
                  Ingat saya
                </Checkbox>
              );
            }}
          />
        </div>

        <Button
          isLoading={isPending}
          type="submit"
          color="primary"
          className="w-full"
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
