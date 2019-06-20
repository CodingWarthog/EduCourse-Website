import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Exam } from 'src/app/_models/exam/exam';
import { ExamService } from 'src/app/_services/exam.service';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnInit {
  exam: Exam;
  addExamForm: FormGroup;
  id: number;
  private sub: any;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private examService: ExamService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.createAddCourseForm();

  }
  createAddCourseForm() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
    });
    this.addExamForm = this.fb.group({
      name: [''],
      subject: [''],
      timeLimit: [],
      totalExamPoints: [],
      numberOfQuestions: [],
      level: [''],
      type: [''],
      courseId: [this.id]
    });
  }
  addCourse() {

    if (this.addExamForm.valid) {
      this.exam = Object.assign({}, this.addExamForm.value);
      this.examService.addExam(this.exam).subscribe(
        () => {
          this.alertifyService.success('Egzamin został utworzony');
          this.router.navigate(['/courses']);
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    }
  }
}
