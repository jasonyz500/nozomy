import {Headers, RequestOptions} from 'angular2/http';
export const createAuthHeaders = function() {
	let authToken = localStorage.getItem('auth_token');
	let headers = new Headers({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + authToken
	});
	let options = new RequestOptions({ headers: headers });
	return options;
};
