import React, { useEffect, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

import { useDisclosure } from "@mantine/hooks";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";

import type { IUser } from "@/modules/auth/interfaces";
import { useGetWorkPositions } from "@/modules/user/actions";

import { useCreateUser } from "../../actions";
import type { IUserPayload } from "../../interfaces";

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

type UserFormProps = {
  isOpen: boolean;
  onClose: () => void;
  editValue: IUser | null;
};

const roleOptions = [
  { label: "Superadmin", value: "superadmin" },
  { label: "Trainer", value: "trainer" },
  { label: "User", value: "user" },
];

const UserForm: React.FC<UserFormProps> = ({ isOpen, onClose, editValue }) => {
  const { mutate: createUser, isPending: isLoadingCreate } = useCreateUser({
    onSuccess: onClose,
  });
  const { mutate: updateUser, isPending: isLoadingUpdate } = useCreateUser({
    onSuccess: onClose,
  });

  const { data: dataPositions, isLoading: isLoadingPositions } =
    useGetWorkPositions();
  const positionOptions = useMemo(() => {
    return (dataPositions?.data.data || []).map((t) => ({
      label: t.name,
      value: t.id,
    }));
  }, [dataPositions?.data.data]);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<IUserPayload>();

  const passwordVal = useWatch({ control, name: "password" });

  const [isShowPw, { toggle: togglePw }] = useDisclosure();
  const [isShowConfirmPw, { toggle: toggleConfirmPw }] = useDisclosure();

  const submitHandler = (values: IUserPayload) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, password, ...formValues } = values;
    if (editValue) {
      updateUser({
        formValues,
      });
    } else {
      createUser({ formValues: { ...formValues, password } });
    }
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        name: "",
        username: "",
        password: "",
        role: "user",
        workPositionId: "",
      });
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <ModalHeader>{editValue ? "Edit" : "Add"} User</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Input
                label="Full Name"
                errorMessage={errors.name?.message}
                isInvalid={Boolean(errors.name?.message)}
                {...register("name", {
                  required: "Name should not be empty",
                })}
              />
              <Input
                label="Username"
                errorMessage={errors.username?.message}
                isInvalid={Boolean(errors.username?.message)}
                autoComplete="off"
                {...register("username", {
                  required: "Username should not be empty",
                })}
              />

              <Controller
                control={control}
                name="role"
                rules={{
                  required: "Role must be selected",
                }}
                render={({ field }) => {
                  return (
                    <Select
                      label="Role"
                      isInvalid={Boolean(errors.role?.message)}
                      errorMessage={errors.role?.message}
                      selectedKeys={[field.value]}
                      {...field}
                    >
                      {roleOptions.map((role) => (
                        <SelectItem key={role.value}>{role.label}</SelectItem>
                      ))}
                    </Select>
                  );
                }}
              />

              <Controller
                control={control}
                name="workPositionId"
                rules={{
                  required: "Work position must be selected",
                }}
                render={({ field }) => {
                  return (
                    <Select
                      label="Work Position"
                      isInvalid={Boolean(errors.workPositionId?.message)}
                      errorMessage={errors.workPositionId?.message}
                      isDisabled={isLoadingPositions}
                      selectedKeys={[field.value]}
                      {...field}
                    >
                      {positionOptions.map((workPos) => (
                        <SelectItem key={workPos.value}>
                          {workPos.label}
                        </SelectItem>
                      ))}
                    </Select>
                  );
                }}
              />

              <Input
                label="New password"
                description="Password can't be revealed next time after the user created. Make sure backup the password."
                type={isShowPw ? "text" : "password"}
                isInvalid={Boolean(errors.password?.message)}
                errorMessage={errors.password?.message}
                autoComplete="new-password"
                {...register("password", {
                  required: "Password should not be empty",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                endContent={
                  <InputToggler isShow={isShowPw} onToggle={togglePw} />
                }
              />

              <Input
                label="Confirm new password"
                type={isShowConfirmPw ? "text" : "password"}
                isInvalid={Boolean(errors.confirmPassword?.message)}
                autoComplete="new-password"
                errorMessage={errors.confirmPassword?.message}
                {...register("confirmPassword", {
                  required: "Confirm password should not be empty",
                  validate: (val) => {
                    if (val !== passwordVal) {
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
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-end gap-4 mt-4">
              <Button onClick={onClose}>Cancel</Button>
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

export default UserForm;
