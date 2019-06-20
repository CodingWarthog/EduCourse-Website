import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ExamResult } from '../_models/exam_result/examResult';
import { Flashcard } from '../_models/flashcard/flashcard';
import { Question } from '../_models/question/question';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { ExamService } from '../_services/exam.service';
import { ExamresultService } from '../_services/examresult.service';
import { Experience } from '../_models/experience/experience';
import { Course } from '../_models/course';
import { Button } from 'protractor';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { startWith } from 'rxjs/internal/operators/startWith';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit, OnDestroy {
  // common use
  flashcardList: Flashcard[];
  i: any = 0;
  counter: any = 0;
  id: number;
  private sub: any;
  answer: Question[];
  questionForExams: any = {};
  qfe: Question[];
  answerForm: FormGroup;
  addForm: FormGroup;
  updateExperienceForm: FormGroup;
  question1: any;
  ans: any;
  checkIfMulti: boolean;
  selected_value: any;
  result: ExamResult;
  // answer saving
  correctAnswer = 0;
  mistakeAnswer = 0;
  examResult: number;
  examResultVerdict: string;
  questionId: number;
  totalPoints = 0;
  percentageResult: number;
  terminateExam = false;
  // badge
  userId: number;
  badgeId: number;
  categoryId: string;
  categoryIdhelper: number;
  examId: number;
  courseId: string;
  assignment: any;
  experience: number;
  badgeExperience: number;
  examName: string;

  experienceArray: Experience[];
  courseArray: Course[];
  answerArray: any = [];
  experienceForUpdate: Experience;

  points: number;
  exp_points: number;
  exp_id: number;
  answerPoints: string;

  // keyboard binding
  jeden = {
    'background-color': 'white'
  };
  dwa = {
    'background-color': 'white'
  };
  trzy = {
    'background-color': 'white'
  };
  cztery = {
    'background-color': 'white'
  };
  enter = {
    'background-color': 'green'
  };
  flag = 0;
  // timing
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
  timeleftHolder: number;

  myTimer: any;
  jebanyCzas = false;
  flaga: any;
  private reset$ = new Subject();
  timer$: Observable<any>;
  subscription: Subscription;
  time: number;
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
  ) {
    this.timer$ = this.reset$.pipe(
      startWith(0),
      switchMap(() => timer(0, 30000))
    );
  }

  @ViewChild('jeden')
  private jedenElement;

  ngOnInit() {
    this.getParameterFromRoute();
    this.getQuestions();
    this.createAnswerForm();
    this.createAddExamResultForm();
    this.createUpdateExperienceForm();
    this.startTimer();

    // this.startTimer();
    // console.log('ngoninit');
    // console.log();
    // this.getCategoryOfExam();
    // this.getUserExperienceCurrentCategory();
  }
  createAnswerForm() {
    this.answerForm = this.fb.group({ answer: [''] });
    console.log('createAnswerForm');
  }
  createAddExamResultForm() {
    this.addForm = this.fb.group({
      mark: [this.examResultVerdict],
      points: [this.correctAnswer],
      totalExamPoints: [this.points],
      percentage: [+this.percentageResult],
      examName: [this.examName],
      ExamId: [this.id],
      userId: [this.authService.decodedToken.nameid]
    });
  }
  // refreshTimer(): void {
  //   this.reset$.next(void 0);
  // }
  // myFn() {
  //   this.flag = 2;
  //   return this.flag;
  // }
  // waitHelper() {
  //   clearInterval(this.myTimer);
  //   this.myTimer = setInterval(this.myFn, 4000);
  //   console.log(this.flag);

  // }
  // delay(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }
  handleKeyEvent(event, value, value2) {

    localStorage.removeItem('flaga');

    // this.waitHelper();

    console.log('Event (%s): %s', event.type, value);
      if (value === '1') {
        this.jeden = { 'background-color': 'lime' };
        this.dwa = { 'background-color': 'white' };
        this.trzy = { 'background-color': 'white' };
        this.cztery = { 'background-color': 'white' };
      } else if (value === '2') {
        this.jeden = { 'background-color': 'white' };
        this.dwa = { 'background-color': 'lime' };
        this.trzy = { 'background-color': 'white' };
        this.cztery = { 'background-color': 'white' };
      } else if (value === '3') {
        this.jeden = { 'background-color': 'white' };
        this.dwa = { 'background-color': 'white' };
        this.trzy = { 'background-color': 'lime' };
        this.cztery = { 'background-color': 'white' };
      } else if (value === '4') {
        this.jeden = { 'background-color': 'white' };
        this.dwa = { 'background-color': 'white' };
        this.trzy = { 'background-color': 'white' };
        this.cztery = { 'background-color': 'lime' };
      } else if (value === 'Enter') {
        this.enter = { 'background-color': 'orange' };
        this.iterate();
        this.enter = { 'background-color': 'green' };
      }
      // console.log(this.flag);
      this.selected_value = value2;
      // console.log(this.flag);
      // this.flaga = localStorage.getItem('flaga');
      // console.log(this.flaga, 'flaga do kurwy jasnej');

    // console.log(this.flag);
    // if (this.flaga === '2') {
    //   this.iterate();
    //   console.log(this.flag, 'kurwa jestem a nie działam');
    // }

    event.preventDefault();
  }
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        // this.seconds = this.timeLeft % 60;
        console.log(this.timeLeft, 'czas');
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
          console.log(this.timeLeft, 'czas');
        } else if (this.timeLeft <= 0) {
          this.answerHistory();
          this.seconds = 0;
        } else {
          this.seconds = 60;
        }

        console.log(this.minutes, 'minuty');
        console.log(this.timeLeft, 'timeleft');
        console.log(this.timeleftHolder, 'timeleftHolder');
        const timeDiff = this.timeleftHolder - this.timeLeft;
        console.log(timeDiff, 'diff');
        // if (timeDiff % 15 === 0) {
        //   this.iterate();
        // }
      }
    }, 1000);
  }
  createUpdateExperienceForm() {
    this.updateExperienceForm = this.fb.group({
      experiencePoints: [+localStorage.getItem('correctAnswer')],
      userId: [this.authService.decodedToken.nameid],
      categoryId: [+localStorage.getItem('categoryId')]
    });
    // console.log(this.correctAnswer);
    // console.log(this.authService.decodedToken.nameid);
    // console.log(+localStorage.getItem('categoryId'));
  }
  getQuestions() {
    // this.getCategoryOfExam();

    this.examService.getAllExams(this.id).subscribe(
      result => {
        this.qfe = result['question'];
        this.courseId = result['courseId'];
        this.examName = result['name'];
        // this.getCategoryOfExam(this.courseId);
        // console.log('inside get questions');
        // console.log(this.courseId);
        localStorage.setItem('courseId', this.courseId);
        const arr = [];
        result['question'].forEach(flashcardLists => arr.push(flashcardLists));
        // console.log('tablica pytania' + arr);
        // console.log('konkretne pytanie' + arr[0]);
        const custom_arr = arr[this.i];
        this.questionForExams = custom_arr;
        this.counter = arr.length;
        this.totalPoints = arr.length;
        this.alertifyService.success('Załadowano pytania');
        console.log('inside question 2');
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
  iterate() {
    if (this.terminateExam === true) {
      // console.log('test zakonczony');
      this.answerHistory();
      //  console.log(this.correctAnswer, this.mistakeAnswer, this.totalPoints);
      this.i = 0;
      this.router.navigate(['/exam']);
    }

    this.ans = Object.assign({}, this.answerForm.value);
    if (
      this.questionForExams.answer === this.ans.answer ||
      this.questionForExams.answer === this.selected_value
    ) {
      this.answerArray.push('Poprawna odpowiedż');
      // console.log('tablica wynikow' + this.answerArray);
      this.alertifyService.success('Poprawna odpowiedz');
      this.correctAnswer++;
    } else {
      this.answerArray.push('Błędna odpowiedż');
      this.alertifyService.warning('Błędna odpowiedż');
      this.mistakeAnswer++;
    }
    if (this.i < this.counter - 1) {
      this.i++;
      this.ngOnInit();
    } else {
      this.setMark();

      //  console.log('test zakonczony');
      this.createAddExamResultForm();
      this.answerPoints = this.correctAnswer.toString();
      localStorage.setItem('correctAnswer', this.answerPoints);
      this.answerHistory();
      //  console.log(this.correctAnswer, this.mistakeAnswer, this.totalPoints);
      this.i = 0;
      // this.router.navigate(['/users']);
      this.ngOnInit();
    }
  }
  deiterate() {
    // console.log(this.counter + 'licznik');
    // console.log(this.i + 'iterator');
    if (this.i <= 0) {
      this.i = this.counter - 1;
      this.ngOnInit();
    } else {
      this.i--;
      this.ngOnInit();
    }
  }
  getParameterFromRoute() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.points = +params['total'];
      this.time = +params['time'];
      this.timeLeft = this.time * 60;
      this.timeleftHolder = this.timeLeft;
      this.seconds = this.timeLeft % 60;
      localStorage.setItem('points', this.points.toString());
      console.log(this.points);
    });
  }


  getAnswer(value) {
    console.log(value);
    console.log(this.questionForExams.answer);
    this.selected_value = value;
  }
  isTestSelector() {
    if (this.questionForExams.optionOne === '') {
      // console.log('to jest puste');
      return false;
    } else if (this.questionForExams.optionOne !== '') {
      // console.log(this.questionForExams.optionOne);
      // console.log('to nie jest puste');
      return true;
    }
  }
  answerHistory() {
    this.setMark();
    this.createAddExamResultForm();
    this.result = Object.assign({}, this.addForm.value);
    this.examResultService.addExamResult(this.result).subscribe(
      () => {
        this.alertifyService.success('Wynik został zapisany ');
        this.terminateExam = true;
        // this.getCategoryOfExam();
        // this.router.navigate(['/users']);
      },
      error => {
        this.alertifyService.error(error);
      }
    );
    this.updateExperience();
  }
  examTermination() {
    this.terminateExam = true;
  }
  setMark() {
    this.percentageResult = this.correctAnswer / this.totalPoints;
    console.log('percentage' + this.percentageResult);
    if (this.percentageResult > 0.9) {
      this.examResultVerdict = 'Bardzo dobry';
    } else if (this.percentageResult > 0.75 && this.percentageResult <= 0.9) {
      this.examResultVerdict = 'Dobry';
    } else if (this.percentageResult >= 0.5 && this.percentageResult <= 0.75) {
      this.examResultVerdict = 'Dostateczny';
    } else if (this.percentageResult < 0.5) {
      this.examResultVerdict = 'Niedostateczny';
    }
    this.percentageResult = +this.percentageResult * 100;
    console.log(this.points);
  }
  // getCategoryOfExam() {
  //   console.log('getCategoryOfExam : course id');
  //   const courseId = +localStorage.getItem('courseId');
  //   console.log(courseId);

  //   this.examService.getCategoryOfExam(courseId).subscribe(
  //     result => {
  //       this.courseArray = result['id'];
  //       this.categoryId = result['categoryId'];
  //       localStorage.setItem('categoryId', this.categoryId);
  //       this.alertifyService.success('uzyskano id kategorii');
  //       console.log('getCategoryOfExam : category id');
  //       console.log(this.categoryId);
  //     },
  //     error => {
  //       this.alertifyService.error('error');
  //     }
  //   );
  // }
  // assignBadge() {
  //   this.getBadgesWithExperienceByCategory();
  //   if (this.experience >= this.badgeExperience) {
  //     this.examService.assignBadge(this.assignment).subscribe(
  //       () => {
  //         this.alertifyService.success('Otrzymałeś nową odznakę ');
  //       },
  //       error => {
  //         this.alertifyService.error(error);
  //       }
  //     );
  //   }
  // }
  // async getUserExperienceCurrentCategory() {
  //   this.categoryIdhelper = +localStorage.getItem('categoryId');
  //   this.userId = this.authService.decodedToken.nameid;
  //   this.examService
  //     .getUserExperienceByCategory(this.userId, this.categoryIdhelper)
  //     .subscribe(
  //       result => {
  //         this.exp_points = result['experiencePoints'];
  //         localStorage.setItem('experiencePoints', result['experiencePoints']);
  //         console.log(
  //           'obecne doswiadczenie' + localStorage.getItem('experiencePoints')
  //         );
  //         localStorage.setItem('experienceId', result['id']);
  //         console.log('Punkty doświadczenia : ' + result['experiencePoints']);
  //         this.alertifyService.success('Załadowano punkty doświadczenia');
  //       },
  //       error => {
  //         this.alertifyService.error(error);
  //       }
  //     );
  // }

  async updateExperience() {
    // this.getUserExperienceCurrentCategory();

    // const current_experience = +localStorage.getItem('experiencePoints');
    // console.log('obecne doswiadczenie' + current_experience);
    // const experience_win = +localStorage.getItem('correctAnswer');
    // console.log('uzyskane doswiadczenie' + experience_win);
    // const experience_to_add = current_experience + experience_win;
    // console.log('doswiadczenie ktore zostanie dodane' + experience_to_add);
    // const experience_string = experience_to_add.toString();
    // localStorage.setItem('exp_to_add', experience_string);

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
              'doświadczenia'
          );
        },
        error => {
          this.alertifyService.error(error);
        }
      );
  }
  // getBadgesWithExperienceByCategory() {
  //   this.categoryIdhelper = +localStorage.getItem('categoryId');
  //   this.examService
  //     .getAllBadgesWithExperienceByCategory(this.categoryIdhelper)
  //     .subscribe(
  //       result => {
  //         this.courseArray = result[''];
  //         // this.categoryId = result['categoryId'];
  //         this.alertifyService.success('uzyskano id kategorii');
  //         console.log();
  //       },
  //       error => {
  //         this.alertifyService.error(error);
  //       }
  //     );
  // }
  ngOnDestroy(): void {

    clearInterval(this.interval);
  }
}
