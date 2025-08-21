import { Processor, Process } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import type { Job } from 'bull';
import { MailerService } from './mailer.service';

@Processor('mail')
@Injectable()
export class MailProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process('welcome')
  async handleWelcomeEmail(job: Job<any>) {
    console.log('Processing welcome email:', job.data);

    const { to, subject, template, context, attachments } = job.data;

    return await this.mailerService.sendMail(
      to,
      subject,
      template,
      context,
      attachments || [],
    );
  }

  @Process('reset')
  async handleResetEmail(job: Job<any>) {
    console.log('Processing reset email:', job.data);

    const { to, subject, template, context, attachments } = job.data;

    return await this.mailerService.sendMail(
      to,
      subject,
      template,
      context,
      attachments || [],
    );
  }
}
