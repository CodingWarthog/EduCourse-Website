import { Question } from "../question/question";

export interface Exam {
  id: number;
  name: string;
  subject: string;
  timeLimit: number;
  examResult: string;
  totalExamPoints: number;
  numberOfQuestions: number;
  level: string;
  courseId: number;
  questions: Question;
}
