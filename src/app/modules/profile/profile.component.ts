import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IUser} from '@shared/models';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {UserService} from '@core/_services';
import {NewPostService} from '@features/post/new-post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!: IUser;
  success = false;
  isMe = true;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private newPost: NewPostService,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      map(prams => prams.get('username') as string),
      switchMap(ele => this.userService.getInfoUser(ele))
    ).subscribe(
      (next: IUser) => {
        this.user = next;
        this.isMe = next.username === this.userService.currentUser.username;
      },
      (error: any) => {
        console.log('loi roi');
        console.log(error);
      }
    );
  }

  /*
  *   Dialog create new post
  * */
  openDialog(): void {
    this.newPost.openNewPostDialog().subscribe(
      res => {
        this.success = res;
        this.cdRef.markForCheck();
      }
    );
  }
}
