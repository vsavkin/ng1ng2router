// import polyfills
import 'core-js/es7/reflect'
import 'zone.js/dist/zone'

// import angular2 dpes
import {platformBrowser} from '@angular/platform-browser';
import {Router} from '@angular/router';

import {Ng1AppModule} from './ng1_app';
import {Ng2AppModuleNgFactory} from './ngfactory/src/ng2_app.ngfactory';

/**
 * We bootstrap the Angular 2 module first, and then, once it's done,
 * bootstrap the Angular 1 module.
 */
platformBrowser().bootstrapModuleFactory(Ng2AppModuleNgFactory).then(ref => {
  // bootstrap angular1
  (<any>ref.instance).upgrade.bootstrap(document.body, [Ng1AppModule.name]);

  // setTimeout is necessary because upgrade.bootstrap is async.
  // This should be fixed.
  setTimeout(() => {
    ref.injector.get(Router).initialNavigation();
  }, 0);
});
