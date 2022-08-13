import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeastureService {
  private readonly featureMap: Map<string, boolean> = new Map();

  constructor() { 
    this.featureMap.set('SUBSCRIBE', false);
  }

  isFeatureEnable(featureName: string): Observable<boolean> {
    if((environment.features as any)[featureName])
      return of(true);
    return of(false);
  }
}
