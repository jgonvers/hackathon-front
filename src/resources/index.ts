import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
  config.aurelia.use
  .standardConfiguration()
  .plugin(PLATFORM.moduleName('@aurelia-ux/core'))
  .plugin(PLATFORM.moduleName('@aurelia-ux/input'))
  .plugin(PLATFORM.moduleName('@aurelia-ux/card'))
  //config.globalResources([]);
}
