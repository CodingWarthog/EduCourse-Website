import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CourseService } from 'src/app/_services/course.service';
import { AuthService } from 'src/app/_services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Course } from 'src/app/_models/course';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-my-courses-created',
  templateUrl: './my-courses-created.component.html',
  styleUrls: ['./my-courses-created.component.scss']
})
export class MyCoursesCreatedComponent implements OnInit {
  dataSource = new MatTableDataSource();
  userCourses: Course[];

  displayedColumns = [
    'name',
    'description',
    'other',
    'action'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private httpService: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.courseService
      .getMyCourses(this.authService.decodedToken.nameid)
      .subscribe(result => {
        this.userCourses = result['course'];
        this.dataSource = new MatTableDataSource(this.userCourses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  deleteCourse(id) {

    console.log(id);

    const course_id = (id.id);
    console.log(course_id);
    console.log(id);
    this.courseService.deleteCourse(course_id).subscribe(
      () => {
        this.alertifyService.success('Kurs został usunięty');
        this.ngOnInit();
        // this.router.navigate(['/users']);
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
  getVal(row) {
    const course_id = row.id;
    console.log(course_id);
    this.router.navigate(['/addexam', course_id]);
  }
}
