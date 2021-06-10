import {Component, Input, OnInit} from '@angular/core';
import {PostService, UserService} from '@core/_services';
import {IUser} from '@shared/models';
import {map} from 'rxjs/operators';
import {DialogService} from '@features/dialog/dialog.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {
  isLiked = false;
  curUser: IUser = this.userSr.getCurrentUser();
  @Input() postID = '';
  @Input() Likes: string[] = [];

  constructor(
    private postSr: PostService,
    private userSr: UserService,
    private dialogSr: DialogService
  ) {
  }

  ngOnInit(): void {
    this.isLiked = this.Likes.includes(this.curUser._id) as boolean;
  }

  /*
  *   Like & Unlike
  * */
  likeThisPost(): void {
    this.isLiked = !this.isLiked;
    this.postSr.likePost(this.postID).subscribe(
      (_: any) => {
        this.Likes.push(this.curUser._id);
      }
    );
  }

  unlikeThisPost(): void {
    this.isLiked = !this.isLiked;
    this.postSr.unlikePost(this.postID).subscribe(
      (_: any) => {
        this.Likes = this.Likes.filter(ele => ele !== this.curUser?._id);
      }
    );
  }


  /*
    View User Like Post
  */

  /*
    Dialog view users like post
  */
  viewUsersLikePost(): void {
    this.dialogSr.openInfoDialog('Likes', this.postSr.getUsersLikePost(this.postID)).pipe(
      map((el: any) => {
        if (el) {
          this.userSr.updateNewUser();
          return true;
        }
        return false;
      })
    ).subscribe(
      (res: any) => {
        if (res) {
          this.ngOnInit();
        }
      }
    );
  }
}
