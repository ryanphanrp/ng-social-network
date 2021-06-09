import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IComment, IPost, IUser} from '@shared/models';
import {DialogService} from '@features/dialog/dialog.service';
import {UserService} from '@core/_services/user.service';
import {PostService} from '@core/_services/post.service';
import {NewPostService} from '@features/post/new-post.service';

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss']
})
export class CardPostComponent implements OnInit {
  data!: IPost;
  curUser: IUser = this.userSr.getCurrentUser();
  isLiked = false;
  @Output() isDeleted = new EventEmitter<string>();
  hashtagList: string[] = [];
  @Input() option = true;

  constructor(
    private userSr: UserService,
    private postSr: PostService,
    private dialogSr: DialogService,
    public newPost: NewPostService,
    private cdRef: ChangeDetectorRef
  ) {
  }

  @Input() set setData(value: any) {
    if (!!value) {
      this.data = value;
      this.initElement();
    }
  }

  ngOnInit(): void {
    this.initElement();
  }

  initElement(): void {
    this.isLiked = this.data?.likes.includes(this.curUser._id);
    this.hashtagList = this.data.hashtag?.split('-').map(ele => '#' + ele) || [];
    this.cdRef.markForCheck();
  }


  /*
   * Update list comment
   */
  updateListComment(comment: IComment): void {
    this.data.comments?.push(comment);
  }

  /*
  * Delete this post
  * */
  deleteThisPost(): void {
    this.dialogSr.openConfirmDialog('Confirm', 'Are you sure delete this post?').afterClosed().subscribe(
      (cfm: any) => {
        if (cfm) {
          this.isDeleted.emit(this.data?._id);
        }
      }
    );
  }
}
