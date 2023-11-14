import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { PlatformService } from './platform.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  constructor(
    private platform: PlatformService
  ) {
    if (MonitoringService.constructed) 
      throw 'Monitor must be injected as a singleton';
    if (this.shouldSuppress) {
      console.info('Skipping Application Insights initialization. Telemetry will not be collected.')
      return;
    }
    this.appInsights = new ApplicationInsights({
      config: environment.appInsightsConfig
    });
    this.appInsights.loadAppInsights();
    MonitoringService.constructed = true;
  }

  eventForCheckIn() {
    if (this.shouldSuppress) // Null object pattern might be better as this class grows
      return;
    try {
      this.appInsights.trackEvent({name: 'CheckIn'}, (<any>window).serverInfo);
    }
    catch (e) {
      console.error('Failed to check in', e);
    }
  }

  private get shouldSuppress(): boolean {
    return !this.platform.isBrowser || !environment.production;
  }

  private appInsights!: ApplicationInsights;
  private static constructed: boolean = false;
}
