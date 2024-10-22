import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { HiOutlineTrash } from "react-icons/hi2";

import { Button, Input } from "@nextui-org/react";

import type { ICourseForm } from "@/modules/course/interfaces";

const Keypoints = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ICourseForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "keypointsUi",
  });

  return (
    <div>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="mb-2 flex items-center gap-3">
            <Input
              isInvalid={Boolean(
                errors.keypointsUi?.[index]?.description?.message
              )}
              label={`Keypoint ${index + 1}`}
              errorMessage={errors.keypointsUi?.[index]?.description?.message}
              {...register(`keypointsUi.${index}.description`, {
                required: "This field should not be empty",
              })}
            />
            {fields.length > 1 ? (
              <Button isIconOnly color="danger" onClick={() => remove(index)}>
                <HiOutlineTrash />
              </Button>
            ) : null}
          </div>
        );
      })}
      <div className="flex justify-end">
        <Button color="secondary" onClick={() => append({ description: "" })}>
          Add Keypoint
        </Button>
      </div>
    </div>
  );
};

export default Keypoints;
