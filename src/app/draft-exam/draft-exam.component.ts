import { OnInit, Component } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { ExamService } from '../_services/exam.service';
import { AuthService } from '../_services/auth.service';
import { BlockItem } from '../_models/draft/blockItem';
import { MovingBlock } from '../_models/draft/movingBlock';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamresultService } from '../_services/examresult.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-draft-exam',
  templateUrl: './draft-exam.component.html',
  styleUrls: ['./draft-exam.component.scss']
})
export class DraftExamComponent implements OnInit {
  setTrue: boolean;
  blockItem: any;
  blockItems: any;
  ids: any[];
  iterator = 1;

  timeLeft = 0;
  days = Math.floor(this.timeLeft / 60 / 60 / 24);
  hoursHolder = Math.floor(this.timeLeft / 60 / 60);
  hours = this.hoursHolder % 24;
  minutesHolder = Math.floor(this.timeLeft / 60);
  minutes = this.minutesHolder % 60;
  seconds = this.timeLeft % 60;
  list: number[] = [];
  // position helpers
  interval;
  miliInterval;
  private sub: any;

  id: number;
  time: number;
  point: number;
  mark: string;
  // for result
  answerForm: FormGroup;
  addForm: FormGroup;
  updateExperienceForm: FormGroup;

  exp_id: any;
  experienceForUpdate: any;
  resultForUpdate: any;
  courseId: any;
  totalPoint = 0;
  percentage: number;
  examName: string;

  buttonReverse = false;
  iconStop = 'stop';
  iconStart = 'play_arrow';
  icon = 'play_arrow';

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private examResultService: ExamresultService,
    private alertifyService: AlertifyService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createAddExamResultForm();
    this.getParameterFromRoute();
    this.examService.getDraftExam(this.id).subscribe(result => {
      this.courseId = result['courseId'];
      this.examName = result['name'];
      localStorage.setItem('courseId', this.courseId);
      this.blockItems = result['blockItem'];
      this.blockItems.sort(() => Math.random() - 0.5);
      this.blockItem = result['blockItem'];

      localStorage.setItem('bloczki', JSON.stringify(this.blockItem));
    });
    console.log(this.blockItem);
    this.startTimer();
  }
  createAddExamResultForm() {
    this.addForm = this.fb.group({
      mark: [this.mark],
      points: [this.point],
      totalExamPoints: [this.totalPoint],
      percentage: [this.percentage],
      examName: [this.examName],
      ExamId: [this.id],
      userId: [this.authService.decodedToken.nameid]
    });
  }
  createUpdateExperienceForm() {
    this.updateExperienceForm = this.fb.group({
      experiencePoints: [this.point],
      userId: [this.authService.decodedToken.nameid],
      categoryId: [+localStorage.getItem('categoryId')]
    });
  }

  getParameterFromRoute() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.time = +params['time'];
      this.point = +params['total'];
      this.timeLeft = this.time * 60;
      this.seconds = this.timeLeft % 60;
    });
  }
  startTimer() {
    this.buttonReverse = true;
    if (this.buttonReverse === true) {
      this.icon = this.iconStop;
    }

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        // this.seconds = this.timeLeft % 60;
        this.timeLeft--;
        // manage hours
        this.hoursHolder = Math.floor(this.timeLeft / 60 / 60);
        this.hours = this.hoursHolder % 24;
        // manage minutes
        this.minutesHolder = Math.floor(this.timeLeft / 60);
        this.minutes = this.minutesHolder % 60;
        // manage minutes

        // manage seconds
        if (this.seconds > 0 && this.timeLeft > 0) {
          this.seconds--;
        } else if (this.timeLeft < 60 && this.timeLeft > 0) {
          this.seconds = this.timeLeft;
          console.log(this.timeLeft);
        } else if (this.timeLeft <= 0) {
          this.seconds = 0;
          this.mark = 'Niezaliczone';
          this.totalPoint = this.point;
          this.point = 0;
          this.percentage = 0;
          this.answerHistory();
        } else {
          this.seconds = 60;
        }

        console.log(this.minutes);
      }
    }, 1000);
  }
  milisecondTimer() {
    this.miliInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
    }, 1000);
  }
  pauseTimer() {
    this.buttonReverse = false;
    clearInterval(this.interval);
  }
  compare(blockItems) {
    // const list = [];
    const correct_positions: number[] = [];
    const actual_positions: number[] = [];
    // pobranie bloczków z localstorage
    const bloczki = JSON.parse(localStorage.getItem('bloczki'));
    // ustawienie bloczków w odpowiedniej kolejnosci
    bloczki.sort(function(a, b) {
      return a.blockPosition > b.blockPosition
        ? 1
        : a.blockPosition < b.blockPosition
        ? -1
        : 0;
    });
    // przepisanie pozycji do tablicy list
    bloczki.forEach(element => {
      correct_positions.push(element.blockPosition);
      console.log('Przepisana lista Poprawna kolejność', element.blockPosition);
    });
    // przepisanie aktualnych apozycji
    blockItems.forEach(element => {
      actual_positions.push(element.blockPosition);
      console.log('Przepisana lista Aktualna kolejność', element.blockPosition);
    });

    let flag: number;

    for (let index = 0; index < correct_positions.length; index++) {
      if (correct_positions[index] !== actual_positions[index]) {
        flag = 1;
      }
    }
    if (flag !== 1) {
      return true;
    } else {
      return false;
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    console.log(this.compare(this.blockItems));
    if (this.compare(this.blockItems) === true) {
      this.alertifyService.success(
        'Elementy zostały ułożone w poprawnej kolejności'
      );
      this.setTrue = true;
      this.mark = 'Bardzo dobry';
      this.percentage = 100;
      // this.point = 10;
      this.totalPoint = this.point;
      this.updateExperience();
      this.answerHistory();
    } else {
      this.setTrue = false;
    }
  }
  async updateExperience() {
    this.createUpdateExperienceForm();
    this.exp_id = +localStorage.getItem('courseId');
    this.experienceForUpdate = Object.assign(
      {},
      this.updateExperienceForm.value
    );
    this.examService
      .updateExperience(this.exp_id, this.experienceForUpdate)
      .subscribe(
        () => {
          this.alertifyService.success(
            'Otrzymałeś ' +
              this.experienceForUpdate.experiencePoints +
              ' punktów doświadczenia'
          );
        },
        error => {
          this.alertifyService.error(error);
        }
      );
  }
  answerHistory() {
    this.createAddExamResultForm();
    this.resultForUpdate = Object.assign({}, this.addForm.value);
    this.examResultService.addExamResult(this.resultForUpdate).subscribe(
      () => {
        this.alertifyService.success('Wynik został zapisany ');
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
}
