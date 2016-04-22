import { Injectable } from 'angular2/core';
import {CONFIG} from '../../shared/config';

@Injectable()
export class UserService {
	urlConfig = CONFIG['<%= ENV %>'];
	urlBase = this.urlConfig.apiServer + ':' + this.urlConfig.apiPort;
 	private loggedIn = false;

	constructor() {
		this.loggedIn = !!localStorage.getItem('auth_token');
	}

	// login(username: string, password: string) {
	//     let headers = new Headers();
	//     headers.append('Content-Type', 'application/json');

	//     return this.http.post(this.urlBase + '/login', JSON.stringify({ username, password }), { headers })
	// 		.map(res => res.json())
	// 		.map((res) => {
	// 			if (res.success) {
	// 				localStorage.setItem('auth_token', res.auth_token);
	// 				this.loggedIn = true;
	// 			}
	//         return res.success;
	// 		});
	// }

	logout() {
		localStorage.removeItem('auth_token');
		this.loggedIn = false;
	}

	isLoggedIn() {
		return this.loggedIn;
	}
}
