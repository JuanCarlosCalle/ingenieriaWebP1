import { Injectable } from '@angular/core';
import { UserModel} from '../pages/login/userModel';
import { Observable} from 'rxjs/Observable';
import { UserToken } from '../shared/UserToken';
import { Restangular} from "ngx-restangular";

@Injectable()
export class LoginService {

  constructor(private restangular: Restangular) { }

  userToken: UserToken;

  authenticate(user: UserModel): Observable<string> {
    return  this.restangular.all('/user/login').post(user)
      .map(
        response => {
          this.userToken = new UserToken(response.user, response.role, response.token);
          this.userToken.setLocalStorage();
          console.log(JSON.stringify(this.userToken));

          return response.role;
        }
      );
  }

}
