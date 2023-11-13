import { Injectable } from '@angular/core';
import { FEATURE_PORTFOLIO } from '../model/features';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  constructor() { }

  get(feature: string) {
    return this.enabled.indexOf(feature) >= 0;
  }

  private enabled: string[] = [ FEATURE_PORTFOLIO ];

}
