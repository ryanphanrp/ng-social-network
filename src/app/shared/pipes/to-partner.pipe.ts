import { Pipe, PipeTransform } from '@angular/core';
import {UserService} from '@core/_services';
import {IUser} from '@shared/models';

@Pipe({
  name: 'toPartner'
})
export class ToPartnerPipe implements PipeTransform {

  curID: string = this.userSr.currentUser._id;
  constructor(private userSr: UserService) {
  }
  transform(value: IUser[], ...args: unknown[]): IUser {
    return value.filter(el => el._id !== this.curID)[0];
  }
}
