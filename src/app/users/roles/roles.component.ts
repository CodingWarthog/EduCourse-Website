import { OnInit, ViewChild, Component} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ExamResult } from 'src/app/_models/exam_result/examResult';
import { ExamresultService } from 'src/app/_services/examresult.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user_model/user_model';
import { UserService } from 'src/app/_services/user.service';
import { Badges } from 'src/app/_models/badges/badges';
import { Category } from 'src/app/_models/category/category.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CourseService } from 'src/app/_services/course.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  dataSource = new MatTableDataSource();

  usersList: Array<any>;

  badges: Badges[];
  category: Category[];
  badgesForAdd: User;
  showSpinner = true;
  edit = false;
  selected = 'option2';
  addBadgeForm: FormGroup;

  displayedColumns = [
    'icon',
    'firstname',
    'lastname',
    'username',
    'role',
    'button'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createAddCourseForm();
    this.userService.getUsers().subscribe(result => {
      this.usersList = result;
      if (!result) {
        return;
      }
      this.dataSource = new MatTableDataSource(this.usersList);
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
    const exam_id = row.id;
    console.log(row);
    this.router.navigate(['/exam', exam_id]);
  }
  createAddCourseForm() {
    this.addBadgeForm = this.fb.group({
      role: ['']
    });
  }
  updateRole() {
    const userID = +localStorage.getItem('role_id');
    if (this.addBadgeForm.valid) {
      this.badgesForAdd = Object.assign({}, this.addBadgeForm.value);
      console.log(this.badgesForAdd);
      this.userService.updateRole(userID, this.badgesForAdd).subscribe(
        () => {
          // this.alertifyService.success('Odznaka została utworzona');
          this.addBadgeForm.reset();
          this.ngOnInit();
        },
        error => {
          // this.alertifyService.error(error);
        }
      );
    }
  }

  editRole(row) {
    const role_id = row.id;
    localStorage.setItem('role_id', role_id);
    console.log(role_id);
    console.log(row);
    this.edit = true;
  }
}
