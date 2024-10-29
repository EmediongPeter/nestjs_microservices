import { Module } from '@nestjs/common';
import { CacheInterceptor, CacheModule, CacheStore } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-yet'
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });
        const redisConfig = configService.get('redis')
        const cacheConfig = configService.get('cache')

        return {
          store: store as unknown as CacheStore,
          ttl: 3 * 60000, // 3 minutes (milliseconds)
        }
      }
    })

    // CacheModule.register({
    //   store: redisStore.redisStore()
    // })

  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useClass: CacheInterceptor }],
})
export class AppModule { }
