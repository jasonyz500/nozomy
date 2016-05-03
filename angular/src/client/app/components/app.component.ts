import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';
import {HomeComponent} from '../+home/index';
import {AuthComponent} from '../+auth/index';
import {VisualizeComponent} from '../+visualize/index';
import {SettingsComponent} from '../+settings/index';

@Component({
  selector: 'sd-app',
  templateUrl: './app/components/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, ToolbarComponent]
})
@RouteConfig([
  {
    path: '/',
    name: 'Home',
    component: HomeComponent
  },
  {
    path: '/write/:cutoffDate',
    name: 'Write',
    component: HomeComponent
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthComponent
  },
  {
    path: '/visualize',
    name: 'Visualize',
    component: VisualizeComponent
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsComponent
  }
])
export class AppComponent {}
