import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {UserService} from '../services/user.service';

@Component({
	selector: 'auth',
	templateUrl: './app/+auth/components/auth.component.html',
	styleUrls: ['./app/+auth/components/auth.component.css']
})
export class AuthComponent implements OnInit {
	_userService: any;
	incorrectLogin: boolean = false;

	constructor(private _router: Router, auth: UserService) {
		this._userService = auth;
	}

	onClickLogin(username: string, password: string) {
		this._userService.login(username, password).subscribe((result: any) => {
			if (result) {
				this.incorrectLogin = false;
				this._router.navigate(['Home']);
			} else {
				this.incorrectLogin = true;
			}
		});
	}

	ngOnInit() {
		if (!!localStorage.getItem('auth_token')) {
			this._router.navigate(['Home']);
		}
	}
}
