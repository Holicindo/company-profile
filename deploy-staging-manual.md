# 🚀 Manual Deployment Guide - Staging

## Step-by-Step Deployment ke EC2 Staging

### 1️⃣ Connect ke EC2
```bash
ssh ubuntu@52.64.193.232
```
*Atau kalau pakai .pem file:*
```bash
ssh -i /path/to/your-key.pem ubuntu@52.64.193.232
```

---

### 2️⃣ Deploy Backend
```bash
cd ~/company-profile/backend

# Pull latest code
git pull origin staging

# Install dependencies
npm install

# Build
npm run build

# Run seeder (ini yang penting!)
npx ts-node -r tsconfig-paths/register src/seeder/seed-pages.ts

# Restart PM2
pm2 restart all

# Check status
pm2 list
pm2 logs --lines 20
```

---

### 3️⃣ Deploy Frontend
```bash
cd ~/company-profile/frontend

# Pull latest code
git pull origin staging

# Install dependencies
npm install

# Build
npm run build

# Restart PM2
pm2 restart all

# Check status
pm2 list
```

---

### 4️⃣ Verify Deployment

**Test API:**
```bash
curl http://localhost:3011/api/pages/slug/layanan
```

**Check Admin:**
- Buka browser: `https://staging.holicindo.com/admin`
- Login dengan: `admin@holicindo.com` / `Holic@2024!`
- Cek halaman Beranda, Tentang Kami, Layanan
- Coba klik tombol "+ Tambah Fitur"

**Check Frontend:**
- Buka: `https://staging.holicindo.com/services`
- Refresh (Ctrl+F5)
- Cek apakah data sudah muncul

---

### 5️⃣ Troubleshooting

**Kalau git pull error:**
```bash
git status
git stash
git pull origin staging
```

**Kalau PM2 tidak restart:**
```bash
pm2 delete all
cd ~/company-profile/backend
pm2 start npm --name "holicindo-compro-api" -- run start:prod
cd ~/company-profile/frontend
pm2 start npm --name "holicindo-frontend" -- start
pm2 save
```

**Kalau seeder error:**
```bash
# Check database connection
cat ~/company-profile/backend/.env | grep DATABASE

# Try running seeder again
cd ~/company-profile/backend
npx ts-node -r tsconfig-paths/register src/seeder/seed-pages.ts
```

---

## ✅ Success Indicators

Deployment berhasil kalau:
1. ✅ Seeder output: "✅ All pages seeded successfully!"
2. ✅ PM2 list menunjukkan semua process "online"
3. ✅ Admin page bisa dibuka dan tidak error
4. ✅ Tombol "+ Tambah Fitur" muncul di admin Layanan & Tentang Kami
5. ✅ Frontend menampilkan data yang benar

---

## 🎯 Expected Result

Setelah deployment:
- Admin Beranda → ✅ Ada data + tombol tambah
- Admin Tentang Kami → ✅ Ada data + tombol tambah
- Admin Layanan → ✅ Ada data + tombol tambah
- Frontend /services → ✅ Menampilkan data dari database
- Database staging → ✅ Terisi data initial dari seeder

---

## 🔗 URLs

- **Frontend:** https://staging.holicindo.com
- **Admin:** https://staging.holicindo.com/admin
- **API:** http://52.64.193.232:3011/api
- **API Layanan:** http://52.64.193.232:3011/api/pages/slug/layanan
