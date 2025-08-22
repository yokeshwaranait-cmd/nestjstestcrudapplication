import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailerService } from './mailer.service';

import { MailerController } from './mailer.controller';
import { MailProcessor } from './mail.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mail', //  this must match @InjectQueue('mail')
    }),
  ],
  controllers: [MailerController],
  providers: [MailerService, MailProcessor],
  exports: [MailerService],
})
export class MailerModule {}
