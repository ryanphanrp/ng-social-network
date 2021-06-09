import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {AuthService, UserService} from '@core/_services';
import {DialogService} from '@features/dialog/dialog.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {
  token = '';

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authSr: AuthService,
              private userSr: UserService,
              private dialogSr: DialogService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(ele => ele.get('token') as string),
      switchMap(token => this.authSr.verifyAccount(token))
    ).subscribe(
      (_: any) => {
        this.userSr.updateCurrentUser();
        this.dialogSr.success('Your account has been verified successfully.');
        this.router.navigate(['']).then((__: any) => {
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
