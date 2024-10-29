import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import {CacheManagerStore} from 'cache-manager';

@Injectable()
export class AppService {

  constructor(@Inject(CACHE_MANAGER) private cacheManager: CacheManagerStore) { }

  async getHello() {
    await this.cacheManager.set('cache_item', { key: 32 }, )
    await this.cacheManager.del('cache_item')
    await this.cacheManager.reset()

    const cachedItem = await this.cacheManager.get('cache_item')
    console.log(cachedItem);
    
    return 'Hello World!';
  }
}
