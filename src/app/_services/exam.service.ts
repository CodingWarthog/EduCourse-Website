import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Exam } from '../_models/exam/exam';
import { Question } from '../_models/question/question';
import { MovingBlock } from '../_models/draft/movingBlock';
import { BlockItem } from '../_models/draft/blockItem';
import { AssignBadge } from '../_models/badges/assignBadge';
import { Badges } from '../_models/badges/badges';
import { Experience } from '../_models/experience/experience';
import { Course } from '../_models/course';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllExams(id: number) {
    return this.http.get<Exam[]>(this.baseUrl + 'exams/questions/' + id);
  }
  getMyExams(id: number) {
    return this.http.get<Exam[]>(this.baseUrl + 'exams/created/' + id);
  }
  getMyDraftExams(id: number) {
    return this.http.get<Exam[]>(this.baseUrl + 'exams/created_draft/' + id);
  }
  deleteExam(exam_id: number) {
    const url = this.baseUrl + `exams/` + exam_id;
    return this.http.delete(url);
  }
  addExam(exam: Exam) {
    return this.http.post<Exam[]>(this.baseUrl + 'exams/', exam);
  }
  addBlock(blockItem: BlockItem) {
    return this.http.post<BlockItem[]>(this.baseUrl + 'blockItems/', blockItem);
  }
  addQuestion(question: Question) {
    return this.http.post<Question[]>(this.baseUrl + 'questions/', question);
  }
  getExamQuestions(exam_id: number) {
    return this.http.get<Question[]>(
      this.baseUrl + 'exams/questions/' + exam_id
    );
  }
  deleteQuestion(question_id: number) {
    const url = this.baseUrl + `questions/` + question_id;
    return this.http.delete(url);
  }
  deleteBlock(block_id: number) {
    const url = this.baseUrl + `blockItems/` + block_id;
    return this.http.delete(url);
  }
  getDraftExam(id: number) {
    return this.http.get<Exam[]>(this.baseUrl + 'exams/blocks/' + id);
  }
  assignBadge(assignment: AssignBadge) {
    return this.http.post<AssignBadge[]>(this.baseUrl + 'badges/assign_badge/', assignment);
  }
  getAllBadgesWithExperienceByCategory(categoryId: number) {
    return this.http.get<Badges[]>(this.baseUrl + 'badges/category_badges/' + categoryId);
  }
  getCategoryOfExam(courseId: number) {
    return this.http.get<Course[]>(this.baseUrl + 'exams/category/' + courseId);
  }
  getUserExperienceByCategory(userId: number, categoryId: number) {
    const url =
      this.baseUrl +
      `experiences/user_experience_category?userId=${userId}&categoryId=${categoryId}`;
    return this.http.get<Experience[]>(url);
  }
  updateExperience(id: number, experience: Experience) {
    return this.http.put(this.baseUrl + 'experiences/update_experience/' + id, experience);
  }
  getUserBadges(userId: number) {
    return this.http.get<Badges[]>(this.baseUrl + 'badges/user_badges/' + userId);
  }
  // updateExperienceCategory(userId: number, categoryId: number, experience: Experience) {
  //   let url =
  //     this.baseUrl +
  //     `experiences/update_experience?userId=${userId}&categoryId=${categoryId}`, experience;
  //   return this.http.put(url);
  // }

}
