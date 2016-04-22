import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {NavbarComponent} from './navbar.component';
import {ToolbarComponent} from './toolbar.component';
import {NameListService} from '../shared/index';
import {HomeComponent} from '../+home/index';
import {AboutComponent} from '../+about/index';
import {AuthComponent} from '../+auth/index';
import {ReflectComponent} from '../+reflect/index';
import 'rxjs/Rx';

@Component({
  selector: 'sd-app',
  viewProviders: [NameListService],
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
    path: '/about',
    name: 'About',
    component: AboutComponent
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthComponent
  },
  {
    path: '/reflect',
    name: 'Reflect',
    component: ReflectComponent
  }
])
export class AppComponent {}
