import { Component, OnInit, ViewChild } from '@angular/core';
import { Badges } from 'src/app/_models/badges/badges';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ExamService } from 'src/app/_services/exam.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-badges',
  templateUrl: './user-badges.component.html',
  styleUrls: ['./user-badges.component.scss']
})
export class UserBadgesComponent implements OnInit {
  dataSource = new MatTableDataSource();

  badges: Badges[];

  displayedColumns = ['icon', 'name', 'experiencePoints', 'description'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private examService: ExamService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.examService
      .getUserBadges(this.authService.decodedToken.nameid)
      .subscribe(result => {
        this.badges = result['badgeAssignment'];
        console.log(result);
        if (!result) {
          return;
        }
        this.dataSource = new MatTableDataSource(this.badges);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
