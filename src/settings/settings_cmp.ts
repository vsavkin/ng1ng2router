import {Component} from '@angular/core';

@Component({
  selector: 'settings',
  template: `
    <h1>Settings</h1>
    <a routerLink="pagesize">Page Size Settings</a>
    <a routerLink="../">Back</a>
  `
})
export class SettingsCmp {
}