import * as angular from 'angular';
import {NgModule} from '@angular/core';
import {UpgradeAdapter} from '@angular/upgrade';

import {Message, Repository} from '../repository';
import {MessageText} from './message_text';

export const MessagesModule = angular.module('MessagesModule', ['ngRoute']);


/** @ngInject */
export class MessagesComponent {
  folder: string;
  messages: Message[];

  constructor($routeParams, repository: Repository) {
    this.folder = $routeParams.folder;
    this.messages = repository.messagesFor(this.folder);
  }
}

MessagesModule.component('messages', {
  template : `
    <h1>Messages</h1>
    <ul>
      <li ng-repeat="m in ctrl.messages">
        {{m.id}} - <a href="#/messages/{{ctrl.folder}}/{{m.id}}">{{m.text}}</a>
      </li>
    </ul>
    <a href="#/settings/pagesize">Change Page Size</a>
    <a href="#/">Back</a>
  `,
  controller : MessagesComponent,
  controllerAs: 'ctrl'
});



/** @ngInject */
export class MessageComponent {
  folder: string;
  id: number;
  message: Message;

  constructor($routeParams, repository: Repository) {
    this.folder = $routeParams.folder;
    this.id = +$routeParams.id;
    this.message = repository.message(this.id);
  }
}

MessagesModule.component('message', {
  template : `
    <h1>Message {{ctrl.id}}</h1>
    <message-text [text]="ctrl.message.text"></message-text>
    <div>
      <a href="#/messages/{{ctrl.folder}}">Go to Folder</a>
    </div>
  `,
  controller : MessageComponent,
  controllerAs: 'ctrl'
});


MessagesModule.config(($routeProvider) => {
  $routeProvider
    .when('/messages/:folder',     {template : '<messages></messages>'})
    .when('/messages/:folder/:id', {template : '<message></message>'});
});

@NgModule({
  declarations: [MessageText]
})
export class MessagesNgModule {
  static setAdapter(adapter: UpgradeAdapter) {
    MessagesModule.directive('messageText', <any>adapter.downgradeNg2Component(MessageText));
  }
}