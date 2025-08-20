// src/mailer/mailer.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { join } from 'path';

@Controller('mail')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
@Post('welcome')
async sendWelcomeMail() {
  return await this.mailerService.sendMail(
    'mkyvyokeshwaran@gmail.com',
    'Welcome to MyApp',
    'welcome',
    { name: 'Yokeshwaran' },
    [
      {
        filename: 'hello.txt',
        path: join(process.cwd(), 'attachments', 'hello.txt'),
      },
      {
        filename: 'image.png',
        path: join(process.cwd(), 'attachments', 'logo.png'),
      },
    ],
  );
}
  @Post('reset')
  async sendResetMail(
    @Body() body: { to: string; name: string; resetLink: string },
  ) {
    return await this.mailerService.sendMail(
      body.to,
      'Reset Your Password',
      'reset-password',
      { name: body.name, resetLink: body.resetLink },
    );
  }
}
