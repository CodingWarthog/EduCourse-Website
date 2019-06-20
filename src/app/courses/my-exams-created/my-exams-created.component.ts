import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CourseService } from 'src/app/_services/course.service';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Exam } from 'src/app/_models/exam/exam';
import { Course } from 'src/app/_models/exam/course';
import { ExamService } from 'src/app/_services/exam.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-my-exams-created',
  templateUrl: './my-exams-created.component.html',
  styleUrls: ['./my-exams-created.component.scss']
})
export class MyExamsCreatedComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAdministrator();
  }
  handleClick() {
    console.log('clicked');
  }
  isAdministrator() {
    console.log(this.authService.isAdmin());
  }
}
