import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {enterAnimations, IComment, IOwner, parseIOwner} from '@shared/models';
import {UserService} from '@core/_services/user.service';
import {PostService} from '@core/_services/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: enterAnimations
})
export class CommentComponent implements OnInit {

  @Input() postID = '';
  @Output() commentPost = new EventEmitter<IComment>();

  content = '';
  owner: IOwner = parseIOwner(this.userService.currentUser);

  constructor(private postServices: PostService,
              private userService: UserService) {
  }

  ngOnInit(): void {
  }

  /*
    Send comment to API by post id
  */
  sendComment(): void {
    if (!!this.content) {
      this.postServices.commentOnPost(this.content, this.postID).subscribe(
        (_: any) => {
          this.commentPost.emit({
            text: this.content,
            postedBy: this.owner
          });
          this.content = '';
        }
      );
    }
  }
}
