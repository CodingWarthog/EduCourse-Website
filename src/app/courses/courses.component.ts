import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { CourseService } from '../_services/course.service';
import { courseEnrolments } from '../_models/courseEnrolments';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  currentRole: string;
  courseEnrolments: courseEnrolments[];
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAdministrator();
    this.currentRole = this.authService.isAdmin();
  }
  handleClick() {
    console.log('clicked');
  }
  isAdministrator() {
    console.log(this.authService.isAdmin());
  }
}
