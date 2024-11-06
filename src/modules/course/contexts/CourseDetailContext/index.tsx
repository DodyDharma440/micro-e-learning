import { createContext, useContext, useState } from "react";

import type { ICourse } from "../../interfaces";

export type CourseDetailCtx = {
  course?: ICourse;
  activeLesson: string | null;
  setActiveLesson: React.Dispatch<React.SetStateAction<string | null>>;
};

export const CourseDetailContext = createContext<CourseDetailCtx>({
  activeLesson: null,
  setActiveLesson: () => {},
});

type CourseDetailProviderProps = {
  course?: ICourse;
  children: React.ReactNode;
};

export const CourseDetailProvider: React.FC<CourseDetailProviderProps> = ({
  course,
  children,
}) => {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  return (
    <CourseDetailContext.Provider
      value={{
        course,
        activeLesson,
        setActiveLesson,
      }}
    >
      {children}
    </CourseDetailContext.Provider>
  );
};

export const useCourseDetail = () => useContext(CourseDetailContext);
