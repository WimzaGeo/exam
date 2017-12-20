import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User }           from './user';
import { Observable }     from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class LoginService {
    private getUserUrl = 'user/get';  // URL to web API
    private postUserUrl = 'user/post';  // URL to web API
    constructor (private http: Http) {}
    private socket;
    private url = window.location.origin;
      /*
     * Send blog message to server
     */
    addLogin (user: User): Observable<User> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.postUserUrl, user, options)
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