// This module was fully migrated to Angular 2
import {Directive, ElementRef, Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SettingsCmp} from './settings_cmp';
import {PageSizeCmp} from './page_size_cmp';
import { UpgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';


export const SettingsModule = angular.module('SettingsModule', []);

SettingsModule.component('ng1cmp', {
  template : `NG1-CMP`
});

@Directive({
  selector: 'ng1cmp'
})
export class Ng1CmpUpgraded extends UpgradeComponent {
  constructor(elementRef: ElementRef, injector: Injector) {
    super('ng1cmp', elementRef, injector);
  }
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
  declarations: [SettingsCmp, PageSizeCmp, Ng1CmpUpgraded]
})
export class SettingsNgModule {
}