import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  addUser(user: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8089/topics/${user.topicId}/users`,
      user
    );
  }
  getUserById(userID: any): Observable<any> {
    return this.http.get(`http://localhost:8089/topics/${userID}/users`);
  }
}
