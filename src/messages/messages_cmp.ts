import {Message, Repository} from './repository';

export class MessagesController {
  folder: string;
  messages: Message[];

  constructor($routeParams, repository: Repository) {
    this.folder = $routeParams.folder;
    this.messages = repository.messagesFor(this.folder);
  }
}

export const MessagesCmp = {
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
  controller : MessagesController,
  controllerAs: 'ctrl'
};