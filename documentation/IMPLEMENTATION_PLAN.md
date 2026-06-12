# Renoyl — Implementation Plan & Pending Features

> Last updated: 2026-06-12

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Current State Audit](#2-current-state-audit)
3. [Architecture Design](#3-architecture-design)
4. [Database Design](#4-database-design)
5. [Pending Features](#5-pending-features)
6. [Implementation Phases](#6-implementation-phases)
7. [API Design](#7-api-design)
8. [Admin Module Design](#8-admin-module-design)
9. [Frontend Pages Reference](#9-frontend-pages-reference)

---

## 1. Project Overview

**Renoyl** is a haircare ecommerce brand selling products such as Essential Hair Oil and Scalp Serum. The platform allows customers to browse products, add them to a cart, and complete purchases via Stripe.

### Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Frontend | Next.js 15 (App Router) | Static export, TypeScript |
| Backend | NestJS | New — lives in `backend/` subfolder |
| Database | PostgreSQL | Hosted (e.g. Supabase, Railway, Render) |
| ORM | TypeORM via `@nestjs/typeorm` | Entity decorators, CLI migrations |
| Payments | Stripe | Checkout Sessions + Webhooks |
| Image Storage | Cloudinary | Product image uploads |
| Email | Resend | Transactional emails |
| Auth | JWT | Issued by NestJS, httpOnly cookie on frontend |
| State (cart) | Zustand | Client-side only, persisted to localStorage |
| Styling | Tailwind CSS v4 | Custom brand colour tokens |

### Monorepo Structure

```
renoyl/
├── src/                        ← Next.js frontend (existing)
│   ├── app/                    ← App Router pages
│   ├── components/             ← React components
│   ├── store/                  ← Zustand cart store
│   └── data/                   ← Static product data (to be retired)
├── backend/                    ← NestJS API (new)
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── stripe/
│   │   ├── analytics/
│   │   ├── upload/
│   │   ├── email/
│   │   └── newsletter/
│   └── migrations/
├── documentation/              ← This folder
└── public/
    └── img/
```

---

## 2. Current State Audit

### What Is Working

| Feature | Status | Location |
|---|---|---|
| Product listing (homepage) | Working | `src/app/page.tsx` |
| Product detail page | Working | `src/app/products/[id]/page.tsx` |
| Shopping cart (add/remove/update) | Working | `src/store/zustandStore.ts` |
| Cart dropdown in header | Working | `src/components/Header.tsx` |
| Stripe checkout session creation | Working (partial) | `src/app/api/checkout_sessions/route.ts` |
| About page | Working | `src/app/about/page.tsx` |
| Success / Cancel pages | Working (basic) | `src/app/success/`, `src/app/cancel/` |
| Responsive layout + mobile menu | Working | `src/components/Header.tsx` |
| Hero, Reviews, Gallery sections | Working | Various components |

### What Is Broken or Incomplete

| Feature | Issue |
|---|---|
| Authentication | NextAuth fully commented out. Sign-in page renders empty divs |
| Checkout form | HTML mock only — no Stripe Elements, no submit handler |
| Product data | Hardcoded in `src/data/products.ts` with placeholder Stripe price IDs |
| Order recording | No webhook. Payments succeed on Stripe but are never stored |
| Admin module | Does not exist |
| Newsletter form | `console.log`s email only — no service connected |
| Footer links | `/contact-us`, `/shipping-returns`, `/terms-conditions`, `/privacy-policy` all 404 |
| Shop page | "Shop" nav link points to `#` — page does not exist |
| User account | No account or order history page |
| Duplicate cart store | `src/store/cartStore.ts` is unused — duplicate of `zustandStore.ts` |

---

## 3. Architecture Design

### System Diagram

```
┌─────────────────────────────────────────┐
│           Next.js Frontend              │
│  (Browser — SSG + Client Components)   │
└──────────────┬──────────────────────────┘
               │ REST (JSON)
               ▼
┌─────────────────────────────────────────┐
│           NestJS Backend API            │
│         (backend/ subfolder)            │
│                                         │
│  AuthModule     ProductsModule          │
│  UsersModule    OrdersModule            │
│  StripeModule   AnalyticsModule         │
│  UploadModule   EmailModule             │
│  NewsletterModule                       │
└────────┬───────────────┬────────────────┘
         │               │
         ▼               ▼
┌──────────────┐  ┌─────────────────────┐
│  PostgreSQL  │  │  External Services  │
│  (TypeORM)   │  │  • Stripe API       │
│              │  │  • Cloudinary       │
│              │  │  • Resend (email)   │
└──────────────┘  └─────────────────────┘
```

### Authentication Flow

```
1. Customer submits login form (Next.js)
2. POST /auth/login → NestJS validates credentials
3. NestJS returns JWT access token + refresh token
4. Next.js stores access token in httpOnly cookie
5. All subsequent API calls include cookie
6. NestJS JwtAuthGuard validates token on protected routes
7. RolesGuard checks role (customer | admin) for admin routes
```

### Stripe Payment Flow

```
1. Customer clicks "Buy Now" (Next.js)
2. POST /stripe/checkout-session → NestJS creates Stripe session
3. Customer redirected to Stripe-hosted checkout page
4. Stripe processes payment
5. Stripe fires webhook → POST /stripe/webhook (NestJS)
6. NestJS verifies webhook signature
7. On checkout.session.completed:
   - Create Order record in PostgreSQL
   - Create OrderItem records
   - Send confirmation email via Resend
8. Customer redirected to /success page
9. /success fetches order from GET /orders/:sessionId
```

---

## 4. Database Design

### Entities & Relationships

```
User ──────────< Order >────────── OrderItem >────── Product
                                                         │
                                                   (price snapshot
                                                    at time of order)
NewsletterSubscriber (standalone)
```

### Entity Definitions

#### User
```
id              UUID            PK
email           VARCHAR(255)    UNIQUE NOT NULL
passwordHash    VARCHAR         NOT NULL
name            VARCHAR(255)
role            ENUM            customer | admin  DEFAULT customer
createdAt       TIMESTAMP
updatedAt       TIMESTAMP
```

#### Product
```
id              UUID            PK
name            VARCHAR(255)    NOT NULL
price           DECIMAL(10,2)   NOT NULL
description     TEXT
ingredients     TEXT
images          VARCHAR[]       (Cloudinary URLs)
stock           INTEGER         DEFAULT 0
isActive        BOOLEAN         DEFAULT true
stripePriceId   VARCHAR(255)
stripeProductId VARCHAR(255)
createdAt       TIMESTAMP
updatedAt       TIMESTAMP
```

#### Order
```
id                  UUID        PK
stripeSessionId     VARCHAR     UNIQUE NOT NULL
stripePaymentIntent VARCHAR
customerEmail       VARCHAR     NOT NULL
customerName        VARCHAR
shippingAddress     JSONB
status              ENUM        pending | paid | fulfilled | refunded
totalAmount         DECIMAL(10,2)
userId              UUID        FK → User (nullable — guest checkout)
createdAt           TIMESTAMP
updatedAt           TIMESTAMP
```

#### OrderItem
```
id              UUID        PK
orderId         UUID        FK → Order
productId       UUID        FK → Product (nullable — product may be deleted)
productName     VARCHAR     (snapshot at time of purchase)
productPrice    DECIMAL     (snapshot at time of purchase)
quantity        INTEGER
```

#### NewsletterSubscriber
```
id              UUID        PK
email           VARCHAR     UNIQUE NOT NULL
subscribedAt    TIMESTAMP
```

---

## 5. Pending Features

### A. Backend — NestJS (All New)

| ID | Feature | Priority |
|---|---|---|
| A1 | NestJS project scaffold in `backend/` | Critical |
| A2 | PostgreSQL + TypeORM setup and entity definitions | Critical |
| A3 | Auth module — register, login, JWT, refresh tokens | Critical |
| A4 | Role-based guard (customer / admin) | Critical |
| A5 | Products module — full CRUD endpoints | Critical |
| A6 | Image upload endpoint via Cloudinary | High |
| A7 | Stripe module — migrate checkout session from Next.js API route | High |
| A8 | Stripe webhook handler (`checkout.session.completed`, refund events) | High |
| A9 | Orders module — create, list, get by ID, update status | High |
| A10 | Analytics module — revenue, order count, top products, avg order value | Medium |
| A11 | Email module — order confirmation and welcome emails via Resend | Medium |
| A12 | Newsletter subscription endpoint | Low |
| A13 | User profile endpoint — update name, email, password | Medium |
| A14 | Contact form endpoint — receives message and sends email notification | Low |

### B. Database

| ID | Task | Priority |
|---|---|---|
| B1 | Define `User` entity with TypeORM decorators | Critical |
| B2 | Define `Product` entity | Critical |
| B3 | Define `Order` entity | Critical |
| B4 | Define `OrderItem` entity | Critical |
| B5 | Define `NewsletterSubscriber` entity | Low |
| B6 | Generate and run initial migration | Critical |
| B7 | Seed script — migrate 2 existing products from `products.ts` into DB | High |

### C. Frontend — Next.js Changes

| ID | Feature | Priority |
|---|---|---|
| C1 | Replace static `products.ts` — fetch products from NestJS API | Critical |
| C2 | Sign-in and sign-up pages wired to NestJS JWT auth | Critical |
| C3 | JWT cookie handling and protected route middleware | Critical |
| C4 | Connect `CheckoutButton` to NestJS checkout session endpoint | High |
| C5 | Update `/success` page to fetch and display real order from API | High |
| C6 | User account page `/account` — profile and order history | Medium |
| C7 | Shop / catalog page `/shop` — product grid with filter and sort | Medium |
| C8 | Contact page `/contact-us` with form | Low |
| C9 | Shipping & Returns page `/shipping-returns` | Low |
| C10 | Terms & Conditions page `/terms-conditions` | Low |
| C11 | Privacy Policy page `/privacy-policy` | Low |
| C12 | Newsletter form → POST to NestJS endpoint | Low |
| C13 | Delete unused `src/store/cartStore.ts` | Low |
| C14 | Fix "Shop" nav link to point to `/shop` | Low |

### D. Admin Module — Frontend UI

| ID | Screen / Feature | Priority |
|---|---|---|
| D1 | Admin layout with sidebar, protected by admin role guard | Critical |
| D2 | `/admin` — Dashboard with revenue chart, order count, top products | High |
| D3 | `/admin/products` — Product table with active/inactive toggle | High |
| D4 | `/admin/products/new` — Create product form with image upload | High |
| D5 | `/admin/products/[id]/edit` — Edit product details, price, stock | High |
| D6 | `/admin/orders` — Orders table with date and status filters | High |
| D7 | `/admin/orders/[id]` — Order detail with fulfil and refund actions | High |
| D8 | `/admin/users` — Read-only customer list | Medium |

---

## 6. Implementation Phases

---

### Phase 1 — Backend Foundation
**Timeline:** Week 1–2  
**Goal:** NestJS is running, database is live, products are served dynamically from PostgreSQL

#### Tasks

**Backend Setup**
- [ ] Scaffold NestJS project inside `backend/` with TypeScript
- [ ] Install `@nestjs/typeorm`, `typeorm`, `pg`, `@nestjs/config`
- [ ] Configure `TypeOrmModule.forRoot()` with PostgreSQL connection via `.env`
- [ ] Set up `ConfigModule` for environment variable management
- [ ] Configure CORS to allow requests from the Next.js origin

**Entities & Database**
- [ ] Define `User` entity (`users/user.entity.ts`)
- [ ] Define `Product` entity (`products/product.entity.ts`)
- [ ] Define `Order` entity (`orders/order.entity.ts`)
- [ ] Define `OrderItem` entity (`orders/order-item.entity.ts`)
- [ ] Run initial TypeORM migration
- [ ] Write seed script to insert existing 2 products into DB

**Auth Module**
- [ ] Install `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `bcrypt`
- [ ] `POST /auth/register` — hash password, create user
- [ ] `POST /auth/login` — validate credentials, return JWT
- [ ] `JwtAuthGuard` — protect routes requiring authentication
- [ ] `RolesGuard` + `@Roles()` decorator — restrict admin routes

**Products Module**
- [ ] `GET /products` — list all active products
- [ ] `GET /products/:id` — single product detail

**Frontend Integration**
- [ ] Update `ProductGrid` and `ProductCard` to fetch from `GET /products`
- [ ] Update product detail page to fetch from `GET /products/:id`
- [ ] Remove dependency on `src/data/products.ts`

**Deliverable:** Products load from PostgreSQL. Auth endpoints are live and testable via Postman.

---

### Phase 2 — Payments & Orders
**Timeline:** Week 2–3  
**Goal:** Every Stripe payment is captured as an order in the database

#### Tasks

**Stripe Module (NestJS)**
- [ ] Install `stripe` in backend
- [ ] Move checkout session creation from Next.js API route → `POST /stripe/checkout-session`
- [ ] Build `POST /stripe/webhook` with Stripe signature verification
- [ ] Handle `checkout.session.completed` → create `Order` + `OrderItems`
- [ ] Handle `charge.refunded` → update order status to `refunded`
- [ ] Handle `payment_intent.payment_failed` → update order status

**Orders Module**
- [ ] `GET /orders` — list all orders (admin only)
- [ ] `GET /orders/mine` — list current user's orders (authenticated customer)
- [ ] `GET /orders/:id` — single order detail
- [ ] `PATCH /orders/:id/status` — update order status (admin only)

**Email Module**
- [ ] Install and configure Resend SDK
- [ ] Order confirmation email template (sent on `checkout.session.completed`)
- [ ] Welcome email template (sent on user register)

**Frontend Updates**
- [ ] Update `CheckoutButton` to call `POST /stripe/checkout-session` on NestJS
- [ ] Remove `src/app/api/checkout_sessions/route.ts` (replaced by NestJS)
- [ ] Update `/success` page to call `GET /orders?sessionId=X` and display real order data

**Deliverable:** Every successful payment creates a DB record and triggers a confirmation email.

---

### Phase 3 — Admin Module
**Timeline:** Week 3–4  
**Goal:** Non-technical admin can manage all products and orders from a browser UI

#### Tasks

**Backend — Admin Endpoints**
- [ ] `POST /products` — create product (admin only)
- [ ] `PATCH /products/:id` — update product (admin only)
- [ ] `DELETE /products/:id` — soft delete / deactivate product (admin only)
- [ ] `POST /upload` — upload image to Cloudinary, return URL (admin only)
- [ ] `POST /orders/:id/refund` — trigger Stripe refund (admin only)
- [ ] `GET /analytics/summary` — revenue total, order count, top 5 products, avg order value

**Upload Module**
- [ ] Install `cloudinary` and `multer`
- [ ] `POST /upload` — accepts multipart file, uploads to Cloudinary, returns secure URL
- [ ] Validate file type (jpg, png, webp only) and max size (5MB)

**Frontend — Admin UI**
- [ ] Create `/admin` route group with shared sidebar layout
- [ ] Admin route guard — redirect non-admin users to homepage
- [ ] `/admin` — Dashboard: revenue chart (Recharts), orders this week, top products
- [ ] `/admin/products` — Data table: name, price, stock, status toggle, edit/delete actions
- [ ] `/admin/products/new` — Form: name, price, description, ingredients, image upload, stock
- [ ] `/admin/products/[id]/edit` — Pre-filled form with same fields
- [ ] `/admin/orders` — Table: order ID, customer, date, total, status badge, filter controls
- [ ] `/admin/orders/[id]` — Detail view: line items, shipping address, status update, refund button
- [ ] `/admin/users` — Read-only customer list: name, email, join date, order count

**Deliverable:** Admin can add products with images, view all orders, mark orders as fulfilled, and see a revenue overview — no code changes required.

---

### Phase 4 — Customer Features
**Timeline:** Week 4–5  
**Goal:** Customers have accounts, can log in, and track their orders

#### Tasks

**Frontend — Auth**
- [ ] Build sign-up page (`/signup`) — name, email, password, calls `POST /auth/register`
- [ ] Build sign-in page (`/signin`) — email, password, calls `POST /auth/login`
- [ ] Store JWT in httpOnly cookie on successful login
- [ ] Auth context / hook (`useAuth`) — expose user state to components
- [ ] Update `Header` to show account menu when logged in vs sign-in link when logged out
- [ ] Protected route middleware — redirect unauthenticated users from `/account`

**Frontend — Account**
- [ ] `/account` — Profile: display name and email, update form
- [ ] `/account/orders` — Order history table: date, items, total, status
- [ ] `/account/orders/[id]` — Order detail view

**Frontend — Shop**
- [ ] `/shop` — Full product catalog with search input, price sort (low/high), active filters
- [ ] Fix "Shop" link in `Navigation` to point to `/shop`
- [ ] Pre-fill customer email and name in checkout if user is logged in

**Newsletter**
- [ ] Wire footer newsletter form to `POST /newsletter/subscribe` on NestJS
- [ ] Define `NewsletterSubscriber` entity and module in backend

**Deliverable:** Customers can register, log in, browse the full catalogue, and view their order history.

---

### Phase 5 — Content Pages & Production Polish
**Timeline:** Week 5–6  
**Goal:** All pages exist, all links work, site is ready for production

#### Tasks

**Content Pages**
- [ ] `/contact-us` — Contact form (name, email, message) → `POST /contact` → NestJS sends email
- [ ] `/shipping-returns` — Static content page
- [ ] `/terms-conditions` — Static content page
- [ ] `/privacy-policy` — Static content page

**Code Cleanup**
- [ ] Delete `src/store/cartStore.ts` (unused duplicate)
- [ ] Remove `src/lib/auth.ts` NextAuth stub
- [ ] Remove `src/actions/authActions.ts` NextAuth stubs
- [ ] Remove `src/components/AuthProvider.tsx` and `AuthModal.tsx` if unused
- [ ] Remove `src/app/api/checkout_sessions/route.ts` (replaced by NestJS)

**Security & Validation**
- [ ] Add `class-validator` + `class-transformer` to all NestJS DTOs
- [ ] Add `@nestjs/throttler` rate limiting on auth and contact endpoints
- [ ] Set secure, httpOnly, sameSite cookie flags on JWT in production
- [ ] Validate Stripe webhook signature on every webhook call
- [ ] Add CORS whitelist for production domain

**SEO & Performance**
- [ ] Add `metadata` exports to all Next.js pages (title, description)
- [ ] Add Open Graph tags to product detail pages
- [ ] Lazy-load below-fold images
- [ ] Review and set production environment variables

**Environment Variables Checklist**

*Frontend (`.env.local`)*
```
NEXT_PUBLIC_API_URL=https://api.renoyl.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

*Backend (`backend/.env`)*
```
DATABASE_URL=postgresql://...
JWT_SECRET=...
JWT_REFRESH_SECRET=...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
RESEND_API_KEY=re_...
```

**Deliverable:** Fully functional, production-ready ecommerce site with no broken links, real auth, real payments, and admin control panel.

---

## 7. API Design

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Create customer account |
| POST | `/auth/login` | Public | Login, returns JWT |
| POST | `/auth/logout` | Authenticated | Invalidate session |
| GET | `/auth/me` | Authenticated | Get current user |

### Products

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/products` | Public | List all active products |
| GET | `/products/:id` | Public | Single product |
| POST | `/products` | Admin | Create product |
| PATCH | `/products/:id` | Admin | Update product |
| DELETE | `/products/:id` | Admin | Deactivate product |

### Orders

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/orders` | Admin | All orders |
| GET | `/orders/mine` | Customer | Current user's orders |
| GET | `/orders/:id` | Admin / Owner | Order detail |
| PATCH | `/orders/:id/status` | Admin | Update fulfillment status |
| POST | `/orders/:id/refund` | Admin | Trigger Stripe refund |

### Stripe

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/stripe/checkout-session` | Public | Create Stripe checkout session |
| POST | `/stripe/webhook` | Stripe signature | Handle Stripe events |

### Analytics

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/analytics/summary` | Admin | Revenue, orders, top products |
| GET | `/analytics/revenue` | Admin | Revenue over time (query: `?period=7d|30d|90d`) |

### Upload

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/upload` | Admin | Upload image to Cloudinary |

### Users

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/users` | Admin | List all customers |
| GET | `/users/:id` | Admin | User detail |
| PATCH | `/users/me` | Customer | Update own profile |

### Newsletter

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/newsletter/subscribe` | Public | Subscribe email |

---

## 8. Admin Module Design

### Sidebar Navigation

```
Renoyl Admin
├── Dashboard          /admin
├── Products
│   ├── All Products   /admin/products
│   └── Add New        /admin/products/new
├── Orders             /admin/orders
├── Customers          /admin/users
└── Settings           /admin/settings  (future)
```

### Dashboard Widgets

| Widget | Data Source |
|---|---|
| Total Revenue (this month) | `GET /analytics/summary` |
| Orders This Week | `GET /analytics/summary` |
| Average Order Value | `GET /analytics/summary` |
| Low Stock Alert | Products where `stock < 5` |
| Revenue Chart (30 days) | `GET /analytics/revenue?period=30d` |
| Top 5 Products | `GET /analytics/summary` |
| Recent Orders (last 5) | `GET /orders?limit=5` |

### Order Status Flow

```
pending → paid → fulfilled
                     ↓
              refunded (via Stripe)
```

---

## 9. Frontend Pages Reference

### Public Pages

| Route | Component | Status |
|---|---|---|
| `/` | Homepage | Existing — needs API integration |
| `/products/:id` | Product Detail | Existing — needs API integration |
| `/about` | About | Existing |
| `/shop` | Shop Catalog | To be built |
| `/contact-us` | Contact | To be built |
| `/shipping-returns` | Shipping Info | To be built |
| `/terms-conditions` | Terms | To be built |
| `/privacy-policy` | Privacy | To be built |
| `/success` | Order Success | Existing — needs order data |
| `/cancel` | Payment Cancelled | Existing |

### Auth Pages

| Route | Status |
|---|---|
| `/signin` | Needs rebuild — currently empty |
| `/signup` | To be built |

### Customer Pages (Protected)

| Route | Status |
|---|---|
| `/account` | To be built |
| `/account/orders` | To be built |
| `/account/orders/:id` | To be built |

### Admin Pages (Admin Role Required)

| Route | Status |
|---|---|
| `/admin` | To be built |
| `/admin/products` | To be built |
| `/admin/products/new` | To be built |
| `/admin/products/:id/edit` | To be built |
| `/admin/orders` | To be built |
| `/admin/orders/:id` | To be built |
| `/admin/users` | To be built |
