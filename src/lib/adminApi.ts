const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function adminFetch<T>(path: string, token: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export interface AdminProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  ingredients: string;
  images: string[];
  stock: number;
  isActive: boolean;
  createdAt: string;
}

export interface AdminOrder {
  id: string;
  stripeSessionId: string;
  stripePaymentIntent: string;
  customerEmail: string;
  customerName: string;
  shippingAddress: Record<string, string> | null;
  status: 'pending' | 'paid' | 'fulfilled' | 'refunded';
  totalAmount: number;
  createdAt: string;
  items: { productName: string; productPrice: number; quantity: number }[];
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface AnalyticsSummary {
  revenue: number;
  orderCount: number;
  avgOrderValue: number;
  topProducts: { name: string; quantity: number; revenue: number }[];
}

export interface RevenuePoint {
  day: string;
  revenue: number;
}

export interface ProductFormData {
  name: string;
  price: number;
  description?: string;
  ingredients?: string;
  stock: number;
  images?: string[];
  isActive?: boolean;
}

export const adminApi = {
  analytics: {
    summary: (token: string) =>
      adminFetch<AnalyticsSummary>('/analytics/summary', token),
    revenue: (token: string, period: '7d' | '30d' | '90d' = '30d') =>
      adminFetch<RevenuePoint[]>(`/analytics/revenue?period=${period}`, token),
  },

  products: {
    list: (token: string) =>
      adminFetch<AdminProduct[]>('/products/admin/all', token),
    get: (token: string, id: string) =>
      adminFetch<AdminProduct>(`/products/${id}`, token),
    create: (token: string, data: ProductFormData) =>
      adminFetch<AdminProduct>('/products', token, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    update: (token: string, id: string, data: Partial<ProductFormData>) =>
      adminFetch<AdminProduct>(`/products/${id}`, token, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    remove: (token: string, id: string) =>
      adminFetch<void>(`/products/${id}`, token, { method: 'DELETE' }),
    uploadImage: async (token: string, file: File): Promise<string> => {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({ message: 'Upload failed' }));
        throw new Error(error.message || 'Upload failed');
      }
      const { url } = await res.json();
      return url as string;
    },
  },

  orders: {
    list: (token: string) =>
      adminFetch<AdminOrder[]>('/orders', token),
    get: (token: string, id: string) =>
      adminFetch<AdminOrder>(`/orders/${id}`, token),
    updateStatus: (token: string, id: string, status: string) =>
      adminFetch<AdminOrder>(`/orders/${id}/status`, token, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
    refund: (token: string, id: string) =>
      adminFetch<{ message: string }>(`/orders/${id}/refund`, token, { method: 'POST' }),
  },

  users: {
    list: (token: string) =>
      adminFetch<AdminUser[]>('/users', token),
  },
};
