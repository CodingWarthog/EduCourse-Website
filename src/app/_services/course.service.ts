import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { courseEnrolments } from '../_models/courseEnrolments/course_enrolments';
import { Course } from '../_models/course';
import { Exam } from '../_models/available_exams/exam';
import { Category } from '../_models/category/category.model';
import { Badges } from '../_models/badges/badges';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCourses(id: number) {
    return this.http.get<Course[]>(this.baseUrl + 'users/courses/' + id);
  }
  getMyCourses(id: number) {
    return this.http.get<Course[]>(this.baseUrl + 'courses/created/' + id);
  }
  getAllCourses(userId: number) {
    return this.http.get<Course[]>(this.baseUrl + 'courses/filtered/' + userId);
  }
  getRecommendedCourses(userId: number) {
    return this.http.get<Course[]>(this.baseUrl + 'courses/recommendCourses/' + userId);
  }
  getAllExams(id: number) {
    return this.http.get<Exam[]>(this.baseUrl + 'exams/available/' + id);
  }
  addCourse(course: Course) {
    return this.http.post<Exam[]>(this.baseUrl + 'courses/', course);
  }
  addCategory(category: Category) {
    return this.http.post<Exam[]>(this.baseUrl + 'categories/', category);
  }
  getCategory() {
    return this.http.get<Category[]>(this.baseUrl + 'categories/');
  }
  getBadges() {
    return this.http.get<Badges[]>(this.baseUrl + 'badges/');
  }
  addBadge(badges: Badges) {
    return this.http.post<Badges[]>(this.baseUrl + 'badges/', badges);
  }
  deleteBadge(badge_id: number) {
    const url = this.baseUrl + `badges/` + badge_id;
    return this.http.delete(url);
  }
  deleteCategory(category_id: number) {
    const url = this.baseUrl + `categories/` + category_id;
    return this.http.delete(url);
  }
  enrolCourse(courseEnrol: courseEnrolments) {
    return this.http.post<courseEnrolments[]>(
      this.baseUrl + 'courseenrolments/',
      courseEnrol
    );
  }
  deleteUserEnrolment(user_id: number, course_id: number) {
    const url =
      this.baseUrl +
      `courseenrolments/for_delete?user_id=${user_id}&course_id=${course_id}`;
    return this.http.delete(url);
  }
  deleteCourse(course_id: number) {
    const url = this.baseUrl + `courses/` + course_id;
    return this.http.delete(url);
  }
}
