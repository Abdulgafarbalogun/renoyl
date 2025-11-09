# Renoyl - A Next.js E-commerce Site

This is a [Next.js](https://nextjs.org) project for a simple e-commerce website. It is configured for static site generation for easy deployment on any web hosting service.

## Features

- **Static Site Generation**: The entire site is pre-built into HTML, CSS, and JavaScript files for maximum performance and portability.
- **Product Showcase**: Displays products from a static data source.
- **Shopping Cart**: Client-side cart functionality using Zustand for state management.
- **Stripe Integration**: Client-side payment processing with Stripe Checkout.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a file named `.env.local` in the root of your project and add your Stripe publishable key.

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY
```

You can find your API keys in the [Stripe Dashboard](https://dashboard.stripe.com/apikeys).

### 4. Update Product Information

Product data is managed statically in `src/data/products.ts`. To add or modify products, you need to edit this file.

Each product requires a `priceId` from your Stripe account. To create products and prices in Stripe:

1.  Go to the **Products** section in your [Stripe Dashboard](https://dashboard.stripe.com/products).
2.  Click **+ Add product**.
3.  Fill in the product details (name, description, image).
4.  Under **Pricing**, set the price.
5.  After saving, click on the product to view its details.
6.  In the **Pricing** section, you will find the **API ID** for the price (e.g., `price_1...`). This is the `priceId` you need to add to your `products.ts` file.

Example `products.ts` entry:

```typescript
{
  id: 1,
  name: 'Renoyl Hair Growth Oil',
  description: 'A potent blend for stimulating hair growth.',
  price: 55.00,
  image: '/img/product1.jpg',
  priceId: 'price_1PEXAMPLE...', // Your Stripe Price ID here
},
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Build the static site

To build the site for production, run:

```bash
npm run build
```

This command will generate a static version of your site in the `out/` directory.

### Deploy

Upload the contents of the `out/` directory to any static hosting provider, such as:

-   Vercel
-   Netlify
-   GitHub Pages
-   Any shared hosting service that can serve static files.

Since the site is fully static, no Node.js server is required for deployment.

## Technical Stack

-   **Framework**: [Next.js](https://nextjs.org/) (with Static Site Generation)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **Payments**: [Stripe Checkout](https://stripe.com/docs/checkout)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
