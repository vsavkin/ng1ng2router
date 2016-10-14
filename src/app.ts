// angular1 imports
import * as angular from 'angular'
import 'angular-route'

// angular2 imports
import {NgModule, Component} from '@angular/core';
import {Router, RouterModule, UrlHandlingStrategy} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeAdapter} from '@angular/upgrade';

// modules
import {MessagesModule, MessagesNgModule} from './messages';
import {MenuModule} from './menu';
import {SettingsNgModule} from './settings';

import {Repository} from './repository';



@Component({selector : 'ng2-router-root', template : `<router-outlet></router-outlet>`})
export class Ng2RouterRoot {
}



class Ng1Ng2UrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url) { return url.toString().startsWith("/settings"); }
  extract(url) { return url; }
  merge(url, whole) { return url; }
}

// // angular2 setup
@NgModule({
  imports: [BrowserModule, MessagesNgModule, SettingsNgModule, RouterModule.forRoot([], {useHash: true})],
  providers: [
    { provide: UrlHandlingStrategy, useClass: Ng1Ng2UrlHandlingStrategy }
  ],
  declarations: [Ng2RouterRoot]
})
class AppModule {}
const adapter = new UpgradeAdapter(AppModule);

MessagesNgModule.setAdapter(adapter);




// angular1 setup
const RootModule = angular.module('rootModule', ['ngRoute', MessagesModule.name, MenuModule.name]);
RootModule.component('rootCmp', {template : '<div class="ng-view"></div>'});
RootModule.directive('ng2RouterRoot', <any>adapter.downgradeNg2Component(Ng2RouterRoot));
RootModule.config(($routeProvider) => {
  $routeProvider
    .otherwise({template : '<ng2-router-root></ng2-router-root>', reloadOnSearch: false});
});

RootModule.service('repository', Repository);
adapter.upgradeNg1Provider("repository", {asToken: Repository});


export function bootstrap(el) {
  const ref = adapter.bootstrap(el, [ 'rootModule' ]);

  setTimeout(() => {
    ref.ng2Injector.get(Router).initialNavigation();
  }, 0);
}