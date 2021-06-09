import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {delay, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {IConversation, IMessage} from '@shared/models';
import {Socket} from 'ngx-socket-io';
import {environment} from 'src/environments/environment';

const AUTH_API = environment.API_URL;

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private socket: Socket) {
  }

  // Get all Conversation
  getAllConversation(): Observable<IConversation[]> {
    return this.http.get<any>(AUTH_API + 'getAllConversation', httpOptions).pipe(
      map(res => res.data.GetAllConversation),
      delay(50));
  }

  // add new Conversation
  addNewConversation(ID: string): Observable<any> {
    return this.http.post(AUTH_API + 'addNewConversation', {
      _id: ID
    }, httpOptions).pipe(delay(50));
  }

  joinConversation(ID: string): void {
    this.addNewConversation(ID).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['chat', res.data.newConversation._id]).then(r => {
        });
      },
      err => {
        console.log(err.error.data);
        this.router.navigate(['chat', err.error.data._id]).then(r => {
        });
      }
    );
  }

  // Delete conversation
  deleteConversation(ID: string): Observable<any> {
    return this.http.delete(AUTH_API + 'deleteAConversation/' + ID, httpOptions).pipe(delay(50));
  }

  // Get conversation of user
  getConversationOfUser(): Observable<IConversation[]> {
    return this.http.get<any>(AUTH_API + 'getConversationOfUser', httpOptions).pipe(
      map(res => res.data.GetConversationOfUser),
      delay(50));
  }

  // get Message by API
  getMessageAPI(ID: string): Observable<IMessage[]> {
    console.log(ID);
    return this.http.get<any>(AUTH_API + 'getMessages/' + ID, httpOptions).pipe(
      map(res => res.data.messages),
      delay(50));
  }

  // post message by API
  sendMessageAPI(payload: any): Observable<any> {
    return this.http.post(AUTH_API + 'newMessage/' + payload.ID, {
      msg: payload.content
    }, httpOptions).pipe(delay(50));
  }

  // Delete message by API
  deleteMessageAPI(ID: string): Observable<any> {
    return this.http.delete(AUTH_API + 'deleteAMessage/' + ID, httpOptions).pipe(delay(50));
  }


  /*
  *   Socket IO
  * */

  sendMessage(payload: any): void {
    this.socket.emit('sendMessage', payload);
  }

  getMessage(): Observable<any> {
    return this.socket.fromEvent('sendMessage');
  }

}

