import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService, UserService} from '@core/_services';

@Component({
  selector: 'app-home-sider',
  templateUrl: './home-sider.component.html',
  styleUrls: ['./home-sider.component.scss']
})
export class HomeSiderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userSr: UserService,
    private router: Router) {
  }

  ngOnInit(): void {
  }

  logOut(): void {
    this.authService.logOut();
  }

  updateProfile(): void {
    const username = this.userSr.getCurrentUser().username;
    this.router.navigate(['profile', username, 'update']).then(r => {});
  }

}
