import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';
import {UserService} from '../services/user.service';

@Component({
	selector: 'auth',
	providers: [UserService],
	templateUrl: './app/+auth/components/auth.component.html',
	styleUrls: ['./app/+auth/components/auth.component.css']
})
export class AuthComponent implements OnInit {
	constructor(private _router: Router, private _userService: UserService) { }

	// onClickLogin(username, password) {
	// 	console.log('userService', this._userService.login);
	// 	this._userService.login(username, password).subscribe((result) => {
	// 		if (result) {
	// 			this._router.navigate(['Home']);
	// 		}
	// 	});
	// }
	onClickLogin(username: string, password: string) {
		console.log(username, password);
		localStorage.setItem('auth_token', 'myauthtoken');
		this._router.navigate(['Home']);
	}

	ngOnInit() {
		if (!!localStorage.getItem('auth_token')) {
			this._router.navigate(['Home']);
		}
	}
}
