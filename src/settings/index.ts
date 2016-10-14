// This module was fully migrated to Angular 2
import {NgModule} from '@angular/core';
import {UpgradeAdapter} from '@angular/upgrade';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SettingsCmp} from './settings_cmp';
import {PageSizeCmp} from './page_size_cmp';

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
  static setAdapter(adapter: UpgradeAdapter) {}
}