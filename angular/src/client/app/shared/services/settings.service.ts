import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {createAuthHeaders} from './authenticate-requests';

@Injectable()
export class SettingsService {
  constructor(private http: Http) {}

  // urlConfig = CONFIG['<%= ENV %>'];
  // urlBase = this.urlConfig.apiServer + ':' + this.urlConfig.apiPort;
  urlBase = 'http://localhost:8000';

  getSettingsPage() {
    let url = this.urlBase + '/settings/' + '1'; //eventually use: localStorage.getItem('user_id');
    let options = createAuthHeaders();
    // TODO: Add error handling
    return this.http.get(url, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  updateSettings(settings: any) {
    let url = this.urlBase + '/settings/' + '1'; //eventually use: localStorage.getItem('user_id');
    let options = createAuthHeaders();
    let body = JSON.stringify(settings);
    return this.http.post(url, body, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError (error: Response) {
    // in a real world app, we may send the error to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error || 'Server error');
  }
}
