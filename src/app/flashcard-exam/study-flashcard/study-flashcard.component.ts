import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Flashcard } from 'src/app/_models/flashcard/flashcard';
import { FlashcardService } from 'src/app/_services/flashcard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-study-flashcard',
  templateUrl: './study-flashcard.component.html',
  styleUrls: ['./study-flashcard.component.scss']
})
export class StudyFlashcardComponent implements OnInit {
  dataSource = new MatTableDataSource();

  displayedColumns = ['frontside', 'backside', 'learned', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  flashcard: Flashcard;
  // flashcardLists: Flashcard[];
  flashcardLists: any = {};
  flipped = false;

  id: number;
  i: any = 0;
  counter: any = 0;
  private sub: any;
  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // console.log(this.id);
    });
    this.getFlashcards();
  }

  iterate() {
    console.log(this.counter + 'licznik');
    console.log(this.i + 'iterator');
    if (this.i < this.counter - 1) {
      this.i++;
      this.ngOnInit();
    } else {
      this.i = 0;
      this.ngOnInit();
    }
  }
  deiterate() {
    console.log(this.counter + 'licznik');
    console.log(this.i + 'iterator');
    if (this.i <= 0) {
      this.i = this.counter - 1;
      this.ngOnInit();
    } else {
      this.i--;
      this.ngOnInit();
    }
  }
  flip() {
    this.flipped = !this.flipped;
  }
  loadQuestions() {}
  getFlashcards() {
    this.flashcardService.getSetFlashcard(this.id).subscribe(result => {
      this.flashcardLists = result['flashcard'];

      const arr = [];
      result['flashcard'].forEach(flashcardLists =>
        arr.push(flashcardLists)
      );
      const custom_arr = arr[this.i];
      console.log(this.i + 'iterator po array');
      this.flashcardLists = custom_arr;
      // console.log(arr[0]);
      // console.log(arr[1]);
      // console.log(arr[2]);
      // console.log(arr['id']);
      // console.log(arr[2]);
      // console.log(arr.length);
      this.counter = arr.length;
      console.log(this.flashcardLists);
      this.dataSource = new MatTableDataSource(custom_arr);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //  this.ngOnInit();
    });
  }
}
