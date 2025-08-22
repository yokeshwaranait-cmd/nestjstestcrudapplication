import { Injectable } from '@nestjs/common';
import nodemailer, {
  Transporter,
  SentMessageInfo,
  SendMailOptions,
} from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
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

  sendMail(options: SendMailOptions): Promise<SentMessageInfo> {
    return this.transporter.sendMail(options);
  }
}
