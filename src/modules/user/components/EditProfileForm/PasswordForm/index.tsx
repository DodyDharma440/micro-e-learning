import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

import { useDisclosure } from "@mantine/hooks";
import { Button, Input } from "@nextui-org/react";

import { useUpdatePassword } from "@/modules/user/actions";
import type { IUpdatePasswordPayload } from "@/modules/user/interfaces";

interface IPasswordForm extends IUpdatePasswordPayload {
  confirmPassword?: string;
}

type InputTogglerProps = {
  onToggle: () => void;
  isShow: boolean;
};

const InputToggler: React.FC<InputTogglerProps> = ({ onToggle, isShow }) => {
  return (
    <button
      className="focus:outline-none"
      type="button"
      onClick={onToggle}
      aria-label="toggle password visibility"
    >
      {isShow ? (
        <HiEyeSlash className="text-2xl text-default-400 pointer-events-none" />
      ) : (
        <HiEye className="text-2xl text-default-400 pointer-events-none" />
      )}
    </button>
  );
};

const PasswordForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<IPasswordForm>();
  const newPassword = useWatch({ control, name: "newPassword" });

  const [isShowCurrPw, { toggle: toggleCurrPw }] = useDisclosure();
  const [isShowPw, { toggle: togglePw }] = useDisclosure();
  const [isShowConfirmPw, { toggle: toggleConfirmPw }] = useDisclosure();

  const { mutate: updatePassword, isPending: isLoadingUpdate } =
    useUpdatePassword({
      onSuccess: () => reset(),
    });

  const submitHandler = (values: IPasswordForm) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...formValues } = values;
    updatePassword({ formValues });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <h2 className="font-bold mb-4">Change Password</h2>
        <div className="flex flex-col gap-2">
          <Input
            label="Current Password"
            type={isShowCurrPw ? "text" : "password"}
            isInvalid={Boolean(errors.oldPassword?.message)}
            errorMessage={errors.oldPassword?.message}
            {...register("oldPassword", {
              required: "Old password should not be empty",
            })}
            endContent={
              <InputToggler isShow={isShowCurrPw} onToggle={toggleCurrPw} />
            }
          />

          <Input
            label="New password"
            type={isShowPw ? "text" : "password"}
            isInvalid={Boolean(errors.newPassword?.message)}
            errorMessage={errors.newPassword?.message}
            {...register("newPassword", {
              required: "New password should not be empty",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            endContent={<InputToggler isShow={isShowPw} onToggle={togglePw} />}
          />

          <Input
            label="Confirm new password"
            type={isShowConfirmPw ? "text" : "password"}
            isInvalid={Boolean(errors.confirmPassword?.message)}
            errorMessage={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Confirm password should not be empty",
              validate: (val) => {
                if (val !== newPassword) {
                  return "Password does not match";
                }
              },
            })}
            endContent={
              <InputToggler
                isShow={isShowConfirmPw}
                onToggle={toggleConfirmPw}
              />
            }
          />

          <Button
            type="submit"
            isLoading={isLoadingUpdate}
            className="ml-auto"
            color="primary"
          >
            Update
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PasswordForm;
