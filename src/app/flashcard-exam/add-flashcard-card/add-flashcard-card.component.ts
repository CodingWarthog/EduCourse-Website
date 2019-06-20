import { Component, OnInit, ViewChild } from '@angular/core';
import { Flashcard } from 'src/app/_models/flashcard/flashcard';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { FlashcardService } from 'src/app/_services/flashcard.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-add-flashcard-card',
  templateUrl: './add-flashcard-card.component.html',
  styleUrls: ['./add-flashcard-card.component.scss']
})
export class AddFlashcardCardComponent implements OnInit {
  dataSource = new MatTableDataSource();

  displayedColumns = ['frontside', 'backside', 'learned', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  flashcardList: Flashcard[];
  flashcard: Flashcard;
  addFlashcardForm: FormGroup;
  id: number;
  private sub: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private flashcardService: FlashcardService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createAddFlashcardForm();
    this.getFlashcards();
  }
  createAddFlashcardForm() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
    });
    this.addFlashcardForm = this.fb.group({
      frontside: [''],
      backside: [''],
      learned: [],
      flashcardSetId: [this.id]
    });
  }
  addFlashcard() {
    if (this.addFlashcardForm.valid) {
      this.flashcard = Object.assign({}, this.addFlashcardForm.value);
      this.flashcardService.addFlashcard(this.flashcard).subscribe(
        () => {
          this.alertifyService.success('Fiszka została dodana');
          // this.router.navigate(['/flashcard_exam']);
          this.ngOnInit();
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    }
  }
  deleteFlashcard(row) {
    const flashcard_id = row.id;
    console.log(flashcard_id);
    this.flashcardService.deleteFlashcard(flashcard_id).subscribe(
      () => {
        this.alertifyService.success('Fiszka została usunięta');
        this.ngOnInit();
        // this.router.navigate(['/users']);
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
  getFlashcards() {
    this.flashcardService.getSetFlashcard(this.id).subscribe(result => {
      this.flashcardList = result['flashcard'];
      this.dataSource = new MatTableDataSource(this.flashcardList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.ngOnInit();
    });
  }
}
