import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';

// Mongoose
import { MongooseModule } from '@nestjs/mongoose';
// import { UserSchema } from './schemas/user.schema';
import { UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { ForgotPasswordSchema } from './schemas/forgot-password.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'ForgotPassword', schema: ForgotPasswordSchema}]),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
