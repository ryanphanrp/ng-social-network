import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {IPost, IUser} from '@shared/models';
import {UserService} from '@core/_services/user.service';
import {DetailPostComponent} from '@features/post/detail-post/detail-post.component';
import {PostService} from '@core/_services/post.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  owner!: IUser;
  listPost: IPost[] = [];
  loading = true;
  @ViewChild(DetailPostComponent) detailCmp!: DetailPostComponent;

  constructor(
    private userService: UserService,
    private postSr: PostService,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog) {
  }

  @Input() set ownerListPost(owner: IUser) {
    if (!!owner) {
      console.log('Owner is valid.');
      this.owner = owner;
      this.getListPost();
    }
  }

  @Input() set updateListPost(value: boolean) {
    if (value) {
      this.getListPost();
      this.cdRef.markForCheck();
    }
  }

  ngOnInit(): void {
  }

  // Get list post of user
  getListPost(): void {
    this.userService.getPostsUser(this.owner?.username).subscribe(
      (next: IPost[]) => {
        this.listPost = next;
        this.loading = false;
        this.cdRef.markForCheck();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // Open Dialog Detail Post
  showDetailPost(ID: string): void {
    this.postSr.getSinglePost(ID).subscribe(
      (res: IPost) => {
        this.openDialog(res);
      }, (error: any) => console.log(error)
    );
  }

  openDialog(post: IPost): void {
    const dialogRef = this.dialog.open(DetailPostComponent, {
      disableClose: true,
      height: '40vw',
      minWidth: '65vw',
      panelClass: 'detail-post-dialog',
      data: post
    });
    dialogRef.afterClosed().subscribe(
      (_: any) => {
        this.getListPost();
      }
    );
  }
}

