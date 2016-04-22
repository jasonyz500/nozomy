import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';
import {PostsService} from '../../shared/services/posts.service';

@Component({
  selector: 'sd-reflect',
  templateUrl: 'app/+reflect/components/reflect.component.html',
  styleUrls: ['app/+reflect/components/reflect.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class ReflectComponent implements OnInit {
  constructor(private _router: Router, private _postsService: PostsService) {}
  posts: any = [];

  getPosts() {
    this._postsService.getPosts({})
      .subscribe(data => {
        this.posts = data;
      }, error => console.error(error));
  }
  ngOnInit() {
    this.getPosts();
  }
}
