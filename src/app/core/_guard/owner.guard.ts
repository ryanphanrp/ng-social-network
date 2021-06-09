import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '@core/_services/user.service';
import {IUser} from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate, CanDeactivate<unknown> {
  private curUser: IUser = this.userSr.getCurrentUser();

  constructor(private userSr: UserService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const username = route.paramMap.get('username');
    console.log(route.paramMap.get('username'));
    if (username === this.curUser.username) {
      return true;
    }
    this.router.navigate(['404']).then(r => {
    });
    return false;
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
}
