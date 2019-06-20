// tslint:disable-next-line:class-name
import { Course } from './course';
import { Exam } from './exam';
// tslint:disable-next-line:class-name
export interface courseEnrolments {
  id: number;
  name: string;
  courses: Course;
  exams: Exam;
}
