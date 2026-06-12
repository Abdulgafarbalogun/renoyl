import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Renoyl',
  description: 'Renoyl privacy policy — how we collect and use your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl prose prose-gray">
      <h1>Privacy Policy</h1>
      <p className="text-gray-500 text-sm">Last updated: June 2026</p>

      <h2>1. Information We Collect</h2>
      <p>We collect information you provide directly, including:</p>
      <ul>
        <li>Name and email address (account registration, newsletter sign-up, contact form)</li>
        <li>Shipping address and payment details (processed securely by Stripe — we never store card numbers)</li>
        <li>Order history</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To process and fulfil your orders</li>
        <li>To send order confirmation and shipping notifications</li>
        <li>To respond to enquiries</li>
        <li>To send marketing emails (only with your consent — you may unsubscribe at any time)</li>
      </ul>

      <h2>3. Data Sharing</h2>
      <p>We do not sell your personal data. We share it only with:</p>
      <ul>
        <li><strong>Stripe</strong> — payment processing</li>
        <li><strong>Resend</strong> — transactional email delivery</li>
        <li><strong>Cloudinary</strong> — image hosting</li>
      </ul>

      <h2>4. Data Retention</h2>
      <p>We retain your data for as long as your account is active or as required to fulfil legal obligations.</p>

      <h2>5. Your Rights</h2>
      <p>Under UK GDPR you have the right to access, correct, or delete your personal data. Contact us at <a href="mailto:info@renoyl.com" className="text-[#2B5F3A]">info@renoyl.com</a> to exercise these rights.</p>

      <h2>6. Cookies</h2>
      <p>We use essential cookies only (session management, cart persistence). No third-party tracking cookies are used.</p>

      <h2>7. Contact</h2>
      <p>Privacy enquiries: <a href="mailto:info@renoyl.com" className="text-[#2B5F3A]">info@renoyl.com</a></p>
    </div>
  );
}
