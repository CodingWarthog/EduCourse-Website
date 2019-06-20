import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, PageEvent, MatPaginator, MatSort } from '@angular/material';
import { courseEnrolments } from 'src/app/_models/courseEnrolments/course_enrolments';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Course } from 'src/app/_models/course';
import { Pagination } from 'src/app/_models/pagination/pagination';
import { CourseService } from 'src/app/_services/course.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-recommended-courses',
  templateUrl: './recommended-courses.component.html',
  styleUrls: ['./recommended-courses.component.scss']
})
export class RecommendedCoursesComponent implements OnInit {
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

  ngOnInit() {
    this.courseService.getRecommendedCourses(this.authService.decodedToken.nameid).subscribe(result => {
      this.courses = result;
      this.showSpinner = false;
      this.dataSource = new MatTableDataSource(this.courses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(result);
    });
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
