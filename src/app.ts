import {NgModule} from '@angular/core';
import {Router, RouterModule, UrlHandlingStrategy} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeAdapter} from '@angular/upgrade';

// modules
import {MessagesModule, MessagesNgModule} from './messages';
import {MenuModule, MenuNgModule} from './menu';
import {SettingsNgModule} from './settings';
import {Ng2RouterRoot, createAngular1RootModule} from './upgrade_utils';

// This URL handling strategy is custom and application-specific.
// Using it we can tell the Angular 2 router to handle only URL starting with settings.
class Ng1Ng2UrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url) { return url.toString().startsWith("/settings"); }
  extract(url) { return url; }
  merge(url, whole) { return url; }
}

@NgModule({
  imports: [
    BrowserModule,

    // import all modules
    MenuNgModule,
    MessagesNgModule,
    SettingsNgModule,

    // We don't need to provide any routes.
    // The router will collect all routes from all the registerd modules.
    RouterModule.forRoot([], {useHash: true})
  ],
  providers: [
    { provide: UrlHandlingStrategy, useClass: Ng1Ng2UrlHandlingStrategy }
  ],

  declarations: [Ng2RouterRoot] // required
})
class AppModule {}

// Creating an adapter passing it to all the modules
const adapter = new UpgradeAdapter(AppModule);
MenuNgModule.setAdapter(adapter);
MessagesNgModule.setAdapter(adapter);
SettingsNgModule.setAdapter(adapter);

// create Angular1 root module
createAngular1RootModule(adapter, ['ngRoute', MessagesModule.name, MenuModule.name]);

export function bootstrap(el) {
  const ref = adapter.bootstrap(el, ['rootModule']);

  // this is required because of a bug in NgUpgrade
  setTimeout(() => {
    ref.ng2Injector.get(Router).initialNavigation();
  }, 0);
}