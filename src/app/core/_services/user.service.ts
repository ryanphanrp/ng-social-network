import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {delay, map, switchMap} from 'rxjs/operators';
import {IPost, IUser} from '@shared/models';
import {Observable, of} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TokenService} from '@core/_services/token.service';

const API_URL = environment.API_URL;

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: IUser = this.getCurrentUser();

  constructor(
    private http: HttpClient,
    private tokenSr: TokenService) {
  }

  /*
  *  User in local
  * */

  // Get information of current user in local storage
  getCurrentUser(): IUser {
    return JSON.parse(localStorage.getItem('auth-user') as string) as IUser;
  }

  // Update data for user in Local storage
  updateUserInLocal(user: IUser): boolean {
    window.localStorage.setItem('auth-user', JSON.stringify(user));
    return true;
  }

  // Update current user in whole project
  updateCurrentUser(): any {
    this.getInfoUser(this.currentUser.username).subscribe(
      (next: IUser) => {
        this.currentUser = next;

        // Next userSource
        this.tokenSr.saveUser(next);
      }
    );
  }


  /*
  * User with Server
  * */

  // Update newest user's Information from Server
  updateNewUser(username?: string): Observable<boolean | any> {
    if (!username) {
      username = this.getCurrentUser()?.username;
    }
    return this.getInfoUser(username).pipe(
      map(next => next),
      switchMap(next => of(this.updateUserInLocal(next)))
    );
  }

  // Search a user by their name
  searchUser(key: string): Observable<IUser[]> {
    return this.http.get<any>(API_URL + 'search-users?name=' + key, httpOptions).pipe(
      map(ele => ele.data.users),
      delay(50));
  }

  // Get user's information by username
  getInfoUser(username: string): Observable<IUser> {
    return this.http.get<any>(API_URL + 'users/' + username, httpOptions).pipe(
      map(ele => ele.data?.user)
    );
  }

  /*  // Get user's information by ID
    getInfoUserByID(ID: string): Observable<IUser> {
      return this.http.get<any>(API_URL + 'user/' + ID, httpOptions).pipe(
        map(ele => ele.data?.user)
      );
    }*/

  // Update user's information
  updateInfoUser(payload: any): Observable<any> {
    const ID = this.getCurrentUser()?._id;
    return this.http.put(API_URL + 'settings/editProfile/' + ID, {
      name: payload.name,
      username: payload.username,
      email: payload.email,
      bio: payload.bio,
      avatarUrl: payload.avatarUrl
    }, httpOptions).pipe(delay(50));
  }

  // Get user's posts by username
  getPostsUser(username: string): Observable<IPost[]> {
    return this.http.get<any>(API_URL + 'users/' + username, httpOptions).pipe(
      map((ele: any) => ele.data?.posts)
    );
  }

  // Change password
  changePassword(payload: any): Observable<any> {
    return this.http.post(API_URL + 'settings/password', {
      currentPassword: payload.oldPW,
      newPassword: payload.newPW
    }, httpOptions).pipe(delay(50));
  }


  /*
  *  Follow & Unfollow
  * */

  // Follow a user by ID
  followUser(ID: string): Observable<any> {
    return this.http.put(API_URL + 'follow', {
      followId: ID
    }, httpOptions).pipe(delay(50));
  }

  // Unfollow a user by ID
  unfollowUser(ID: string): Observable<any> {
    return this.http.put(API_URL + 'unfollow', {
      unfollowId: ID
    }, httpOptions).pipe(delay(50));
  }


  /*
  * Get Friend List
  * */
  getFriendList(ID: any): Observable<IUser[]> {
    return this.http.get<any>(API_URL + 'friends/' + ID, httpOptions).pipe(
      map(res => res.data.friendList),
      delay(50)
    );
  }

  getFollowers(payload: any): Observable<IUser[]> {
    const username = !!payload ? payload : this.getCurrentUser().username;
    return this.http.get<any>(API_URL + 'getDetailFollow/' + username).pipe(
      map(res => res.data.result[0].followers),
      delay(50)
    );
  }

  getFollowing(payload: string): Observable<IUser[]> {
    const username = !!payload ? payload : this.getCurrentUser().username;
    return this.http.get<any>(API_URL + 'getDetailFollow/' + username).pipe(
      map(res => res.data.result[0].following),
      delay(50)
    );
  }

  // Update Avatar
  updateAvatar(avatarForm: FormData): Observable<HttpEvent<any>> {
    const api = API_URL + 'profile/updateAvatar/' + this.getCurrentUser()?._id;
    console.log(api);
    console.log(avatarForm);
    return this.http.put(api, avatarForm, {
      observe: 'events',
      reportProgress: true
    });
  }
}
