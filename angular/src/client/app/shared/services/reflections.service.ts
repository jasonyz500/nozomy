import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {createAuthHeaders} from './authenticate-requests';

@Injectable()
export class ReflectionsService {
  constructor(private http: Http) {}

  // urlConfig = CONFIG['<%= ENV %>'];
  // urlBase = this.urlConfig.apiServer + ':' + this.urlConfig.apiPort;
  urlBase = 'http://localhost:8000';

  getWritePage(cutoffDate: string) {
    // todo: perform some validation on queryObj
    let url = this.urlBase + '/write_page/' + cutoffDate;
    let options = createAuthHeaders();
    // TODO: Add error handling
    return this.http.get(url, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  saveReflection(reflection: any) {
    let url = this.urlBase + '/reflections/' + reflection._id;
    let options = createAuthHeaders();
    let body = JSON.stringify(reflection);
    return this.http.post(url, body, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getReflection(id: string) {
    let url = this.urlBase + '/reflections/' + id;
    let options = createAuthHeaders();
    return this.http.get(url, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getReflections(queryObj: any) {
    let url = this.urlBase + '/reflections';
    let options = createAuthHeaders();
    let body = JSON.stringify(queryObj);
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
