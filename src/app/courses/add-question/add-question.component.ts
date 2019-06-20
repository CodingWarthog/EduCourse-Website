import { Component, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/app/_models/question/question';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { CourseService } from 'src/app/_services/course.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ExamService } from 'src/app/_services/exam.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Course } from 'src/app/_models/exam/course';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  dataSource = new MatTableDataSource();


  displayedColumns = [
    'question1',
    'answer',
    'examId',
    'delete'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  question: Question;
  questions: Question[];
  addQuestionForm: FormGroup;
  id: number;
  private sub: any;
  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private examService: ExamService,
              private alertifyService: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.createAddQuestionForm();
    this.examService
      .getExamQuestions(this.id)
      .subscribe(result => {
        this.questions = result['question'];
        this.dataSource = new MatTableDataSource(this.questions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  createAddQuestionForm() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
    });
    this.addQuestionForm = this.fb.group({
      question1: [''],
      answer: [''],
      optionOne: [''],
      optionTwo: [''],
      optionThree: [''],
      optionFour: [''],
      url: [''],
      examId: [this.id]
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  deleteQuestion(row) {
    const exam_id = (row.id);
    console.log(exam_id);
    console.log(row);
    this.examService.deleteQuestion(exam_id).subscribe(
      () => {
        this.alertifyService.success('Pytanie zostało usuniete');
        this.ngOnInit();
        // this.router.navigate(['/users']);
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
  addQuestion() {
    if (this.addQuestionForm.valid) {
      this.question = Object.assign({}, this.addQuestionForm.value);
      this.examService
        .addQuestion(this.question)
        .subscribe(
          () => {
            this.alertifyService.success('Pytanie zostało dodane');
            // this.router.navigate(['/addquestion', this.id]);
            this.addQuestionForm.reset();
            this.ngOnInit();
          },
          error => {
            this.alertifyService.error(error);
          }
        );
    }
  }
}
