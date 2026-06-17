import { Module } from '@nestjs/common';
import type { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RawBodyMiddleware } from './raw-body.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { StripeModule } from './stripe/stripe.module';
import { UploadModule } from './upload/upload.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { EmailModule } from './email/email.module';
import { ContactModule } from './contact/contact.module';

import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { Order } from './orders/order.entity';
import { OrderItem } from './orders/order-item.entity';
import { NewsletterSubscriber } from './newsletter/newsletter-subscriber.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProd = config.get<string>('NODE_ENV') === 'production';
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          ssl: isProd ? { rejectUnauthorized: false } : false,
          entities: [User, Product, Order, OrderItem, NewsletterSubscriber],
          synchronize: !isProd,
          logging: !isProd,
        };
      },
    }),

    ThrottlerModule.forRoot([{ ttl: 60000, limit: 20 }]),

    AuthModule,
    UsersModule,
    ProductsModule,
    OrdersModule,
    StripeModule,
    UploadModule,
    AnalyticsModule,
    NewsletterModule,
    EmailModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RawBodyMiddleware).forRoutes('api/stripe/webhook');
  }
}
