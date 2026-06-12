import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Renoyl',
  description: 'Renoyl terms and conditions of use.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl prose prose-gray">
      <h1>Terms &amp; Conditions</h1>
      <p className="text-gray-500 text-sm">Last updated: June 2026</p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or purchasing from Renoyl you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use this website.</p>

      <h2>2. Products</h2>
      <p>All product descriptions, images, and prices are subject to change without notice. We reserve the right to discontinue any product at any time.</p>

      <h2>3. Orders &amp; Payment</h2>
      <p>Orders are accepted subject to availability. Payment is processed securely via Stripe. We accept major credit and debit cards. Prices are shown in GBP unless otherwise stated.</p>

      <h2>4. Shipping</h2>
      <p>Please refer to our <a href="/shipping-returns" className="text-[#2B5F3A]">Shipping &amp; Returns</a> policy for full details.</p>

      <h2>5. Intellectual Property</h2>
      <p>All content on this website — including text, images, logos, and product descriptions — is the property of Renoyl and may not be reproduced without prior written permission.</p>

      <h2>6. Limitation of Liability</h2>
      <p>Renoyl shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>

      <h2>7. Governing Law</h2>
      <p>These terms are governed by the laws of England and Wales.</p>

      <h2>8. Contact</h2>
      <p>For any questions, contact us at <a href="mailto:info@renoyl.com" className="text-[#2B5F3A]">info@renoyl.com</a>.</p>
    </div>
  );
}
