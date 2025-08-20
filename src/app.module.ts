import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule }  from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { MailerModule } from './mailer/mailer.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://Yokeshwaran:yogi@cluster0.t9rwvww.mongodb.net/userdb', {
      connectionName: 'usersConnection',
    }),

    MongooseModule.forRoot('mongodb+srv://Yokeshwaran:yogi@cluster0.t9rwvww.mongodb.net/productdb', {
      connectionName: 'productsConnection',
    }),

    UsersModule,
    ProductsModule,
    AuthModule,
    RolesModule,
    MailerModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) //  applied in order
      .forRoutes('*'); // apply to ALL routes
  }
}
