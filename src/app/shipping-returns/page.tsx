import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Returns — Renoyl',
  description: 'Renoyl shipping and returns policy.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl prose prose-gray">
      <h1>Shipping &amp; Returns</h1>

      <h2>Shipping</h2>
      <p>We ship to the UK, US, Canada, Australia, Nigeria, South Africa, and Ghana.</p>
      <ul>
        <li><strong>Standard shipping:</strong> 5–10 business days</li>
        <li><strong>Express shipping:</strong> 2–3 business days (where available)</li>
      </ul>
      <p>Orders are processed within 1–2 business days. You will receive a tracking number by email once your order has shipped.</p>

      <h2>Returns</h2>
      <p>
        We accept returns within <strong>30 days</strong> of delivery for unused, unopened products in their original packaging.
        To initiate a return, email us at{' '}
        <a href="mailto:info@renoyl.com" className="text-[#2B5F3A]">info@renoyl.com</a> with your order number.
      </p>
      <p>Return shipping costs are the responsibility of the customer unless the item is faulty or was sent in error.</p>
      <p>Refunds are processed within 5–10 business days of receiving the returned item.</p>

      <h2>Damaged or Faulty Items</h2>
      <p>
        If you receive a damaged or faulty product, please contact us at{' '}
        <a href="mailto:info@renoyl.com" className="text-[#2B5F3A]">info@renoyl.com</a> within 7 days of delivery
        with a photo and your order number. We will arrange a replacement or full refund at no extra cost.
      </p>
    </div>
  );
}
