import { Pipe, PipeTransform } from '@angular/core';
import {UserService} from '@core/_services';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {IUser} from '@shared/models';

@Pipe({
  name: 'countedLikes',
  pure: false
})
export class CountedLikesPipe implements PipeTransform {
  curUser: IUser = this.userSr.getCurrentUser();
  friends: IUser[] = [];

  constructor(
    private userSr: UserService,
    private sanitizer: DomSanitizer) {
    this.userSr.getFriendList(this.curUser._id).subscribe(
      res => this.friends = res
    );
  }


  transform(value: string[], ...args: unknown[]): SafeHtml {
    const ME = this.curUser._id;
    const frs = [...value.filter(ele => this.curUser.following?.includes(ele))];
    const inMe: boolean = this.inMe(value, ME);
    const isFrs: string = this.haveFrs(value, frs);
    const others: number = this.numberOthers(value, frs, ME);
    let result: string;
    // If - else
    if (inMe && !!isFrs && !!others) {
      result = `Liked by <b>you</b>, <b>${isFrs}</b> and <b>${others}</b> others`;
    } else if (inMe && !isFrs && !others) {
      result = `Just <b>you</b> like this post.`;
    } else if (!inMe && !!isFrs && !others) {
      result = `Liked by <b>${isFrs}<b>.`;
    } else if (!inMe && !isFrs && !!others) {
      result = `Liked by <b>${others}</b> others.`;
    } else if (inMe && !!isFrs && !others) {
      result = `Liked by <b>you</b> and <b>${isFrs}</b>.`;
    } else if (inMe && !isFrs && !!others) {
      result = `Liked by <b>you</b> and <b>${others}</b> others.`;
    } else if (!inMe && !!isFrs && !!others) {
      result = `Liked by <b>${isFrs}</b> and <b>${others}</b> others.`;
    } else {
      result = 'Nobody like this post';
    }
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }

  inMe(value: string[], me: string): boolean {
    return value.includes(me);
  }

  haveFrs(value: string[], frs: string[]): string {
    const val =  value.filter(ele => frs.includes(ele)).pop();
    return !!val ? 'your friend' : '';
  }

  numberOthers(value: string[], frs: string[], me: string): number {
    let numberOthers = value.length;
    if (value.includes(me)) {
      numberOthers = numberOthers - 1;
    }
    if (!!frs.length) {
      numberOthers = numberOthers - 1;
    }
    return numberOthers;
  }

}

