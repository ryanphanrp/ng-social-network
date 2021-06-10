import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {IPost, IUser} from '@shared/models';
import {PostService, UserService} from '@core/_services';
import {NewPostComponent} from '@features/post/new-post/new-post.component';
import {NewPostService} from '@features/post/new-post.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {
  @ViewChild('newPostComponent') newPostComponent!: NewPostComponent;
  curUser!: IUser;
  mode = false;

  posts: IPost[] = [];
  pageNumber = 1;
  throttle = 60;
  distance = 2;
  selector = '.main';

  constructor(
    private userSr: UserService,
    private postSr: PostService,
    private newPost: NewPostService,
    private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.curUser = this.userSr.getCurrentUser();
    this.getPosts();
  }

  /*
  *   Dialog create new post
  * */
  openDialog(): void {
    this.newPost.openNewPostDialog().subscribe(
      (_: boolean) => {
        this.getPosts();
        this.cdRef.markForCheck();
      }
    );
  }

  // Change mode
  changeMode(): void {
    this.mode = !this.mode;
    if (this.mode) {
      this.getSubPost();
    } else {
      this.getPosts();
    }
    this.cdRef.markForCheck();
  }


  /*
  *   List post
  * */
  getPosts(): void {
    this.postSr.getAllPost().subscribe(
      (res: IPost[]) => this.posts = res
    );
  }

  getSubPost(): void {
    this.postSr.getSubPost().subscribe((res: IPost[]) => this.posts = res);
  }

  /*
    Handle Event Emitter
  */
  handleDeletePost(ID: string): void {
    this.postSr.deletePost(ID).subscribe(
      (_: any) => {
        this.posts = this.posts.filter(ele => ele._id !== ID);
      },
      (err: any) => {
        console.log(err.error.message);
      }
    );
  }

  handleEditPost(ID: string): void {
    this.postSr.getSinglePost(ID).subscribe(
      (res: IPost) => {
        this.posts = this.posts.map(
          ele => ele._id === ID ? res : ele
        );
      }
    );
  }

  onScroll(): void {
    console.log('Scrolled');
    this.pageNumber += 1;
    this.postSr.getAllPost(this.pageNumber).subscribe(
      (res: IPost[]) => this.posts = this.posts.concat(res)
    );
  }
}
