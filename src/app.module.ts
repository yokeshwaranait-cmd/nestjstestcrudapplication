import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { MailerModule } from './mailer/mailer.module';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { ReportModule } from './reports/reports.module';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Yokeshwaran:yogi@cluster0.t9rwvww.mongodb.net/userdb',
      {
        connectionName: 'usersConnection',
      },
    ),

    MongooseModule.forRoot(
      'mongodb+srv://Yokeshwaran:yogi@cluster0.t9rwvww.mongodb.net/productdb',
      {
        connectionName: 'productsConnection',
      },
    ),

    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    }),

    ConfigModule,

    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule,
    ReportModule,

    UsersModule,
    ProductsModule,
    AuthModule,
    RolesModule,
    NotificationModule,
  ],
  providers: [TasksService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) //  applied in order
      .forRoutes('*'); // apply to ALL routes
  }
}
