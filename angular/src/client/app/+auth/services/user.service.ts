import { Injectable } from 'angular2/core';
import { Http, Headers, Response } from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {CONFIG} from '../../shared/config';

@Injectable()
export class UserService {
	urlConfig = CONFIG['<%= ENV %>'];
	urlBase = this.urlConfig.apiServer + ':' + this.urlConfig.apiPort;
	private loggedIn: boolean;

	constructor(private http: Http) {
		this.loggedIn = !!localStorage.getItem('auth_token');
	}

	login(username: string, password: string) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post(this.urlBase + '/login', JSON.stringify({ username, password }), { headers })
			.map(res => res.json())
			.map((res) => {
				if (res.auth_token) {
					localStorage.setItem('auth_token', res.auth_token);
					console.log('auth token:', res.auth_token);
					this.loggedIn = true;
					return true;
				}
				return false;
			}).catch(this.handleError);
	}

	logout() {
		localStorage.clear();
		this.loggedIn = false;
	}

	check() {
		return Observable.of(this.loggedIn);
	}

	private handleError(error: Response) {
		// in a real world app, we may send the error to some remote logging infrastructure
		// instead of just logging it to the console
		console.error(error);
		return Observable.throw(error || 'Server error');
	}
}
