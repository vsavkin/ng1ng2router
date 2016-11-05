import {NgModule} from '@angular/core';
import {Router, RouterModule, UrlHandlingStrategy} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {UpgradeModule} from '@angular/upgrade/static';

// modules
import {MessagesModule, MessagesNgModule} from './messages';
import {MenuModule, MenuNgModule} from './menu';
import {SettingsNgModule} from './settings';
import {RootCmp, createAngular1RootModule} from './upgrade_utils';

// This URL handling strategy is custom and application-specific.
// Using it we can tell the Angular 2 router to handle only URL starting with settings.
class Ng1Ng2UrlHandlingStrategy implements UrlHandlingStrategy {
  shouldProcessUrl(url) { return url.toString().startsWith("/settings"); }
  extract(url) { return url; }
  merge(url, whole) { return url; }
}

@NgModule({
  imports: [
    UpgradeModule,
    BrowserModule,

    // import all modules
    MenuNgModule,
    MessagesNgModule,
    SettingsNgModule,

    // We don't need to provide any routes.
    // The router will collect all routes from all the registerd modules.
    RouterModule.forRoot([], {
      useHash: true,
      initialNavigation: false // we went to trigger navigation outselves after ng1 is done bootstrapping
    })
  ],

  providers: [
    { provide: UrlHandlingStrategy, useClass: Ng1Ng2UrlHandlingStrategy }
  ],

  bootstrap: [RootCmp],
  declarations: [RootCmp] // required
})
class AppModule {}

// create Angular1 root module
const rootModule = createAngular1RootModule(['ngRoute', MessagesModule.name, MenuModule.name]);

export function bootstrap(el) {
  platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
    const upgrade = ref.injector.get(UpgradeModule) as UpgradeModule;
    upgrade.bootstrap(el, [rootModule.name]);

    // setTimeout is necessary because upgrade.bootstrap is async.
    // This should be fixed.
    setTimeout(() => {
      upgrade.injector.get(Router).initialNavigation();
    }, 0);
  });
}