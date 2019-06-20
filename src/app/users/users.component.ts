import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  currentRole: string;
  // background = 'primary';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentRole = this.authService.isAdmin();

  }

}
