import { Exam } from '../available_exams/exam';

export interface CourseEnrolment {
  id: number;
  exams: Exam[];
}
