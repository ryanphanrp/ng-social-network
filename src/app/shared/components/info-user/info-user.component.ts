import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {IUser} from '@shared/models';
import {UserService} from '@core/_services/user.service';
import {AuthService} from '@core/_services/auth.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {DialogService} from '@features/dialog/dialog.service';
import {MessengerService} from '@core/_services';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {
  curUser!: IUser;
  isMe = true;
  isFollowed = false;
  username = '';
  thisUser!: IUser;
  isProfilePage = false;
  postsOfUser!: Observable<number>;
  @Input() showCounting = false;

  // Config dimensions for avatar
  avatars = {
    home: {
      'width.px': 80,
      'height.px': 80
    },
    profile: {
      'width.px': 160,
      'height.px': 160
    }
  };

  constructor(
    private router: Router,
    private userSr: UserService,
    private dialogSr: DialogService,
    public messengerSr: MessengerService,
    private cdRef: ChangeDetectorRef,
    private authSr: AuthService) {
    userSr.getCurrentUser().subscribe(res => {
      this.curUser = res;
      console.log('flag info');
      this.initialUser();
      this.updateThisUser();
    });
  }

  @Input() set profileUser(user: IUser) {
    this.isProfilePage = true;
    if (user.username === this.curUser.username) {
      this.isMe = true;
      console.log(this.isMe);
      this.thisUser = {...this.curUser};
      this.cdRef.markForCheck();
    } else if (!!user && (user.username !== this.thisUser.username)) {
      this.initialThisUser(user);
    }
  }

  ngOnInit(): void {
  }

  updateThisUser(): void {
    if (!!this.thisUser.username && (this.thisUser.username !== this.curUser.username)) {
      console.log('hahaha');
      this.userSr.getInfoUser(this.thisUser.username).subscribe(
        (res: IUser) => {
          this.initialThisUser(res);
        }
      );
    }
  }

  initialThisUser(user: IUser): void {
    console.log('Difference User from current user.');
    this.thisUser = user;
    this.isMe = false;
    this.postsOfUser = this.userSr.getNumberPostsUser(this.thisUser?.username);
    this.isFollowed = this.thisUser?.followers?.includes(this.curUser?._id) as boolean;
    this.cdRef.markForCheck();
  }

  initialUser(): void {
    console.log('flag init');
    if (!this.thisUser || this.thisUser.username === this.curUser.username || !this.isProfilePage) {
      this.thisUser = {...this.curUser};
    }
    this.username = this.thisUser?.username;
    this.postsOfUser = this.userSr.getNumberPostsUser(this.thisUser?.username);
  }

  /* Navigate */
  navigateThisUser(): void {
    this.router.navigate(['profile', this.thisUser?.username]).then(_ => {
    });
  }

  /* Follow */
  followThisUser(): void {
    this.userSr.followUser(this.thisUser?._id).subscribe(
      (_: any) => {
        this.isFollowed = true;
        this.thisUser.followers?.push(this.curUser?._id);
        this.curUser.following?.push(this.thisUser?._id);
        this.userSr.updateCurrentUser();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /* Unfollow */
  unfollowThisUser(): void {
    this.userSr.unfollowUser(this.thisUser?._id).subscribe(
      (_: any) => {
        this.isFollowed = false;
        this.thisUser.followers = this.thisUser.followers?.filter(ele => ele !== this.curUser?._id);
        this.curUser.following = this.curUser?.following?.filter(ele => ele !== this.thisUser?._id);
        this.userSr.updateCurrentUser();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  /* Verify */
  verifyAccount(): void {
    this.authSr.requestVerify(this.curUser.email).subscribe(
      (_: any) => {
        this.dialogSr.success('Please check your mail to verify account');
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  /**
   * Show list following & followers
   */
  getFollowing(): void {
    this.dialogSr.openInfoDialog('Following', this.userSr.getFollowing(this.thisUser.username)).subscribe(
      (res: boolean) => {
        if (res) {
          this.userSr.updateCurrentUser();
        }
      }
    );
  }

  getFollowers(): void {
    this.dialogSr.openInfoDialog('Followers', this.userSr.getFollowers(this.thisUser.username)).subscribe(
      (res: boolean) => {
        if (res) {
          this.userSr.updateCurrentUser();
        }
      }
    );
  }
}

