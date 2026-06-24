"use client";
import { useState } from 'react';

export default function AccountSettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Setting</h2>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-lg space-y-6">
        <div>
          <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4">Notification preferences</h3>
          <div className="space-y-4">
            {[
              { label: 'Email notifications', description: 'Receive general account emails', value: emailNotifs, set: setEmailNotifs },
              { label: 'Order updates', description: 'Get notified when your order status changes', value: orderUpdates, set: setOrderUpdates },
              { label: 'Promotions & offers', description: 'Be the first to know about sales and new products', value: promotions, set: setPromotions },
            ].map(({ label, description, value, set }) => (
              <div key={label} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={value}
                  onClick={() => set(!value)}
                  className={`relative shrink-0 inline-flex h-6 w-10 rounded-full transition-colors duration-200 ${
                    value ? 'bg-[#2B5F3A]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 mt-1 ${
                      value ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {saved && (
          <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
            Settings saved successfully.
          </div>
        )}

        <button
          onClick={handleSave}
          className="bg-[#2B5F3A] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#224a2e] transition-colors"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
