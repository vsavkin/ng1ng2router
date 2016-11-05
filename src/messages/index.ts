// This module is in the midst of transitiong from Angular 1 to Angular 2.
// We migrated MessageTextCmp to Angular2.
import * as angular from 'angular';
import {NgModule} from '@angular/core';
import {UpgradeModule, downgradeComponent} from '@angular/upgrade/static';

import {Repository} from './repository';
import {MessageTextCmp} from './message_text_cmp';
import {MessagesCmp} from './messages_cmp';
import {MessageCmp} from './message_cmp';

export const MessagesModule = angular.module('MessagesModule', ['ngRoute']);

MessagesModule.component('messages', MessagesCmp);
MessagesModule.component('message', MessageCmp);
MessagesModule.service('repository', Repository);
MessagesModule.config(($routeProvider) => {
  $routeProvider
    .when('/messages/:folder',     {template : '<messages></messages>'})
    .when('/messages/:folder/:id', {template : '<message></message>'});
});

export function exportRepository(m: UpgradeModule): Repository {
  return m.$injector.get('repository');
}

@NgModule({
  // components migrated to Angular 2 should be registered here
  declarations: [MessageTextCmp],
  entryComponents: [MessageTextCmp],

  providers: [
    {provide: Repository, useFactory: exportRepository, deps: [UpgradeModule]}
  ]
})
export class MessagesNgModule {}

// components migrated to angular 2 should be downgraded here
MessagesModule.directive('messageText', <any>downgradeComponent({
  component: MessageTextCmp,
  inputs: ['text']
}));