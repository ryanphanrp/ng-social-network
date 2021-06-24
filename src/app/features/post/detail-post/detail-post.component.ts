import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DialogService} from '@features/dialog/dialog.service';
import {IComment, IPost, IUser, slideAnimation} from '@shared/models';
import {UserService} from '@core/_services/user.service';
import {PostService} from '@core/_services/post.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NewPostService} from '@features/post/new-post.service';
import {CarouselComponent, CommentComponent} from '../utils';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideAnimation]
})
export class DetailPostComponent implements OnInit {
  curUser: IUser = this.userSr.currentUser;
  isLiked = false;
  curIndex = 0;
  hashtagList: string[] = [];
  @ViewChild(CarouselComponent) carousel!: CarouselComponent;
  @ViewChild(CommentComponent) comment!: CommentComponent;

  constructor(public dialogRef: MatDialogRef<DetailPostComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IPost,
              private userSr: UserService,
              private dialogSr: DialogService,
              private postSr: PostService,
              private newPost: NewPostService,
              private cdRef: ChangeDetectorRef) {
  }

  // On Init
  ngOnInit(): void {
    this.isLiked = this.data.likes.includes(this.curUser._id);
    this.hashtagList = this.data.hashtag.split('-') as string[];
    this.handleBackdropClick();
  }

  // Handle Backdrop click
  handleBackdropClick(): void {
    this.dialogRef.backdropClick().subscribe(_ => {
      if (!!this.comment.content) {
        this.dialogSr.openConfirmDialog('Close', 'Are you sure close this dialog?').afterClosed().subscribe(
          (res: any) => {
            if (res) {
              this.dialogRef.close();
            }
          }
        );
      } else {
        this.dialogRef.close();
      }
    });
  }

  // Update post comments
  updateComments(event: IComment): void {
    this.data.comments?.push(event);
    this.cdRef.markForCheck();
    const element = document.getElementById('test') as HTMLElement;
    element.scrollTop = element.scrollHeight;
  }

  // Delete this post
  deleteThisPost(): void {
    this.dialogSr.openConfirmDialog('Confirm', 'Are you sure delete this post?').afterClosed().subscribe(
      (cfm: any) => {
        if (cfm) {
          this.deletePost();
        }
      }
    );
  }

  deletePost(): void {
    this.postSr.deletePost(this.data?._id).subscribe(
      (_: any) => {
        console.log('this post has been deleted.');
        this.dialogRef.close(true);
      }
    );
  }

  openEditPost(): void {
    this.dialogRef.close();
    this.newPost.openEditPostDialog(this.data._id).subscribe(
      (res: any) => {
        if (res) {
          this.postSr.getSinglePost(this.data._id).subscribe(
            (data: IPost) => {
              this.data = data;
            }
          );
        }
      }
    );
  }

}
