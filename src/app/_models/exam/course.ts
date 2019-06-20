import { Exam } from '../exam/exam';

export interface Course {
  id: number;
  name: string;
  description: string;
  other: string;
  userId: number;
  exams: Exam[];
}
