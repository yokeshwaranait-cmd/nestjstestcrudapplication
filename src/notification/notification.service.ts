import { Injectable } from '@nestjs/common';

// Base notifier (Abstraction)
abstract class Notifier {
  abstract notify(message: string): string;
}

// Different notification types (Polymorphism)
export class EmailNotifier extends Notifier {
  notify(message: string): string {
    return ` Email sent: ${message}`;
  }
}

export class SmsNotifier extends Notifier {
  notify(message: string): string {
    return ` SMS sent: ${message}`;
  }
}

export class PushNotifier extends Notifier {
  notify(message: string): string {
    return ` Push notification sent: ${message}`;
  }
}

@Injectable()
export class NotificationService {
  sendNotification(message: string, notifier: Notifier) {
    // Encapsulation: hiding the actual sending logic
    return notifier.notify(message);
  }
}
