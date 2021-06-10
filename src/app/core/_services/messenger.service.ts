import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {delay, distinctUntilChanged, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {IConversation, IMessage} from '@shared/models';
import {Socket} from 'ngx-socket-io';
import {environment} from 'src/environments/environment';


/*
Initial Variables
*/
const AUTH_API = environment.API_URL;

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

const initialState: IConversation[] = [];


@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  private conversationsData$: BehaviorSubject<IConversation[]>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private socket: Socket) {
    this.conversationsData$ = new BehaviorSubject<IConversation[]>(initialState);
    this.initialConversations();
  }


  /*
  *  State Conversation Management
  * */

  get conversations(): IConversation[] {
    return this.conversationsData$.value;
  }

  getConversations(): Observable<IConversation[]> {
    console.log('get - conversations');
    return this.conversationsData$.asObservable().pipe(distinctUntilChanged());
  }

  updateConversations(): void {
    console.log('update conversation');
    this.getConversationOfUser().subscribe(
      (res: any) => {
        this.setConversations(res);
      }
    );
  }

  public initialConversations(): void {
    this.getConversationOfUser().subscribe(
      (res: any) => {
        this.setConversations(res);
      }
    );
  }

  // Join to conversation
  joinConversation(ID: string): void {
    this.addNewConversation(ID).subscribe(
      res => {
        console.log(res);
        this.updateConversations();
        this.router.navigate(['chat', res.data.newConversation._id]).then(_ => {
        });
      },
      err => {
        console.log(err.error.data);
        this.router.navigate(['chat', err.error.data._id]).then(_ => {
        });
      }
    );
  }


  /*
  *   ALl function - call API
  * */
  // add new Conversation
  addNewConversation(ID: string): Observable<any> {
    return this.http.post(AUTH_API + 'addNewConversation', {
      _id: ID
    }, httpOptions).pipe(delay(50));
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
    return this.http.get<any>(AUTH_API + 'getMessages/' + ID, httpOptions).pipe(
      map(res => res.data),
      delay(50));
  }

  // post message by API
  sendMessageAPI(payload: any): Observable<any> {
    return this.http.post(AUTH_API + 'newMessage/' + payload.ID, {
      msg: payload.content
    }, httpOptions).pipe(delay(50));
  }

  sendMessage(payload: any): void {
    this.socket.emit('sendMessage', payload);
  }

  // Delete message by API
  /* deleteMessageAPI(ID: string): Observable<any> {
     return this.http.delete(AUTH_API + 'deleteAMessage/' + ID, httpOptions).pipe(delay(50));
   }*/


  /*
  *   Socket IO
  * */

  getMessage(): Observable<any> {
    return this.socket.fromEvent('sendMessage');
  }

  private setConversations(value: IConversation[]): void {
    console.log('set conversations' + value.length);
    this.conversationsData$.next(value);
  }

}

