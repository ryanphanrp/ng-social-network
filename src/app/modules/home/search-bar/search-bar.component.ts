import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IUser} from '@shared/models';
import {UserService} from '@core/_services/user.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  keyword = new FormControl();
  streets: IUser[] = [];
  filteredUsers: IUser[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers('example');
  }

  getUsers(value: string): void {
    this.userService.searchUser(value).subscribe(
      next => {
        this.filteredUsers = next;
      },
      err => {
        this.filteredUsers = [];
        console.log(err);
      }
    );
  }
}
