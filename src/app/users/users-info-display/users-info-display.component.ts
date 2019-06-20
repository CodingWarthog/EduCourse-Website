import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-users-info-display',
  templateUrl: './users-info-display.component.html',
  styleUrls: ['./users-info-display.component.scss']
})
export class UsersInfoDisplayComponent implements OnInit {
  users: any = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUser();
  }
  getUser() {
    this.userService
      .getUser(this.authService.decodedToken.nameid)
      .subscribe(data => {
        this.users.push(data);
        console.log(this.users);
        this.alertifyService.success('Informacje użytkownika');
        this.router.navigate(['/users']);
      });
  }
}
