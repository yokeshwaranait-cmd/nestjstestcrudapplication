import { Processor, Process } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import type { Job } from 'bull';
import { MailerService } from './mailer.service';

interface WelcomeEmailPayload {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
  attachments?: string[];
}

@Processor('mail')
@Injectable()
export class MailProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process('welcome')
  async handleWelcomeEmail(job: Job<unknown>) {
    const data = job.data as WelcomeEmailPayload | undefined;
    if (
      !data ||
      !data.to ||
      !data.subject ||
      !data.template ||
      !data.attachments
    ) {
      throw new Error('Invalid welcome email payload');
    }

    await this.mailerService.sendMail(data.to);
  }
}
