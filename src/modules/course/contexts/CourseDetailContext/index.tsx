import { createContext, useContext, useEffect, useState } from "react";

import { useDidUpdate } from "@mantine/hooks";

import { useUpdateLastLesson } from "../../actions";
import type { ICourse } from "../../interfaces";

export type CourseDetailCtx = {
  course?: ICourse;
  setCourse: React.Dispatch<React.SetStateAction<ICourse | undefined>>;
  activeLesson: string | null;
  setActiveLesson: React.Dispatch<React.SetStateAction<string | null>>;
  isReadOnly: boolean;
};

export const CourseDetailContext = createContext<CourseDetailCtx>({
  activeLesson: null,
  setActiveLesson: () => {},
  setCourse: () => {},
  isReadOnly: false,
});

type CourseDetailProviderProps = {
  course?: ICourse;
  children: React.ReactNode;
  isReadOnly?: boolean;
};

export const CourseDetailProvider: React.FC<CourseDetailProviderProps> = ({
  course: initialCourse,
  children,
  isReadOnly,
}) => {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [progressId, setProgressId] = useState<string>();
  const [course, setCourse] = useState(initialCourse);

  const { mutate: updateLastLesson } = useUpdateLastLesson({
    onSuccess: ({ data }) => {
      setProgressId(data.data.id);
    },
  });

  useEffect(() => {
    setCourse(initialCourse);
  }, [initialCourse]);

  useEffect(() => {
    if (initialCourse) {
      const lastLessonId =
        initialCourse.CourseUserLastLesson?.[0]?.courseLessonId;
      setActiveLesson(lastLessonId ?? null);
      setProgressId(initialCourse.CourseUserLastLesson?.[0]?.id);
    }
  }, [initialCourse]);

  useDidUpdate(() => {
    if (course && activeLesson && !isReadOnly)
      updateLastLesson({
        formValues: {
          courseId: course?.id,
          lessonId: activeLesson,
          id: progressId,
        },
      });
  }, [activeLesson, progressId, course, isReadOnly]);

  return (
    <CourseDetailContext.Provider
      value={{
        course,
        setCourse,
        activeLesson,
        setActiveLesson,
        isReadOnly: isReadOnly ?? false,
      }}
    >
      {children}
    </CourseDetailContext.Provider>
  );
};

export const useCourseDetail = () => useContext(CourseDetailContext);
