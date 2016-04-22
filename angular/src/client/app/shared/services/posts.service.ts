import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {createAuthHeaders} from './authenticate-requests';

@Injectable()
export class PostsService {
  constructor(private http: Http) {}

  // urlConfig = CONFIG['<%= ENV %>'];
  // urlBase = this.urlConfig.apiServer + ':' + this.urlConfig.apiPort;
  urlBase = 'localhost:8000';

  getPosts (queryObj: any) {
    // perform some validation on queryObj
    let getPostsUrl = this.urlBase + '/posts';
    let options = createAuthHeaders();
    // TODO: Add error handling
    return this.http
      .get(getPostsUrl, options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  savePost(post: any) {
    let savePostUrl = this.urlBase + '/posts/new';
    let options = createAuthHeaders();
    let body = JSON.stringify(post);
    return this.http.post(savePostUrl, body, options)
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
