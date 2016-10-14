import * as angular from 'angular';
import {NgModule} from '@angular/core';
import {UpgradeAdapter} from '@angular/upgrade';

import {MessageTextCmp} from './message_text_cmp';
import {MessagesCmp} from './messages_cmp';
import {MessageCmp} from './message_cmp';

export const MessagesModule = angular.module('MessagesModule', ['ngRoute']);

MessagesModule.component('messages', MessagesCmp);
MessagesModule.component('message', MessageCmp);

MessagesModule.config(($routeProvider) => {
  $routeProvider
    .when('/messages/:folder',     {template : '<messages></messages>'})
    .when('/messages/:folder/:id', {template : '<message></message>'});
});

@NgModule({declarations: [MessageTextCmp]})
export class MessagesNgModule {
  static setAdapter(adapter: UpgradeAdapter) {
    // all components migrated to angular 2 can be downgraded here
    MessagesModule.directive('messageText', <any>adapter.downgradeNg2Component(MessageTextCmp));
  }
}