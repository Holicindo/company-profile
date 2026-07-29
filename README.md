# Holicindo Web — holicindo.com

Company profile website rebuilt with NestJS + Next.js 14.

```
D:\Holicindo\
├── holicindo-web/          ← project ini (holicindo.com)
│   ├── package.json        ← ROOT — jalankan dari sini
│   ├── backend/            ← NestJS API  (port 3001)
│   └── frontend/           ← Next.js 14  (port 3000)
└── unit-passport-portal/   ← project berbeda (portal.holicindo.com)
```

---

## ⚡ Quick Start

### 1. Setup database

```sql
-- Di PostgreSQL
CREATE DATABASE holicindo_web;
```

### 2. Edit credentials

Edit `backend/.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword   ← ganti ini
DB_DATABASE=holicindo_web
JWT_SECRET=ganti-ini-di-production
```

### 3. Install & jalankan

```bash
cd D:\Holicindo\holicindo-web

# Install semua dependencies (sekali saja)
npm run install:all

# Import data dari WordPress XML + JSON
npm run seed

# Jalankan BE + FE sekaligus — satu terminal!
npm run dev
```

Output:
```
[API] 🚀 Holicindo API running on http://localhost:3001/api
[WEB] ▲ Next.js ready on http://localhost:3000
```

Buka browser: **http://localhost:3000**

---

## 📦 Scripts

| Command | Keterangan |
|---------|------------|
| `npm run dev` | Jalankan BE + FE bersamaan |
| `npm run seed` | Import data dari WordPress XML |
| `npm run build` | Build production BE + FE |
| `npm run start` | Jalankan production build |
| `npm run install:all` | Install deps root + backend + frontend |

---

## 🗂 Halaman

| URL | Keterangan |
|-----|------------|
| `/` | Homepage |
| `/about` | About Us |
| `/products` | Katalog produk |
| `/products/category/[slug]` | Produk per kategori |
| `/products/[slug]` | Detail produk |
| `/projects` | Project Experiences |
| `/projects/[slug]` | Detail proyek |
| `/news` | Blog & berita |
| `/news/[slug]` | Detail artikel |
| `/contact` | Formulir kontak |

---

## 🔌 API Endpoints (NestJS — port 3001)

```
GET  /api/products          ?page, limit, category, search, featured
GET  /api/products/:slug
GET  /api/products/featured
GET  /api/products/categories
GET  /api/products/categories/:slug
GET  /api/portfolio         ?page, limit
GET  /api/portfolio/:slug
GET  /api/portfolio/featured
GET  /api/blog              ?page, limit, search
GET  /api/blog/:slug
GET  /api/blog/latest
POST /api/contact
POST /api/auth/login        { email, password }
GET  /api/auth/me           (requires Bearer token)
```

**Admin default** (ganti setelah deploy!):
- Email: `admin@holicindo.com`
- Password: `Holic@2024!`

---

## 🚀 Deploy ke EC2 (holicindo.com)

```bash
# Build
npm run build

# Jalankan dengan PM2
pm2 start ecosystem.config.js

# Nginx — lihat nginx.conf di root project
sudo cp nginx.conf /etc/nginx/sites-available/holicindo.com
sudo ln -s /etc/nginx/sites-available/holicindo.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```
