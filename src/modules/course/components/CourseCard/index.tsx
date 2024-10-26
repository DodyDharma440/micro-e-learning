import React from "react";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, Card } from "@nextui-org/react";

import type { ICourse } from "../../interfaces";

type CourseCardProps = {
  course: ICourse;
  onDelete: (val: string) => void;
};

const CourseCard: React.FC<CourseCardProps> = ({ course, onDelete }) => {
  const { push } = useRouter();

  return (
    <Card isBlurred>
      <div className="h-[200px] relative overflow-hidden bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-5">
        <Image
          src={course.thumbnailUrl}
          alt="thumb"
          fill
          className="object-cover"
        />
        {course.enableForum ? (
          <Link href={`/course/${course.slug}/forum`}>
            <Button isIconOnly className="absolute top-2 right-2">
              <HiOutlineChatBubbleLeft />
            </Button>
          </Link>
        ) : null}
      </div>
      <div className="p-4">
        <p className="text-xl font-bold line-clamp-2 mb-2">{course.name}</p>
        <p className="text-xs text-opacity-80">
          {course.category.name} | {course.trainer.name}
        </p>
        <div className="mt-3">
          <div className="flex gap-2 [&>button]:w-full">
            <Button onClick={() => push(`/admin/courses/${course.id}/lessons`)}>
              Lessons
            </Button>
            <Button
              color="primary"
              onClick={() => push(`/admin/courses/${course.id}/edit`)}
            >
              Edit
            </Button>
            <Button color="danger" onClick={() => onDelete(course.id)}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
