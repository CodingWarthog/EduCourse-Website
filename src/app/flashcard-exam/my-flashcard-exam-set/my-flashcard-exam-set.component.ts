import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { FlashcardService } from 'src/app/_services/flashcard.service';
import { FlashcardSet } from 'src/app/_models/flashcard/flashcard-set';

@Component({
  selector: 'app-my-flashcard-exam-set',
  templateUrl: './my-flashcard-exam-set.component.html',
  styleUrls: ['./my-flashcard-exam-set.component.scss']
})
export class MyFlashcardExamSetComponent implements OnInit {
  dataSource = new MatTableDataSource();
  flashcardSetForResponses: FlashcardSet[];
  currentRole: string;
  displayedColumns = ['name', 'level', 'creationDate', 'description', 'other', 'checked'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private flashcardService: FlashcardService,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentRole = this.authService.isAdmin();
    console.log(this.currentRole);
    this.flashcardService
      .getMyFlashcardSet(this.authService.decodedToken.nameid)
      .subscribe(result => {
        if (!result) {
          return;
        }
        this.flashcardSetForResponses = result['flashcardSet'];
        this.dataSource = new MatTableDataSource(this.flashcardSetForResponses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    this.router.navigate(['/flashcard_exam_add_card', flashcardSet_id]);
  }
  delete(row) {
    const flashcardSet_id = row.id;
    console.log(flashcardSet_id);
    this.flashcardService.deleteFlashcardSet(flashcardSet_id).subscribe(
      () => {
        this.alertifyService.success('Zestaw został usunięty');
        this.ngOnInit();
        // this.router.navigate(['/users']);
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
}
