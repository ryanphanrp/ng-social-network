import {Component, Inject, OnInit, Optional} from '@angular/core';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogService} from '@features/dialog/dialog.service';
import {IPost, IUser} from '@shared/models';
import {UserService} from '@core/_services/user.service';
import {PostService} from '@core/_services/post.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  post!: IPost;
  hashtags = '';
  photos: string[] = [];
  imgList: File[] = [];
  currentUser!: IUser;
  isLoading = false;
  isSuccess = false;

  constructor(
    public dialogRef: MatDialogRef<EditPostComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Observable<IPost>,
    private userService: UserService,
    private dialogSr: DialogService,
    private postSr: PostService) {
  }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    this.data.subscribe(res => {
      this.post = res;
    });
  }


  handleHashTag(hashtags: string[]): void {
    this.post.hashtag = hashtags?.join('-');
  }

  isValidForm(): boolean {
    return !!this.post.content && !!this.post.hashtag && !!this.post?.images?.length;
  }

  isEmpty(): boolean {
    return !this.post.content && !this.post.hashtag && !this.post?.images?.length;
  }

  getImage(img: File[]): void {
    console.log(img);
    this.post.images = [...img];
  }

  onSubmit(): void {
    this.isLoading = true;
    this.isSuccess = true;
    const formData: FormData = new FormData();
    formData.append('content', this.post.content);
    formData.append('hashtag', this.post.hashtag as string);
    for (const img of this.post.images as File[]) {
      formData.append('photo', img);
    }

    this.postSr.editPost(this.post._id, formData).subscribe(
      (event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            break;
          case HttpEventType.Response:
            this.dialogSr.success('This post has been updated successfully!');
            this.isLoading = false;
            this.dialogRef.close(true);
        }
      },
      (__: any) => {
        this.dialogSr.error('Something went wrong.');
      }
    );
  }
}
