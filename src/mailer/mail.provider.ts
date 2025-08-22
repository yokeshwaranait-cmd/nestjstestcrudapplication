// mailer.provider.ts
import { Provider } from '@nestjs/common';
import { Transporter, SentMessageInfo, createTransport } from 'nodemailer';

// mail-config.interface.ts
export interface MailConfig {
  service: string;
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export const MailerProvider: Provider = {
  provide: 'MAIL_TRANSPORTER',
  useFactory: (): Transporter<SentMessageInfo> => {
    const config: MailConfig = {
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER as string,
        pass: process.env.MAIL_PASS as string,
      },
    };
    const create = createTransport(config);
    return create as Transporter<SentMessageInfo>;
  },
};
