import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule }  from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Yokeshwaran:yogi@cluster0.t9rwvww.mongodb.net/userdb'
    ),
    UsersModule,
    AuthModule,
    RolesModule
  ],
})
export class AppModule {}
