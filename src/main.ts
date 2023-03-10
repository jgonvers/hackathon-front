import {Aurelia} from 'aurelia-framework'
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}




export interface Geometry {
  type: string;
  coordinates: number[][];
}

export interface Properties {
  id: string;
  name: string;
  height: number;
}

export interface Feature {
  type: string;
  id: number;
  geometry: Geometry;
  properties: Properties;
}

export interface geojson {
  type: string;
  crs: string;
  name: string;
  exceededTransferLimit: boolean;
  features: Feature[];
}
