import {Message, Repository} from './repository';

export class MessageController {
  folder: string;
  id: number;
  message: Message;

  constructor($routeParams, repository: Repository) {
    this.folder = $routeParams.folder;
    this.id = +$routeParams.id;
    this.message = repository.message(this.id);
  }
}

export const MessageCmp = {
  template : `
    <h1>Message {{ctrl.id}}</h1>
    <message-text [text]="ctrl.message.text"></message-text>
    <div>
      <a href="#/messages/{{ctrl.folder}}">Go to Folder</a>
    </div>
  `,
  controller : MessageController,
  controllerAs: 'ctrl'
};