import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';

import {PostsService} from '../../shared/index';

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+home/components/home.component.html',
  styleUrls: ['app/+home/components/home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class HomeComponent {
  constructor(public postsService: PostsService, private _router: Router) {}

  onSave() {
    this.postsService
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
