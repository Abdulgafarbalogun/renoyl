import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend;
  private from: string;
  private readonly logger = new Logger(EmailService.name);

  constructor(private config: ConfigService) {
    this.resend = new Resend(this.config.get<string>('RESEND_API_KEY'));
    this.from = this.config.get<string>('EMAIL_FROM') || 'noreply@renoyl.com';
  }

  async sendOrderConfirmation(to: string, orderDetails: { id: string; totalAmount: number; items: { productName: string; quantity: number; productPrice: number }[] }) {
    const itemRows = orderDetails.items
      .map((i) => `<tr><td>${i.productName}</td><td>${i.quantity}</td><td>$${i.productPrice}</td></tr>`)
      .join('');

    try {
      await this.resend.emails.send({
        from: this.from,
        to,
        subject: 'Your Renoyl Order Confirmation',
        html: `
          <h2>Thank you for your order!</h2>
          <p>Order ID: ${orderDetails.id}</p>
          <table border="1" cellpadding="8">
            <thead><tr><th>Product</th><th>Qty</th><th>Price</th></tr></thead>
            <tbody>${itemRows}</tbody>
          </table>
          <p><strong>Total: $${orderDetails.totalAmount}</strong></p>
          <p>We'll notify you when your order ships.</p>
        `,
      });
    } catch (err) {
      this.logger.error('Failed to send order confirmation email', err);
    }
  }

  async sendContactMessage(name: string, email: string, message: string) {
    try {
      await this.resend.emails.send({
        from: this.from,
        to: this.from,
        replyTo: email,
        subject: `Contact form: message from ${name}`,
        html: `<h3>New contact message</h3><p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, '<br>')}</p>`,
      });
    } catch (err) {
      this.logger.error('Failed to send contact email', err);
    }
  }

  async sendWelcome(to: string, name: string) {
    try {
      await this.resend.emails.send({
        from: this.from,
        to,
        subject: 'Welcome to Renoyl!',
        html: `<h2>Welcome, ${name}!</h2><p>Thank you for creating an account with Renoyl. We're excited to have you.</p>`,
      });
    } catch (err) {
      this.logger.error('Failed to send welcome email', err);
    }
  }
}
