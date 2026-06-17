import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Product } from './products/product.entity';
import { User } from './users/user.entity';
import { Order } from './orders/order.entity';
import { OrderItem } from './orders/order-item.entity';
import { NewsletterSubscriber } from './newsletter/newsletter-subscriber.entity';
import * as bcrypt from 'bcrypt';

config();

const isProd = process.env.NODE_ENV === 'production';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: isProd ? { rejectUnauthorized: false } : false,
  entities: [User, Product, Order, OrderItem, NewsletterSubscriber],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();
  console.log('Connected to database');

  const productRepo = AppDataSource.getRepository(Product);
  const userRepo = AppDataSource.getRepository(User);

  // Seed admin user
  const existingAdmin = await userRepo.findOne({ where: { email: 'admin@renoyl.com' } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('Admin@12345', 10);
    const admin = userRepo.create({
      name: 'Renoyl Admin',
      email: 'admin@renoyl.com',
      passwordHash,
      role: 'admin' as any,
    });
    await userRepo.save(admin);
    console.log('Admin user created — email: admin@renoyl.com  password: Admin@12345');
  } else {
    console.log('Admin user already exists, skipping');
  }

  // Seed products from the existing static data
  const products = [
    {
      name: 'Essential Hair Oil (30ml)',
      price: 25,
      description:
        'Formulated with natural ingredients to nourish your hair and scalp. Our unique blend helps combat hair loss while promoting healthy growth.',
      ingredients: 'Jojoba Oil, Argan Oil, Rosemary Extract, Peppermint Oil, Vitamin E',
      images: ['/img/essential-oil.png'],
      stock: 100,
      stripePriceId: '', // fill in from Stripe dashboard
    },
    {
      name: 'Scalp Serum',
      price: 20,
      description:
        'Intensive treatment for scalp health. Helps reduce dandruff and itchiness while promoting hair growth.',
      ingredients: 'Aloe Vera, Tea Tree Oil, Biotin, Caffeine, Niacinamide',
      images: ['/img/essential-oil.png'],
      stock: 100,
      stripePriceId: '', // fill in from Stripe dashboard
    },
  ];

  for (const data of products) {
    const existing = await productRepo.findOne({ where: { name: data.name } });
    if (!existing) {
      const product = productRepo.create(data);
      await productRepo.save(product);
      console.log(`Seeded product: ${data.name}`);
    } else {
      console.log(`Product already exists: ${data.name}`);
    }
  }

  await AppDataSource.destroy();
  console.log('Seeding complete');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
