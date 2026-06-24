import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Stripe from 'stripe';
import { Order, OrderStatus } from '../orders/order.entity';
import { OrderItem } from '../orders/order-item.entity';
import { User } from '../users/user.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class StripeService {
  private stripe: InstanceType<typeof Stripe>;

  constructor(
    private config: ConfigService,
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemsRepo: Repository<OrderItem>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    private emailService: EmailService,
  ) {
    this.stripe = new Stripe(this.config.get<string>('STRIPE_SECRET_KEY') as string);
  }

  async createCheckoutSession(
    items: { name: string; price: number; quantity: number; imageUrl?: string }[],
    origin: string,
    userId?: string,
  ) {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
          ...(item.imageUrl?.startsWith('http') ? { images: [item.imageUrl] } : {}),
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      customer_creation: 'always',
      shipping_address_collection: {
        allowed_countries: ['US', 'GB', 'CA', 'AU', 'IE', 'NG', 'ZA', 'GH'],
      },
      ...(userId ? { metadata: { userId } } : {}),
    });
    return { sessionId: session.id, url: session.url };
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    const webhookSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET') as string;
    let event: ReturnType<typeof this.stripe.webhooks.constructEvent>;

    try {
      event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch {
      throw new Error('Invalid webhook signature');
    }

    switch (event.type) {
      case 'checkout.session.completed':
        await this.handleCheckoutComplete(event.data.object as any);
        break;
      case 'charge.refunded':
        await this.handleRefund(event.data.object as any);
        break;
    }

    return { received: true };
  }

  private async handleCheckoutComplete(session: any) {
    const existing = await this.ordersRepo.findOne({ where: { stripeSessionId: session.id } });
    if (existing) return;

    const lineItems = await this.stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product'],
    });

    const customerEmail = session.customer_details?.email ?? '';
    const metaUserId = session.metadata?.userId as string | undefined;

    let linkedUser = metaUserId
      ? await this.usersRepo.findOne({ where: { id: metaUserId } })
      : null;

    if (!linkedUser && customerEmail) {
      linkedUser = await this.usersRepo.findOne({ where: { email: customerEmail } });
    }

    const order = this.ordersRepo.create({
      stripeSessionId: session.id,
      stripePaymentIntent: session.payment_intent as string,
      customerEmail,
      customerName: session.customer_details?.name ?? '',
      shippingAddress: session.shipping_details?.address,
      status: OrderStatus.PAID,
      totalAmount: (session.amount_total ?? 0) / 100,
      ...(linkedUser ? { userId: linkedUser.id } : {}),
    });
    await this.ordersRepo.save(order);

    const items = lineItems.data.map((li: any) =>
      this.orderItemsRepo.create({
        orderId: order.id,
        productName: (li.price?.product as any)?.name ?? li.description ?? 'Product',
        productPrice: (li.price?.unit_amount ?? 0) / 100,
        quantity: li.quantity ?? 1,
      }),
    );
    await this.orderItemsRepo.save(items);

    await this.emailService.sendOrderConfirmation(order.customerEmail, {
      id: order.id,
      totalAmount: order.totalAmount,
      items: items.map((i) => ({
        productName: i.productName,
        quantity: i.quantity,
        productPrice: i.productPrice,
      })),
    });
  }

  private async handleRefund(charge: any) {
    const paymentIntent = charge.payment_intent as string;
    if (!paymentIntent) return;
    await this.ordersRepo.update(
      { stripePaymentIntent: paymentIntent },
      { status: OrderStatus.REFUNDED },
    );
  }

  async refundOrder(orderId: string) {
    const order = await this.ordersRepo.findOne({ where: { id: orderId } });
    if (!order?.stripePaymentIntent) throw new Error('No payment intent found for order');
    await this.stripe.refunds.create({ payment_intent: order.stripePaymentIntent });
    await this.ordersRepo.update(orderId, { status: OrderStatus.REFUNDED });
    return { message: 'Refund initiated' };
  }
}
