import {Component, Inject, OnInit, Optional} from '@angular/core';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogService} from '@features/dialog/dialog.service';
import {UserService} from '@core/_services/user.service';
import {PostService} from '@core/_services/post.service';
import {IUser} from '@shared/models';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit  {

  content = '';
  hashtags = '';
  hashtagList: string[] = [];
  imgList: File[] = [];
  currentUser!: IUser;
  isLoading = false;
  isSuccess = false;

  constructor(
    public dialogRef: MatDialogRef<NewPostComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: boolean,
    private userService: UserService,
    private dialogSr: DialogService,
    private postSr: PostService) {
  }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
  }


  handleHashTag(hashtags: string[]): void {
    this.hashtags = hashtags.join('-');
  }

  isValidForm(): boolean {
    return !!this.content && !!this.hashtags && !!this.imgList.length;
  }

  isEmpty(): boolean {
    return !this.content && !this.hashtags && !this.imgList.length;
  }

  getImage(img: File[]): void {
    this.imgList = [...img];
  }

  submit(): void {
    this.isLoading = true;
    this.isSuccess = true;
    const formData: FormData = new FormData();
    formData.append('content', this.content);
    formData.append('hashtag', this.hashtags);
    for (const img of this.imgList) {
      formData.append('photo', img);
    }

    this.postSr.createPost(formData).subscribe(
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
            this.dialogSr.success('A new post has been created successfully!');
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
