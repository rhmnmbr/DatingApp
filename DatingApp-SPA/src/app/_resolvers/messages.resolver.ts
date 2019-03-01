import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Message } from "../_models/message";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { AuthService } from "../_services/auth.service";

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  constructor(
    private userSvc: UserService,
    private router: Router,
    private alertify: AlertifyService,
    private authSvc: AuthService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userSvc
      .getMessages(this.authSvc.decodedToken.nameid, this.pageNumber,
        this.pageSize, this.messageContainer).pipe(
          catchError(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate['/home'];
            return of(null);
          })
        );
  }
}