import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user_model/user_model';
import { Overall } from '../_models/user_model/overall.model';
import { Mark } from '../_models/user_model/mark.model';
import { CoursesList } from '../_models/user_model/courseByCategory.model';
import { Personal } from '../_models/user_model/personal.model';




@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }
  updateRole(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/role/' + id, user);
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users/');
  }
  getOverallStatistics(): Observable<Overall> {
    return this.http.get<Overall>(this.baseUrl + 'users/overall_statistics');
  }
  getMarkStatistics(userId: number): Observable<Mark> {
    return this.http.get<Mark>(this.baseUrl + 'users/mark_statistics/' + userId);
  }
  getCoursesByCategory(): Observable<number[]> {
    return this.http.get<number[]>(this.baseUrl + 'users/courseByCategory');
  }
  getPersonalData(userId: number): Observable<Personal> {
    return this.http.get<Personal>(this.baseUrl + 'users/personal_statistics/' + userId);
  }
  CheckAdult(age: number) {
    if (age >= 18) {
      return true;
    } else {
      return false;
    }
  }
}
