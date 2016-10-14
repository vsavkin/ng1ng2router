import {Component, Input} from '@angular/core';

@Component({
  selector: 'message-text',
  template: `
    <p><b>Text:</b> {{text}}</p>
  `
})
export class MessageTextCmp {
  @Input() text: string;
}