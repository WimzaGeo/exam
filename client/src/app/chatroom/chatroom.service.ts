import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Chatroom } from './chatroom';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { User } from '../login/user';
import { Message } from '../message/message';

@Injectable()
export class ChatroomService {
    private getChatroomUrl = 'chatroom/get';  // URL to web API
    private postChatroomUrl = 'chatroom/post';  // URL to web API
    private postChatroomMessageUrl = 'chatroom/postMessage';
    private getUserUrl = 'user/get';
    private getChatroommessageUrl ='chatroom/getMessage/:id';
    constructor (private http: Http) {}
    private socket;
    private url = window.location.origin;

    getUsers (): Observable<User[]> {
        let observable = new Observable(observer => {
            console.log("");
            this.socket = io(this.url);
            this.socket.on('refresh', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }
    getChatroomGetMessage (): Observable<Message[]> {
        let observable = new Observable<Message[]>(observer => {
            console.log("Socket:",this.url);
            this.socket = io(this.url);
            this.socket.on('newMessage', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }
    getChatrooms (): Observable<Chatroom[]> {
        let observable = new Observable(observer => {
            console.log("Socket:",this.url);
            this.socket = io(this.url);
            this.socket.on('refresh', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }
    addMessageToChatroom(chatroom: Chatroom): Observable<Chatroom> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.postChatroomMessageUrl, chatroom, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    addChatroom (chatroom: Chatroom): Observable<Chatroom> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.postChatroomUrl, chatroom, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        //console.log(body);
        return body || { };
    }
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.log(errMsg);
        return Observable.throw(errMsg);
    }
}