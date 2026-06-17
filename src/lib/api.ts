const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface ApiProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  ingredients: string;
  images: string[];
  stock: number;
  isActive: boolean;
  stripePriceId: string;
  stripeProductId: string;
  createdAt: string;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    cache: 'no-store',
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  products: {
    list: () => apiFetch<ApiProduct[]>('/products'),
    get: (id: string) => apiFetch<ApiProduct>(`/products/${id}`),
  },
  auth: {
    register: (body: { name: string; email: string; password: string }) =>
      apiFetch<{ accessToken: string; user: object }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    login: (body: { email: string; password: string }) =>
      apiFetch<{ accessToken: string; user: object }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    me: (token: string) =>
      apiFetch<ApiProduct>('/auth/me', { headers: { Authorization: `Bearer ${token}` } }),
  },
  stripe: {
    createCheckoutSession: (body: { priceId: string; origin: string }) =>
      apiFetch<{ sessionId: string }>('/stripe/checkout-session', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  },
  newsletter: {
    subscribe: (email: string) =>
      apiFetch('/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
  },
};
