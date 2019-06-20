import { Component, OnInit, ViewChild } from '@angular/core';

import { CourseService } from 'src/app/_services/course.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { AuthService } from 'src/app/_services/auth.service';
import { Course } from 'src/app/_models/course';
import { courseEnrolments } from 'src/app/_models/courseEnrolments';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss']
})
export class MyCoursesComponent implements OnInit {
  showSpinner = true;
  dataSource = new MatTableDataSource();
  courseEnrolments: courseEnrolments[];
  displayedColumns = [
    'name',
    'description',
    'other',
    'dismiss'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.courseService
      .getCourses(this.authService.decodedToken.nameid)
      .subscribe(result => {

        if (!result) {
          return;
        }
        console.log(result);
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSpinner = false;
      });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  deleteEnrolment(id) {

    const user_id = (id.userId);
    const userid = this.authService.decodedToken.nameid;
    const course_id = (id.id);
    console.log(user_id);
    console.log(course_id);
    console.log(id);
  // const ide = id.id;
    // console.log('dsfdsfdsfsds');
    // console.log(idee);
    // console.lIdentifiers
    // const today = new Date();
    // const date = today.getDate();
    // const month = today.getMonth();
    // const year = today.getFullYear();
    // const current_date = date + '/' + month + '/' + year;
    // console.log(current_date);
    this.courseService.deleteUserEnrolment(userid, course_id).subscribe(
      () => {
        this.alertifyService.success('Zostałeś wypisany z kursu');
        this.ngOnInit();
        // this.router.navigate(['/users']);
      },
      error => {
        this.alertifyService.error(error);
      }
    );

  }
}
