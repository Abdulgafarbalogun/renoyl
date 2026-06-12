import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../orders/order.entity';
@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
  ) {}

  async getSummary() {
    const [orders, totalRevenue] = await Promise.all([
      this.ordersRepo.find({ where: { status: OrderStatus.PAID }, relations: { items: true } }),
      this.ordersRepo
        .createQueryBuilder('order')
        .select('SUM(order.totalAmount)', 'total')
        .where('order.status IN (:...statuses)', { statuses: [OrderStatus.PAID, OrderStatus.FULFILLED] })
        .getRawOne<{ total: string }>(),
    ]);

    const revenue = parseFloat(totalRevenue?.total || '0');
    const orderCount = orders.length;
    const avgOrderValue = orderCount > 0 ? revenue / orderCount : 0;

    const productTotals: Record<string, { name: string; quantity: number; revenue: number }> = {};
    for (const order of orders) {
      for (const item of order.items || []) {
        if (!productTotals[item.productName]) {
          productTotals[item.productName] = { name: item.productName, quantity: 0, revenue: 0 };
        }
        productTotals[item.productName].quantity += item.quantity;
        productTotals[item.productName].revenue += Number(item.productPrice) * item.quantity;
      }
    }

    const topProducts = Object.values(productTotals)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return { revenue, orderCount, avgOrderValue, topProducts };
  }

  async getRevenueOverTime(period: '7d' | '30d' | '90d' = '30d') {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const since = new Date();
    since.setDate(since.getDate() - days);

    const orders = await this.ordersRepo
      .createQueryBuilder('order')
      .select("DATE_TRUNC('day', order.createdAt)", 'day')
      .addSelect('SUM(order.totalAmount)', 'revenue')
      .where('order.createdAt >= :since', { since })
      .andWhere('order.status IN (:...statuses)', { statuses: [OrderStatus.PAID, OrderStatus.FULFILLED] })
      .groupBy("DATE_TRUNC('day', order.createdAt)")
      .orderBy("DATE_TRUNC('day', order.createdAt)", 'ASC')
      .getRawMany();

    return orders.map((r) => ({ day: r.day, revenue: parseFloat(r.revenue || '0') }));
  }
}
