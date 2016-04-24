import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router, RouteParams} from 'angular2/router';
import {Http} from 'angular2/http';

import {Reflection} from '../../shared/index';
import {ReflectionsService} from '../../shared/index';
import {ReflectionComponent} from '../../+reflection/index';
import * as moment from 'moment';

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+home/components/home.component.html',
  styleUrls: ['app/+home/components/home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ReflectionComponent]
})
export class HomeComponent implements OnInit {
  constructor(private http: Http, private _routeParams: RouteParams,
    private _reflectionsService: ReflectionsService, private _router: Router) { }
  model: any;

  getWeeklyData(cutoffDate: string) {
    this._reflectionsService.getWritePage(cutoffDate)
      .subscribe(data => {
        console.log('returned weekly data:', data);
        this.model = data;
      }, error => console.error(error));
  }

  onSave() {
    console.log('save');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  onClickLogout() {
    localStorage.removeItem('auth_token');
  }

  ngOnInit() {
    let cutoffDate = this._routeParams.get('cutoffDate') || moment().endOf('week').format('YYYY-MM-DD');
    this.getWeeklyData(cutoffDate);
  }
}
