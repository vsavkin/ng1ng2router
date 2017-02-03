/**
 * This file defines the root module of the Angular 1 of the application.
 */

// import angular1
import * as angular from 'angular';
import 'angular-route';

(<any>window).angular = angular;


// import app modules
import {MessagesModule} from './messages';
import {MenuModule} from './menu';
import {SettingsModule} from './settings';

export const Ng1AppModule = angular.module('Ng1AppModule', ['ngRoute', MessagesModule.name, MenuModule.name, SettingsModule.name]);

Ng1AppModule.config(($locationProvider) => {
  $locationProvider.html5Mode(true)
});
