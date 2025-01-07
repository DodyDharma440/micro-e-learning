import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

import { useCreateWorkPos, useUpdateWorkPos } from "../../actions";
import type { IWorkPositionPayload } from "../../interfaces";
import { type IWorkPosition } from "../../interfaces";

type WorkPositionFormProps = {
  isOpen: boolean;
  onClose: () => void;
  editValue: IWorkPosition | null;
};

const WorkPositionForm: React.FC<WorkPositionFormProps> = ({
  isOpen,
  onClose,
  editValue,
}) => {
  const { mutate: createWorkPos, isPending: isLoadingCreate } =
    useCreateWorkPos({ onSuccess: onClose });
  const { mutate: updateWorkPos, isPending: isLoadingUpdate } =
    useUpdateWorkPos({ onSuccess: onClose });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IWorkPositionPayload>();

  const submitHandler = (values: IWorkPositionPayload) => {
    if (editValue) {
      updateWorkPos({ formValues: values, id: editValue.id });
    } else {
      createWorkPos({ formValues: values });
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (editValue) {
        reset({ name: editValue.name });
      } else {
        reset({ name: "" });
      }
    }
  }, [editValue, isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form onSubmit={handleSubmit(submitHandler)}>
          <ModalHeader>{editValue ? "Edit" : "Add"} Work Position</ModalHeader>
          <ModalBody>
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Name should not be empty",
              }}
              render={({ field }) => {
                return (
                  <Input
                    label="Name"
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

export default WorkPositionForm;
