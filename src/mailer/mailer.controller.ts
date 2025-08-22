// mailer.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Controller('mail')
export class MailerController {
  constructor(@InjectQueue('mail') private readonly mailQueue: Queue) {}

  @Post('welcome')
  async sendWelcomeMail() {
    await this.mailQueue.add('welcome', {
      to: 'mkyvyokeshwaran@gmail.com',
      subject: 'Welcome to MyApp',
      template: 'welcome',
      context: { name: 'Yokeshwaran' },
      attachments: [
        { filename: 'hello.txt', path: './attachments/hello.txt' },
        { filename: 'image.png', path: './attachments/logo.png' },
      ],
    });
    return { message: 'Welcome email queued!' };
  }

  @Post('reset')
  async sendResetMail(
    @Body() body: { to: string; name: string; resetLink: string },
  ) {
    await this.mailQueue.add('reset', {
      to: body.to,
      subject: 'Reset Your Password',
      template: 'reset-password',
      context: { name: body.name, resetLink: body.resetLink },
    });
    return { message: 'Reset email queued!' };
  }
}
