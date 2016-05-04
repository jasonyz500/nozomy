import {Component, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {Router, RouteParams} from 'angular2/router';
import {Http} from 'angular2/http';

import {ReflectionsService} from '../../shared/index';
import {ReflectionComponent} from '../../+reflection/index';
import {UserService} from '../../+auth/services/user.service';
import * as moment from 'moment';

import {CanActivate, ComponentInstruction} from 'angular2/router';
import {isLoggedIn} from '../../+auth/services/is-logged-in';
@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
  return isLoggedIn(next, previous);
})

@Component({
  selector: 'sd-home',
  templateUrl: 'app/+home/components/home.component.html',
  styleUrls: ['app/+home/components/home.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ReflectionComponent]
})
export class HomeComponent implements OnInit {
  auth: any;
  model: any;
  changeTrigger: number = 1;
  name: string;
  date: string;
  constructor(private http: Http, private _routeParams: RouteParams, private _userService: UserService,
    private _reflectionsService: ReflectionsService, private _router: Router) {
    this.auth = _userService;
  }

  getWeeklyData(cutoffDate: string) {
    this._reflectionsService.getWritePage(cutoffDate)
      .subscribe(data => {
        console.log('returned weekly data:', data);
        this.model = data;
      }, error => console.error(error));
  }

  onSave() {
    console.log('save');
    this.changeTrigger++;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  onClickLogin() {
    localStorage.setItem('auth_token', 'myauthtoken');
  }

  onClickLogout() {
    this.auth.logout();
    this._router.navigate(['Auth']);
  }

  ngOnInit() {
    let cutoffDate = this._routeParams.get('cutoffDate') || moment().add(1, 'weeks').startOf('week').format('YYYY-MM-DD');
    this.getWeeklyData(cutoffDate);
    this.name = localStorage.getItem('user_name');
    this.date = moment().format('YYYY-MM-DD')
  }
}
