import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  private insights: ApplicationInsights = new ApplicationInsights({
    config: {
      connectionString: 'InstrumentationKey=2140a7c5-ef38-4c09-a75d-1492a8936a02;IngestionEndpoint=https://canadacentral-1.in.applicationinsights.azure.com/;LiveEndpoint=https://canadacentral.livediagnostics.monitor.azure.com/'
    }
  });

  constructor() {
    if (window.scrollY && environment.production) {
      this.insights.loadAppInsights();
    }
  }

  checkIn() {
    try {
      // this.insights.trackEvent({name: 'CheckIn'}, (<any>window).serverInfo)
    }
    catch (e) {
      console.error('Failed to check in', e);
    }
  }
}
