import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { UserService } from '../_services/user.service';
import { Overall } from '../_models/user_model/overall.model';
import { Mark } from '../_models/user_model/mark.model';
import { Personal } from '../_models/user_model/personal.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  overallStatistic: Overall;
  markStatistic: Mark;
  personalStatistics: Personal;

  registerMode = false;
  statisticSelector = false;
  //  charts type
  BarChart = 'BarChart';
  Pie = 'PieChart';
  ColumnChart = 'ColumnChart';
  // charts titles
  statitistiCourse = 'Informacje ogólne';
  myOptions = {
    // colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    is3D: true
  };

  LineChart: any = [];

  myData = [];
  overall_statistics_data = [];
  personalData = [];
  selected = 'option2';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getOverallStatistics().subscribe(result => {
      this.overallStatistic = result;
      console.log(this.overallStatistic.numberOfCourse);
      // console.log(result.numberOfCourse);
      this.overall_statistics_data = [
        ['Liczba  kursów', this.overallStatistic.numberOfCourse],
        ['Liczba  egzaminów', this.overallStatistic.numberOfExams],
        ['Liczba  Zestawów fiszek', this.overallStatistic.numberOfSets],
        ['Liczba  materiałów', this.overallStatistic.numberOfEMaterials],
        [
          'Liczba  użytkowników',
          this.overallStatistic.numberOfERegisteredUsers
        ],
        ['Liczba  kategorii', this.overallStatistic.numberOfCategory],
        ['Liczba  odznak', this.overallStatistic.numberOfBadges]
      ];
      this.mark();
      this.coursesByCategoryList();
    });
  }
  mark() {
    this.userService
      .getMarkStatistics(this.authService.decodedToken.nameid)
      .subscribe(wynik => {
        this.markStatistic = wynik;
        console.log(wynik);
        this.myData = [
          ['Liczba ocen pozytywnych', this.markStatistic.numberOfNegativeMarks],
          ['Liczba ocen negatywnych', this.markStatistic.numberOfPositiveMarks]
        ];
      });
  }
  coursesByCategoryList() {
    this.userService
      .getPersonalData(this.authService.decodedToken.nameid)
      .subscribe(wynik => {
        console.log(wynik);
        this.personalStatistics = wynik;
        this.personalData = [
          [
            'Zapisane kursy',
            this.personalStatistics.numberOfEnrolmentCourses
          ],
          [
            'Zapisane egzaminy',
            this.personalStatistics.numberOfEnrolmentExams
          ],
          [
            'Dodane materiały',
            this.personalStatistics.numberOfAddedMaterials
          ],
          [
            'Dodane kursy',
            this.personalStatistics.numberOfAddedCourses
          ],
          [
            'Zdobyte odznaki',
            this.personalStatistics.numberOfAssignedBadges
          ]
        ];
      });
  }
  registerToggle() {
    this.registerMode = true;
  }
  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logOut() {
    localStorage.removeItem('token');
    this.alertify.message('Zostałeś wylogowany');
    this.router.navigate(['/home']);
  }
  selectChartStatistics() {
    this.statisticSelector = true;
  }
  selectTableStatistics() {
    this.statisticSelector = false;
  }
}
