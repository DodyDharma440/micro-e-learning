import React from "react";

import Image from "next/image";

import { Button, Card } from "@nextui-org/react";

import type { ICourse } from "../../interfaces";

type CourseCardProps = {
  course: ICourse;
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Card isBlurred>
      <div className="h-[200px] relative overflow-hidden">
        <Image
          src={course.thumbnailUrl}
          alt="thumb"
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-xl font-bold line-clamp-2 mb-2">{course.name}</p>
        <p className="text-xs text-opacity-80">
          {course.category.name} | {course.trainer.name}
        </p>
        <div className="mt-3">
          <Button className="w-full mb-2">Lessons</Button>
          <div className="flex gap-2 [&>button]:w-full">
            <Button color="primary">Edit</Button>
            <Button color="danger">Delete</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
