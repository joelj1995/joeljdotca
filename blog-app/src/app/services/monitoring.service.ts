import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  constructor() { }

  checkIn() {
    try {
      console.log('Check in POC', (<any>window).serverInfo);
    }
    catch (e) {
      console.error('Failed to check in', e);
    }
  }
}
