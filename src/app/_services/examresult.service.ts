import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ExamResult } from '../_models/exam_result/examResult';

@Injectable({
  providedIn: 'root'
})
export class ExamresultService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMyExamResults(id: number) {
    return this.http.get<ExamResult[]>(this.baseUrl + 'examresults/' + id);
  }
  addExamResult(exam: ExamResult) {
    return this.http.post<ExamResult[]>(this.baseUrl + 'examresults/', exam);
  }
}
