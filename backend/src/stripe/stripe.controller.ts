import { Controller, Post, Body, Headers, Req, HttpCode, BadRequestException } from '@nestjs/common';
import type { Request } from 'express';
import { StripeService } from './stripe.service';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('checkout-session')
  createCheckoutSession(@Body() dto: CreateCheckoutSessionDto) {
    return this.stripeService.createCheckoutSession(dto.priceId, dto.origin);
  }

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: Request,
  ) {
    if (!signature) throw new BadRequestException('Missing stripe-signature header');
    return this.stripeService.handleWebhook(req['rawBody'] as Buffer, signature);
  }
}
