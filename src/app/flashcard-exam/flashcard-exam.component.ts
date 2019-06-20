import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashcardService } from '../_services/flashcard.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Flashcard } from '../_models/flashcard/flashcard';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-flashcard-exam',
  templateUrl: './flashcard-exam.component.html',
  styleUrls: ['./flashcard-exam.component.scss']
})
export class FlashcardExamComponent implements OnInit {
  dataSource = new MatTableDataSource();
  currentRole: string;
  displayedColumns = ['frontside', 'backside', 'learned', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  flashcardList: Flashcard[];
  flipped = false;
  counter: number;
  id: number;
  private sub: any;
  constructor(private flashcardService: FlashcardService,
              private route: ActivatedRoute,
              private authService: AuthService) {}

  ngOnInit() {
    this.currentRole = this.authService.isAdmin();
    console.log(this.currentRole);
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log(this.id);
    });
  }

  flip() {
    this.flipped = !this.flipped;
  }
  loadQuestions() {}
  getFlashcards() {
    this.flashcardService.getSetFlashcard(this.id).subscribe(result => {
      this.flashcardList = result['flashcardLists'];
      this.dataSource = new MatTableDataSource(this.flashcardList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.ngOnInit();
    });
  }
}
