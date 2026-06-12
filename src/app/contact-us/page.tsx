import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — Renoyl',
  description: 'Get in touch with the Renoyl team.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-10">
        Have a question or need help? Fill in the form and we&apos;ll respond within 1–2 business days.
      </p>
      <ContactForm />
    </div>
  );
}
