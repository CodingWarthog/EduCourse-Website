import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  model: any = {};
  showSpinner = false;
  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.showSpinner = true;
    this.authService.login(this.model).subscribe(
      next => {
        this.showSpinner = false;
        this.alertify.success('Zostałeś zalogowany');
      },
      error => {
        this.showSpinner = false;
        this.alertify.error(error);
      },
      () => {
        this.showSpinner = false;
        this.router.navigate(['/home']);
      }
    );
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logOut() {
    localStorage.removeItem('token');
    this.alertify.message('Zostałeś wylogowany');
    this.router.navigate(['/home']);
  }
}
