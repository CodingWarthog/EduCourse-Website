import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ExamResult } from 'src/app/_models/exam_result/examResult';
import { ExamresultService } from 'src/app/_services/examresult.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users-result-quiz',
  templateUrl: './users-result-quiz.component.html',
  styleUrls: ['./users-result-quiz.component.scss']
})
export class UsersResultQuizComponent implements OnInit {
  dataSourceExamResult = new MatTableDataSource();

  res: any;
  userExamResults: ExamResult[];

  displayedColumns = [
    'result',
    'resultPoints',
    'totalExamPoints',
    'percentage',
    'examName'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private examResultService: ExamresultService,
    private authService: AuthService,
    private httpService: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.removeItem('experienceId');
    localStorage.removeItem('exp_to_add');
    localStorage.removeItem('experiencePoints');
    localStorage.removeItem('correctAnswer');
    localStorage.removeItem('categoryId');
    localStorage.removeItem('courseId');
    localStorage.removeItem('bloczki');
    localStorage.removeItem('time');
    this.examResultService
      .getMyExamResults(this.authService.decodedToken.nameid)
      .subscribe(result => {
         this.userExamResults = result['examResult'];
        // this.courseEnrolments = result['courseEnrolments']
        // const arr = [];
        // result['courseEnrolments'].forEach(course => {
        //   course.exams.forEach(exam => arr.push(exam));
        // });

        if (!result) {
          return;
        }


        this.dataSourceExamResult = new MatTableDataSource( this.userExamResults);
        this.dataSourceExamResult.paginator = this.paginator;
        this.dataSourceExamResult.sort = this.sort;
      });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceExamResult.filter = filterValue;
  }
  getVal(row) {
    const exam_id = row.id;
    console.log(row);
    this.router.navigate(['/exam', exam_id]);
  }
}

