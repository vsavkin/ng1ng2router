import * as angular from 'angular';
import 'angular-route'

export const MenuModule = angular.module('MenuModule', ['ngRoute']);

MenuModule.component('menu', {
  template : `
    <h1>Messages</h1>
    <ul>
      <li><a href="#/messages/inbox">Inbox</a></li>
      <li><a href="#/settings">Settings</a></li>
    </ul>
  `
});

MenuModule.config(($routeProvider) => {
  $routeProvider
    .when('/',     {template : '<menu></menu>'});
});