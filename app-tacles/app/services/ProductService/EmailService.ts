export interface EmailService {
  sendEmail(subject: string, body: string): void;
}
