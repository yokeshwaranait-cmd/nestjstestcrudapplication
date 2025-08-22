import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { Transporter, SendMailOptions, SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: Transporter;

  constructor() {
    this.transporter = (
      nodemailer as unknown as {
        createTransport: (opts: unknown) => Transporter;
      }
    ).createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail(options: SendMailOptions): Promise<SentMessageInfo> {
    return await this.transporter(options);
  }
}
