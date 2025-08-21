import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';   //  fix
import * as nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import { join } from 'path';

@Injectable()
export class MailerService {
  private transporter;

  constructor(@InjectQueue('mail') private mailQueue: Queue) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yokeshwaranait@gmail.com',
        pass: 'giex tyvr mnis baxd',
      },
    });

    this.transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extname: '.hbs',
          layoutsDir: join(process.cwd(), 'src', 'templates'),
          defaultLayout: false,
        },
        viewPath: join(process.cwd(), 'src', 'templates'),
        extName: '.hbs',
      }),
    );
  }

  async sendMail(
    to: string,
    subject: string,
    template: string,
    context: any,
    attachments: any[] = [],
  ) {
    return await this.transporter.sendMail({
      from: 'yokeshwaran@gmail.com',
      to,
      subject,
      template,
      context,
      attachments,
    });
  }


   async sendWelcomeEmail(data: any) {
    return await this.mailQueue.add('welcome', data, {
      attempts: 3,
      backoff: 5000,
      removeOnComplete: true,
    });
  }
  


}
