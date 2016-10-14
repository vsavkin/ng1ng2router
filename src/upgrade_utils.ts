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
import {MenuModule, MenuNgModule} from './menu';
import {SettingsNgModule} from './settings';


@Component({selector : 'ng2-router-root', template: `<router-outlet></router-outlet>`})
export class Ng2RouterRoot {}

export function createRootModule(adapter: UpgradeAdapter, moduleNames: string[]) {
  const RootModule = angular.module('rootModule', moduleNames);

  RootModule.component('rootCmp', {template : '<div class="ng-view"></div>'});
  RootModule.directive('ng2RouterRoot', <any>adapter.downgradeNg2Component(Ng2RouterRoot));
  RootModule.config(($routeProvider) => {
    $routeProvider
      .otherwise({template : '<ng2-router-root></ng2-router-root>', reloadOnSearch: false});
  });

  return RootModule;
}
