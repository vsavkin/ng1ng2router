import {NgModule, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Repository} from '../repository'

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

@Component({
  selector: 'page-settings',
  template: `
    <h1>Page Size Settings</h1>

    <div *ngFor="let p of repository.folders">
      Page size for '{{p}}' <input [(ngModel)]="repository.pageSize[p]"> (<a [routerLink]="['/messages', p]">open</a>)
    </div>

    <a routerLink="../">Back</a>
  `
})
export class PageSizeCmp {
  constructor(private repository: Repository) {}
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'settings', children: [
        { path: '', component: SettingsCmp },
        { path: 'pagesize', component: PageSizeCmp }
      ] },
    ])
  ],
  declarations: [SettingsCmp, PageSizeCmp]
})
export class SettingsNgModule {
}