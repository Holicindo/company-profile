// Helper untuk semua admin API calls dengan auto-inject Authorization header

const BASE = '/api';

function getToken(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('holic_admin_token') || '';
}

function authHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

async function handleResponse(res: Response) {
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try { const err = await res.json(); msg = err.message || msg; } catch {}
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  return res.json();
}

// Timeout 60 detik untuk koneksi ke Supabase yang lambat dari localhost
async function apiFetch(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 60000);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

// ── Auth ────────────────────────────────────────────────────────────────────

export async function adminLogin(email: string, password: string) {
  const res = await apiFetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

export async function adminMe() {
  const res = await apiFetch(`${BASE}/auth/me`, { headers: authHeaders() });
  return handleResponse(res);
}

// ── Blog ────────────────────────────────────────────────────────────────────

export async function fetchAdminBlogs(page = 1, limit = 20) {
  const res = await apiFetch(`${BASE}/blog/admin/all?page=${page}&limit=${limit}`, { headers: authHeaders() });
  return handleResponse(res);
}

export async function createBlog(data: any) {
  const res = await apiFetch(`${BASE}/blog/admin`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateBlog(id: number, data: any) {
  const res = await apiFetch(`${BASE}/blog/admin/${id}`, {
    method: 'PATCH', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteBlog(id: number) {
  const res = await apiFetch(`${BASE}/blog/admin/${id}`, {
    method: 'DELETE', headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function fetchBlogById(id: number) {
  const res = await apiFetch(`${BASE}/blog/admin/all?page=1&limit=999`, { headers: authHeaders() });
  const data = await handleResponse(res);
  return data?.items?.find((p: any) => p.id === id) ?? null;
}

// ── Products ────────────────────────────────────────────────────────────────

export async function fetchAdminProducts(page = 1, limit = 20, search?: string, category?: string) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (search) params.set('search', search);
  if (category) params.set('category', category);
  const res = await apiFetch(`${BASE}/products/admin/all?${params}`, { headers: authHeaders() });
  return handleResponse(res);
}

export async function fetchProductById(id: number) {
  // Admin all endpoint, cari by id
  const res = await apiFetch(`${BASE}/products/admin/all?page=1&limit=999`, { headers: authHeaders() });
  const data = await handleResponse(res);
  return data?.items?.find((p: any) => p.id === id) ?? null;
}

export async function fetchCategories() {
  const res = await apiFetch(`${BASE}/products/categories`);
  return handleResponse(res);
}

export async function createProduct(data: any) {
  const res = await apiFetch(`${BASE}/products/admin`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateProduct(id: number, data: any) {
  const res = await apiFetch(`${BASE}/products/admin/${id}`, {
    method: 'PATCH', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteProduct(id: number) {
  const res = await apiFetch(`${BASE}/products/admin/${id}`, {
    method: 'DELETE', headers: authHeaders(),
  });
  return handleResponse(res);
}

// ── Portfolio ───────────────────────────────────────────────────────────────

export async function fetchAdminPortfolio(page = 1, limit = 20) {
  const res = await apiFetch(`${BASE}/portfolio/admin/all?page=${page}&limit=${limit}`, { headers: authHeaders() });
  return handleResponse(res);
}

export async function fetchPortfolioById(id: number) {
  const res = await apiFetch(`${BASE}/portfolio/admin/all?page=1&limit=999`, { headers: authHeaders() });
  const data = await handleResponse(res);
  return data?.items?.find((p: any) => p.id === id) ?? null;
}

export async function createPortfolio(data: any) {
  const res = await apiFetch(`${BASE}/portfolio/admin`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updatePortfolio(id: number, data: any) {
  const res = await apiFetch(`${BASE}/portfolio/admin/${id}`, {
    method: 'PATCH', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deletePortfolio(id: number) {
  const res = await apiFetch(`${BASE}/portfolio/admin/${id}`, {
    method: 'DELETE', headers: authHeaders(),
  });
  return handleResponse(res);
}

// ── Contacts ────────────────────────────────────────────────────────────────

export async function fetchAdminContacts(page = 1, limit = 20, status?: string) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (status) params.set('status', status);
  const res = await apiFetch(`${BASE}/contact/admin?${params}`, { headers: authHeaders() });
  return handleResponse(res);
}

export async function updateContactStatus(id: number, status: string) {
  const res = await apiFetch(`${BASE}/contact/admin/${id}`, {
    method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ status }),
  });
  return handleResponse(res);
}

export async function deleteContact(id: number) {
  const res = await apiFetch(`${BASE}/contact/admin/${id}`, {
    method: 'DELETE', headers: authHeaders(),
  });
  return handleResponse(res);
}

// ── Dashboard stats ─────────────────────────────────────────────────────────

export async function fetchDashboardStats() {
  // Sequential untuk hindari overload koneksi Supabase
  const blogs = await fetchAdminBlogs(1, 1).catch(() => ({ total: 0 }));
  const products = await fetchAdminProducts(1, 1).catch(() => ({ total: 0 }));
  const portfolio = await fetchAdminPortfolio(1, 1).catch(() => ({ total: 0 }));
  const contacts = await fetchAdminContacts(1, 1, 'new').catch(() => ({ total: 0 }));
  return {
    totalBlogs: blogs?.total ?? 0,
    totalProducts: products?.total ?? 0,
    totalPortfolio: portfolio?.total ?? 0,
    unreadContacts: contacts?.total ?? 0,
  };
}
