export interface IDashboardStats {
  totalUsers: number;
  activeCourse: number;
  draftCourse: number;
  activeForums: number;
}

export interface ICourseDistribution
  extends Record<string, { name: string; count: number }> {}
