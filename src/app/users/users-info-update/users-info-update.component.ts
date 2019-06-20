import {
  Component,
  OnInit,
  HostListener
} from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User } from 'src/app/_models/user_model/user_model';

@Component({
  selector: 'app-users-info-update',
  templateUrl: './users-info-update.component.html',
  styleUrls: ['./users-info-update.component.scss']
})
export class UsersInfoUpdateComponent implements OnInit {
  users: User;
  userData: User;
  updateForm: FormGroup;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.updateForm.dirty) {
      this.alertify.error('Nie zapisałeś zmian');
    }
  }
  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    public userService: UserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.createUpdateForm();
    this.getUser();
  }
  createUpdateForm() {
    this.updateForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  updateUserInfo() {
    this.users = Object.assign({}, this.updateForm.value);
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.users)
      .subscribe(
        () => {
          this.alertify.success('Dane zostały zaktualizowane');
          this.router.navigate(['/users']);
        },
        error => {
          this.alertify.error(error);
        }
      );
  }
  getUser() {
    this.userService
      .getUser(this.authService.decodedToken.nameid)
      .subscribe(data => {
        this.userData = data;
        console.log(this.userData, 'to jet to');
      });
  }

}
