import { OnInit, ViewChild, Component } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Exam } from 'src/app/_models/exam';
import { Course } from 'src/app/_models/course';
import { ExamService } from 'src/app/_services/exam.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-normal',
  templateUrl: './normal.component.html',
  styleUrls: ['./normal.component.scss']
})
export class NormalComponent implements OnInit {
  dataSourceExam = new MatTableDataSource();
  res: any;
  myExams: Exam[];
  myCourseExams: Course[];

  displayedColumns = [
    'name',
    // 'subject',
    'totalExamPoints',
    'numberOfQuestions',
    'level',
    'action'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private examService: ExamService,
    private authService: AuthService,
    private httpService: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.examService
      .getMyExams(this.authService.decodedToken.nameid)
      .subscribe(result => {
        this.dataSourceExam = new MatTableDataSource(result);
        this.dataSourceExam.paginator = this.paginator;
        this.dataSourceExam.sort = this.sort;
      },
      error => {
        this.alertifyService.error(error);
      });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSourceExam.filter = filterValue;
  }
  getExamId(row) {
    const question_id = row.id;
    console.log(row);
    this.router.navigate(['/addquestion', question_id]);
  }
  deleteExam(id) {
    const exam_id = id.id;
    console.log(exam_id);
    console.log(id);
    this.examService.deleteExam(exam_id).subscribe(
      () => {
        this.alertifyService.success('Kurs został usunięty');
        this.ngOnInit();
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
}
