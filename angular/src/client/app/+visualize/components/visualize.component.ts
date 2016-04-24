import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';
import {ReflectionsService} from '../../shared/services/reflections.service';

@Component({
  selector: 'visualize',
  templateUrl: 'app/+visualize/components/visualize.component.html',
  styleUrls: ['app/+visualize/components/visualize.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class VisualizeComponent implements OnInit {
  constructor(private _router: Router, private _reflectionsService: ReflectionsService) {}
  posts: any = [];

  getPosts() {
    this._reflectionsService.getReflections({})
      .subscribe(data => {
        this.posts = data;
      }, error => console.error(error));
  }
  
  ngOnInit() {
    this.getPosts();
  }
}
