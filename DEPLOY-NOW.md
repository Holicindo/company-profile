# 🚀 DEPLOYMENT COMMANDS - COPY PASTE LANGSUNG

## 📋 Step-by-Step Deploy ke Staging

Buka **Terminal VSCode** (Ctrl+Shift+`) lalu copy-paste command di bawah **satu per satu**.

---

## 1️⃣ Connect SSH ke EC2

```bash
ssh -i "holicindo-compro-api.pem" ubuntu@52.64.193.232
```

**Kalau error "bad permissions", jalankan dulu ini:**
```powershell
icacls "holicindo-compro-api.pem" /inheritance:r
icacls "holicindo-compro-api.pem" /grant:r "%USERNAME%:R"
```

**Lalu SSH lagi:**
```bash
ssh -i "holicindo-compro-api.pem" ubuntu@52.64.193.232
```

---

## 2️⃣ Deploy Backend + Run Seeder

Setelah connect berhasil (kamu lihat `ubuntu@ip-172-31-7-82:~$`), paste command ini:

```bash
cd ~/company-profile/backend && git pull origin staging && npm install && npm run build && npx ts-node -r tsconfig-paths/register src/seeder/seed-pages.ts && pm2 restart all && pm2 list
```

**Tunggu sampai selesai!** Kamu akan lihat output:
```
✅ Beranda page updated
✅ Tentang Kami page updated
✅ Layanan page updated
✨ All pages seeded successfully!
```

---

## 3️⃣ Deploy Frontend

```bash
cd ~/company-profile/frontend && git pull origin staging && npm install && npm run build && pm2 restart all
```

---

## 4️⃣ Verify Deployment

```bash
curl http://localhost:3011/api/pages/slug/layanan
```

Kalau muncul JSON data, berarti **berhasil!** ✅

---

## 5️⃣ Exit SSH

```bash
exit
```

---

## ✅ Cek Hasil di Browser

1. **Admin Staging:** https://staging.holicindo.com/admin
2. **Frontend:** https://staging.holicindo.com/services

Login admin:
- Email: `admin@holicindo.com`
- Password: `Holic@2024!`

---

## 🎯 Expected Result

Setelah deploy berhasil:
- ✅ Admin Beranda → Ada data + tombol "+ Tambah Fitur"
- ✅ Admin Tentang Kami → Ada data + tombol "+ Tambah Slide"
- ✅ Admin Layanan → Ada data + tombol "+ Tambah Fitur"
- ✅ Frontend /services → Menampilkan data lengkap

---

## 🆘 Troubleshooting

### Error: "Permission denied (publickey)"
Fix permission dulu:
```powershell
icacls "holicindo-compro-api.pem" /inheritance:r
icacls "holicindo-compro-api.pem" /grant:r "%USERNAME%:R"
```

### Error: "git pull failed"
```bash
git status
git stash
git pull origin staging
```

### Error: "npm install failed"
```bash
rm -rf node_modules package-lock.json
npm install
```

### PM2 tidak restart
```bash
pm2 delete all
cd ~/company-profile/backend
pm2 start npm --name "holicindo-compro-api" -- run start:prod
pm2 save
```
