import { Injectable } from '@angular/core';
import { TTLCache } from '@brokerloop/ttlcache';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: TTLCache<string, any>;

  constructor() {
    this.cache = new TTLCache<string, any>({
      ttl: 5 * 1000,
      max: 20,
      clock: Date
    });
  }

  set(name: string, data: any) {
    this.cache.set(name, data);
  }

  get(name: string) {
    return this.cache.get(name);
  }

}
