import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import { join } from 'path';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yokeshwaranait@gmail.com',        // Gmail
        pass: 'giex tyvr mnis baxd',             // App password (no spaces!)
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
      to: "mkyvyokeshwaran@gmail.com",
      subject,
      template,
      context,
      attachments,
    });
  }
}
