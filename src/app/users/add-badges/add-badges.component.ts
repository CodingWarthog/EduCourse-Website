import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Category } from 'src/app/_models/category/category.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/_services/course.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Badges } from 'src/app/_models/badges/badges';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { BadgeToCreate } from 'src/app/_models/badges/badgeToCreate.model';

@Component({
  selector: 'app-add-badges',
  templateUrl: './add-badges.component.html',
  styleUrls: ['./add-badges.component.scss']
})
export class AddBadgesComponent implements OnInit {
  public response: { dbPath: '' };

  public name: string;
  public experiencePoints: number;
  public description: string;
  public image: string;
  public categoryid: number;
  public isCreate: boolean;
  public badge: BadgeToCreate;

  checked = false;

  dataSource = new MatTableDataSource();
  badges: Badges[];
  category: Category[];
  badgesForAdd: Badges;
  showSpinner = true;
  displayedColumns = [
    'name',
    'experiencePoints',
    'description',
    'image',
    'delete'
  ];
  selected = 'option2';
  addBadgeForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private courseService: CourseService,
    private alertifyService: AlertifyService,
    private http: HttpClient
  ) {}

  public uploadFinished = event => {
    this.response = event;
  }
  public createImgPath = (serverPath: string) => {
    return `http://educourseapi.azurewebsites.net/${serverPath}`;
  }
  ngOnInit() {
    this.checked = false;
    this.isCreate = true;
    // this.createAddCourseForm();
    this.courseService.getCategory().subscribe(result => {
      this.category = result;
      console.log(this.category);
    });
    this.courseService.getBadges().subscribe(result => {
      this.badges = result;
      console.log(this.badges);
      this.dataSource = new MatTableDataSource(this.badges);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addBadgeNew() {
    console.log(this.checked);
    if (this.checked === false) {
      this.onCreate();
    } else {
      this.onCreateUrl();
    }
  }

  // createAddCourseForm() {
  //   this.addBadgeForm = this.fb.group({
  //     name: [''],
  //     experiencePoints: [''],
  //     description: [''],
  //     image: [''],
  //     categoryid: ['']
  //   });
  // }
  public onCreate = () => {
    this.badge = {
      name: this.name,
      experiencePoints: this.experiencePoints,
      description: this.description,
      image: this.response.dbPath,
      categoryId: this.categoryid
    };
    this.http
      .post('http://educourseapi.azurewebsites.net/api/badges', this.badge)
      .subscribe(res => {
        // this.getUsers();
        this.isCreate = false;
      });
  }
  public onCreateUrl = () => {
    this.badge = {
      name: this.name,
      experiencePoints: this.experiencePoints,
      description: this.description,
      image: this.image,
      categoryId: this.categoryid
    };
    this.http
      .post('http://educourseapi.azurewebsites.net/api/badges', this.badge)
      .subscribe(res => {
        // this.getUsers();
        this.isCreate = false;
      });
  }
  addCourse() {
    if (this.addBadgeForm.valid) {
      this.badgesForAdd = Object.assign({}, this.addBadgeForm.value);
      this.courseService.addBadge(this.badgesForAdd).subscribe(
        () => {
          this.alertifyService.success('Odznaka została utworzona');
          this.addBadgeForm.reset();
          this.ngOnInit();
        },
        error => {
          this.alertifyService.error(error);
        }
      );
    }
  }
  deleteBadge(row) {
    const category_id = row.id;
    console.log(category_id);
    console.log(row);
    this.courseService.deleteBadge(category_id).subscribe(
      () => {
        this.alertifyService.success('Odznaka została usunieta');
        this.ngOnInit();
        // this.router.navigate(['/users']);
      },
      error => {
        this.alertifyService.error(error);
      }
    );
  }
  contain(imagePath: string) {
    if (imagePath.includes('http')) {
      return true;
    } else {
      return false;
    }
  }
}
