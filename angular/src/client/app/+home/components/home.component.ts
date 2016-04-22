import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';
import {Http} from 'angular2/http';

import {PostsService} from '../../shared/index';

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+home/components/home.component.html',
  styleUrls: ['app/+home/components/home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: [PostsService]
})
export class HomeComponent implements OnInit {
  constructor(private http: Http, public postsService: PostsService, private _router: Router) { }
  post: any;

  onSave() {
    this.postsService.savePost(this.post);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  onClickLogout() {
    localStorage.getItem('auth_token');
  }

  ngOnInit() {
    this.post = {};
    this.post.question = 'What was the highlight of your week?';
  }
}
