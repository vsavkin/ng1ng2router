import {NgModule} from '@angular/core';
import {Router, RouterModule, UrlHandlingStrategy} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeAdapter} from '@angular/upgrade';

// modules
import {MessagesModule, MessagesNgModule} from './messages';
import {MenuModule, MenuNgModule} from './menu';
import {SettingsNgModule} from './settings';
import {Ng2RouterRoot, createRootModule} from './upgrade_utils';

// This URL handling strategy is custom and application-specific.
class Ng1Ng2UrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url) { return url.toString().startsWith("/settings"); }
  extract(url) { return url; }
  merge(url, whole) { return url; }
}

@NgModule({
  imports: [
    BrowserModule,
    MessagesNgModule,
    SettingsNgModule,
    RouterModule.forRoot([], {useHash: true})
  ],
  providers: [
    { provide: UrlHandlingStrategy, useClass: Ng1Ng2UrlHandlingStrategy }
  ],
  declarations: [Ng2RouterRoot]
})
class AppModule {}
const adapter = new UpgradeAdapter(AppModule);
MenuNgModule.setAdapter(adapter);
MessagesNgModule.setAdapter(adapter);

createRootModule(adapter, ['ngRoute', MessagesModule.name, MenuModule.name]);

export function bootstrap(el) {
  const ref = adapter.bootstrap(el, ['rootModule']);

  // this is required because of a bug in NgUpgrade
  setTimeout(() => {
    ref.ng2Injector.get(Router).initialNavigation();
  }, 0);
}