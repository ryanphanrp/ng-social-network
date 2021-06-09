import {Component, OnInit} from '@angular/core';
import {IUser} from '@shared/models';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '@core/_services/user.service';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-profile-sider',
  templateUrl: './profile-sider.component.html',
  styleUrls: ['./profile-sider.component.scss']
})
export class ProfileSiderComponent implements OnInit {
  user!: IUser;

  constructor(private activatedRoute: ActivatedRoute,
              private userSr: UserService) {
  }

  ngOnInit(): void {
    console.log('Profile Sider was called.');
    this.activatedRoute.paramMap.pipe(
      map(prams => prams.get('username') as string),
      switchMap(ele => this.userSr.getInfoUser(ele))
    ).subscribe(
      next => {
        this.user = next;
      },
      error => {
        console.log(error.error.message);
      }
    );
  }

}
