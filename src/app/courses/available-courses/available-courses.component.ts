import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CourseService } from 'src/app/_services/course.service';
import { AuthService } from 'src/app/_services/auth.service';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  PageEvent
} from '@angular/material';
import { courseEnrolments } from 'src/app/_models/courseEnrolments/course_enrolments';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { getDate, daysInMonth } from 'ngx-bootstrap/chronos/utils/date-getters';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router, NavigationEnd } from '@angular/router';
import { Course } from 'src/app/_models/course';
import { Pagination } from 'src/app/_models/pagination/pagination';
import { merge } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-available-courses',
  templateUrl: './available-courses.component.html',
  styleUrls: ['./available-courses.component.scss']
})
export class AvailableCoursesComponent implements OnInit {
  pageNumber = 1;
  pageSize = 5;
  dataSource = new MatTableDataSource();
  courseEnrolments: courseEnrolments[];
  enrolCourse: FormGroup;
  showSpinner = true;
  courseEnrolment: courseEnrolments;

  courses: Course[];
  pagination: Pagination;
  resultsLength = 0;
  totalPages = 0;
  pageIndex = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageEvent: PageEvent;
  displayedColumns = ['name', 'description', 'other', 'checked'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private fb: FormBuilder
  ) {}

  createEnrolForm(id) {
    const idee = id.id;
    this.enrolCourse = this.fb.group({
      enrolmentDate: ['12/26/2018'],
      userid: [this.authService.decodedToken.nameid],
      courseid: [idee]
    });
    this.enrolCourses();
  }
  // onPaginateChange(e) {
  //   this.courseService.getAllCourses(this.pageIndex, this.pageSize).subscribe(result => {
  //     // this.pageIndex = e.pageIndex++;
  //     console.log( this.pageIndex);
  //     this.courses = result.result;
  //     this.showSpinner = false;
  //     this.dataSource = new MatTableDataSource(this.courses);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //     this.resultsLength = result.pagination.totalItems;
  //     console.log(result.pagination.totalItems);
  //     console.log(result.pagination.totalPages);

  //   });
  // }
  // onPaginateChange(event) {
  //   console.log(event);
  //   if (event.pageIndex < this.pageIndex  && event.pageIndex <= this.totalPages) {
  //     console.log('enent page'+event.pageIndex +'page index' + this.pageIndex );
  //     this.courseService
  //       .getAllCourses(this.pageIndex + 1, this.pageSize)
  //       .subscribe(result => {
  //         // this.pageIndex = e.pageIndex++;
  //         console.log(this.pageIndex);
  //         this.courses = result.result;
  //         this.showSpinner = false;
  //         this.dataSource = new MatTableDataSource(this.courses);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //         // this.resultsLength = result.pagination.totalItems;
  //         console.log(result.pagination.totalItems);
  //         console.log(result.pagination.totalPages);
  //       });
  //   } else if (event.pageIndex === this.pageIndex-1  && event.pageIndex >= 1) {
  //     // this.pageIndex = e.pageIndex++;
  //     this.courseService
  //       .getAllCourses(this.pageIndex - 1, this.pageSize)
  //       .subscribe(result => {
  //         // this.pageIndex = e.pageIndex++;
  //         console.log(this.pageIndex);
  //         this.courses = result.result;
  //         this.showSpinner = false;
  //         this.dataSource = new MatTableDataSource(this.courses);
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //        //  this.resultsLength = result.pagination.totalItems;
  //         console.log(result.pagination.totalItems);
  //         console.log(result.pagination.totalPages);
  //       });
  //   }
  //   this.pageIndex = event.pageIndex;
  // }
  ngOnInit() {
    this.courseService.getAllCourses(this.authService.decodedToken.nameid).subscribe(result => {
      // this.pageIndex++;
      this.courses = result;
      this.showSpinner = false;
      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(result);
    });
  }
  getNext() {
    // this.pageIndex++;
    // this.courseService.getAllCourses(this.pageIndex, this.pageSize).subscribe(result => {
    //   this.courses = result.result;
    //   this.showSpinner = false;
    //   this.dataSource = new MatTableDataSource(this.courses);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    //   // this.resultsLength = result.pagination.totalItems;
    //   console.log(result.pagination.totalItems);
    //   console.log(result.pagination.totalPages);
    // });
  }
  getByPagination() {
    this.courseService.getAllCourses(this.authService.decodedToken.nameid).subscribe(result => {
      this.courses = result;
      this.showSpinner = false;
      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      console.log(result);
      console.log(result);
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  enrolCourses() {
    this.courseEnrolment = Object.assign({}, this.enrolCourse.value);
    this.courseService.enrolCourse(this.courseEnrolment).subscribe(
      () => {
        this.alertifyService.success('Zostałeś zapisany na kurs');
        this.ngOnInit();
        // this.router.navigate(['/users']);
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
}
