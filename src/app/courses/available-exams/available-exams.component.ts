import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CourseService } from 'src/app/_services/course.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Exam } from 'src/app/_models/available_exams/exam';
import { CourseEnrolment } from 'src/app/_models/available_exams/course_enrolment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-available-exams',
  templateUrl: './available-exams.component.html',
  styleUrls: ['./available-exams.component.scss']
})
export class AvailableExamsComponent implements OnInit {
  dataSourceExam = new MatTableDataSource();
  // data = Object.assign(this.exams);
  // dataSource = new MatTableDataSource<Exams>(this.data);
  // selection = new SelectionModel<Exams>(true, []);

  // public MyArrayType = Array<{id: number, name: string, subject: string, timeLimit: number, examResult: string}>;
  res: any;
  exams: Exam[];
  timeLimit: number;
  time: string;
  point: string;
  courseEnrolments: CourseEnrolment[];
  catIdHolder: any;

  displayedColumns = [
    'name',
    // 'subject',
    'totalExamPoints',
    'numberOfQuestions',
    'level',
    'dismiss'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild('lblName') lblName: ElementRef;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private httpService: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.courseService
      .getAllExams(this.authService.decodedToken.nameid)
      .subscribe(result => {
        // this.courseEnrolments = result['courseEnrolments'];
        // this.courseEnrolments = result['courseEnrolments']
        const arr = [];
        result['myCourseExams'].forEach(course => {
          course.myExams.forEach(exam => arr.push(exam));
        });
        this.catIdHolder = result['myCourseExams'];
        console.log(this.catIdHolder);

        localStorage.setItem('time', this.time);
        if (!result) {
          return;
        }

        this.dataSourceExam = new MatTableDataSource(arr);
        this.dataSourceExam.paginator = this.paginator;
        this.dataSourceExam.sort = this.sort;
      });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceExam.filter = filterValue;
  }
  solveExam(row, timeLimit, totalExamPoints) {
    const time = timeLimit;
    const totalP = totalExamPoints;
    const exam_id = row.id;

    console.log('tu jestem');
    console.log(time);
    console.log(totalP);
    console.log('tu jestem');
    if (row.type === 'Zwykly') {
      this.router.navigate([
        '/exam',
        { id: exam_id, time: time, total: totalP }
      ]);
    } else {
      console.log('dassdsadsadadadaas');
      console.log(totalP);
      this.router.navigate([
        '/draft_exam',
        { id: exam_id, time: time, total: totalP }
      ]);
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
}
// }
// export interface Exams {
//   id: number;
//   name: string;
//   subject: string;
//   timeLimit: string;
//   examResult: string;
// }
