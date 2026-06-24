"use client";
import { CreditCard } from 'lucide-react';

export default function AccountPaymentPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment</h2>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-5 uppercase tracking-widest">Saved cards</h3>

        <div className="text-center py-8 border border-dashed border-gray-200 rounded-xl mb-5">
          <CreditCard className="w-10 h-10 text-gray-200 mx-auto mb-3" />
          <p className="text-sm text-gray-500 mb-1">No saved payment methods</p>
          <p className="text-xs text-gray-400">
            Your payment details are securely handled by Stripe.
          </p>
        </div>

        <p className="text-xs text-gray-400 text-center">
          Saved card management is coming soon.
        </p>
      </div>
    </div>
  );
}
