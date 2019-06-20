import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from 'src/app/_services/course.service';
import { AuthService } from 'src/app/_services/auth.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { courseEnrolments } from 'src/app/_models/courseEnrolments/course_enrolments';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { getDate, daysInMonth } from 'ngx-bootstrap/chronos/utils/date-getters';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { FlashcardService } from 'src/app/_services/flashcard.service';
import { Router } from '@angular/router';
import { FlashcardSet } from 'src/app/_models/flashcard/flashcard-set';

@Component({
  selector: 'app-display-flashcard-set',
  templateUrl: './display-flashcard-set.component.html',
  styleUrls: ['./display-flashcard-set.component.scss']
})
export class DisplayFlashcardSetComponent implements OnInit {
  showSpinner = true;
  dataSource = new MatTableDataSource();
  flashcardSetForResponses: FlashcardSet[];
  displayedColumns = ['name', 'level', 'creationDate', 'description', 'other', 'userId', 'checked'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private flashcardService: FlashcardService,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.flashcardService
      .getAllFlashcardSet()
      .subscribe(result => {
        if (!result) {
          return;
        }
        this.flashcardSetForResponses = result;
        this.dataSource = new MatTableDataSource(this.flashcardSetForResponses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSpinner = false;
      });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  getVal(row) {
    const flashcardSet_id = row.id;
    console.log(row);
    this.router.navigate(['/flashcard_exam_study', flashcardSet_id]);
  }

}
