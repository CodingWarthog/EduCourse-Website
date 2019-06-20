import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSubscription: Subscription;
  @Output() closeSidenav = new EventEmitter<void>();
  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) {}

  ngOnInit() {}
  onClose() {
    this.closeSidenav.emit();
  }
  onLogout() {
    this.onClose();
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
  logOut() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
}
