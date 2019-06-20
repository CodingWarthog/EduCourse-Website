import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Course } from 'src/app/_models/course';
import { CourseService } from 'src/app/_services/course.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/_models/category/category.model';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  showSpinner = true;
  course: Course;
  category: Category[];
  selected = '1';
  userId: number;
  addCourseForm: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private courseService: CourseService,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.userId = this.authService.decodedId;
    this.createAddCourseForm();
    this.courseService.getCategory().subscribe(result => {
      this.category = result;
      console.log(this.category);
    });
  }
  createAddCourseForm() {
    this.addCourseForm = this.fb.group({
      name: [''],
      description: [''],
      other: [''],
      categoryid: [''],
      userid: [this.userId]
    });
  }
  addCourse() {
    if (this.addCourseForm.valid) {
      this.course = Object.assign({}, this.addCourseForm.value);
      this.courseService
        .addCourse(this.course)
        .subscribe(
          () => {
            this.alertifyService.success('Kurs został utworzony');
            this.router.navigate(['/courses']);
          },
          error => {
            this.alertifyService.error(error);
          }
        );
    }
  }
}
