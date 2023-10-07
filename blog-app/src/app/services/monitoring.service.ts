import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { environment } from 'src/environments/environment';
import { JoelJConstants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  private insights: ApplicationInsights = new ApplicationInsights({
    config: {
      connectionString: 'InstrumentationKey=0d4d1cac-2a4f-4201-af10-50855ff5422b;IngestionEndpoint=https://canadaeast-0.in.applicationinsights.azure.com/'
    }
  });

  constructor() {
    if (!JoelJConstants.isServer && environment.production) {
      console.info('Loading application insights.');
      this.insights.loadAppInsights();
    }
  }

  checkIn() {
    try {
      if (!JoelJConstants.isServer)
        this.insights.trackEvent({name: 'CheckIn'}, (<any>window).serverInfo);
    }
    catch (e) {
      console.error('Failed to check in', e);
    }
  }
}
