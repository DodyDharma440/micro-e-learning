import React from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
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
        <div className="flex items-center gap-2 absolute top-2 right-2">
          {course.enableForum ? (
            <Link href={`/course/${course.slug}/forum`}>
              <Button isIconOnly>
                <HiOutlineChatBubbleLeft />
              </Button>
            </Link>
          ) : null}
          <Button
            isIconOnly
            color="primary"
            onClick={() => push(`/admin/courses/${course.id}/edit`)}
          >
            <HiOutlinePencil />
          </Button>
          <Button isIconOnly color="danger" onClick={() => onDelete(course.id)}>
            <HiOutlineTrash />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xl font-bold line-clamp-2 mb-2">{course.name}</p>
        <p className="text-xs text-opacity-80">
          {course._count.chapters} Chapters
        </p>
        <div className="mt-3">
          <div className="flex gap-2 [&>button]:w-full">
            <Button onClick={() => push(`/admin/courses/${course.id}/lessons`)}>
              Lessons
            </Button>
            <Button color="primary">Publish</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
