// This module is purely written in Angular 1.
import * as angular from 'angular';
import {NgModule} from '@angular/core';
import {MenuCmp} from './menu_cmp';

export const MenuModule = angular.module('MenuModule', ['ngRoute']);
MenuModule.component('menu', MenuCmp);
MenuModule.config(($routeProvider) => {
  $routeProvider.when('/', {template : '<menu></menu>'});
});

// techncially, this is not required, but it is nice to have it for consistency
@NgModule({})
export class MenuNgModule {
}