import { CourseEnrolment } from '../available_exams/course_enrolment';

export interface Users {
  id: number;
  firstName: string;
  courseEnrolments: CourseEnrolment;
}
