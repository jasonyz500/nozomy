import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router} from 'angular2/router';
import {ReflectionsService} from '../../shared/services/reflections.service';

import {CanActivate, ComponentInstruction} from 'angular2/router';
import {isLoggedIn} from '../../+auth/services/is-logged-in';
@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
  return isLoggedIn(next, previous);
})

@Component({
  selector: 'visualize',
  templateUrl: 'app/+visualize/components/visualize.component.html',
  styleUrls: ['app/+visualize/components/visualize.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES]
})
export class VisualizeComponent implements OnInit {
  reflections: any = [];
  constructor(private _router: Router, private _reflectionsService: ReflectionsService) {}

  getReflections() {
    this._reflectionsService.getManyReflections({
      start_date: '2016-04-01',
      end_date: '2016-06-01'
    }).subscribe(data => {
      console.log(data);
      this.reflections = data;
    }, error => console.error(error));
  }

  ngOnInit() {
    this.getReflections();
  }
}
