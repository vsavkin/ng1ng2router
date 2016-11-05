// angular1 imports
import * as angular from 'angular'
import 'angular-route'

// angular2 imports
import {Component} from '@angular/core';

@Component({
  selector: 'root-cmp',
  template: `
    <router-outlet></router-outlet>
    <div class="ng-view"></div>
  `,
})
export class RootCmp {}

export function createAngular1RootModule(moduleNames: string[]) {
  const RootModule = angular.module('rootModule', moduleNames);
  RootModule.config(($routeProvider) => {
    $routeProvider.otherwise({template : '', reloadOnSearch: false});
  });
  return RootModule;
}
