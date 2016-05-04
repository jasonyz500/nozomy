import {HTTP_PROVIDERS} from 'angular2/http';
import {provide, ComponentRef, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {AppComponent} from './app/components/app.component';
import {ReflectionsService} from './app/shared/index';
import {UserService} from './app/+auth/services/user.service';
import {appInjector} from './app/+auth/services/app-injector';
import 'rxjs/Rx';

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

bootstrap(AppComponent, [
	UserService,
	ReflectionsService,
	HTTP_PROVIDERS,
	ROUTER_PROVIDERS,
	provide(LocationStrategy, { useClass: HashLocationStrategy })
]).then((appRef: ComponentRef) => {
	// store a reference to the application injector
	appInjector(appRef.injector);
});

// In order to start the Service Worker located at "./sw.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./sw.js').then(function(registration) {
//     console.log('ServiceWorker registration successful with scope: ',    registration.scope);
//   }).catch(function(err) {
//     console.log('ServiceWorker registration failed: ', err);
//   });
// }
