# 🔐 SSH ke EC2 - Step by Step Guide

## 📍 Lokasi File yang Kamu Butuhkan
- **SSH Key (.pem)**: Biasanya ada di `Downloads/` atau folder AWS credentials
- **Nama file**: Biasanya `holicindo-key.pem`, `ec2-key.pem`, atau `aws-key.pem`

---

## ✅ Cara 1: SSH dengan File .pem (PALING UMUM)

### Di Terminal VSCode:
```bash
# 1. Navigate ke folder yang ada file .pem
cd D:\Downloads  # atau folder lain tempat .pem disimpan

# 2. Connect SSH dengan .pem
ssh -i holicindo-key.pem ubuntu@52.64.193.232
```

**Kalau error "permissions too open":**
```powershell
# Fix permission dulu (Windows)
icacls "holicindo-key.pem" /inheritance:r
icacls "holicindo-key.pem" /grant:r "%USERNAME%:R"

# Lalu connect lagi
ssh -i holicindo-key.pem ubuntu@52.64.193.232
```

---

## ✅ Cara 2: SSH Tanpa .pem (Kalau Sudah Setup Password/Key)

```bash
ssh ubuntu@52.64.193.232
```

**Kalau diminta password**, masukkan password EC2 kamu.

---

## ✅ Cara 3: Pakai PuTTY (Windows GUI)

### Step-by-step:
1. **Download PuTTY**: https://www.putty.org/
2. Buka **PuTTYgen** (untuk convert .pem ke .ppk)
   - Load file `.pem`
   - Save private key sebagai `.ppk`
3. Buka **PuTTY**
   - Host Name: `ubuntu@52.64.193.232`
   - Port: `22`
   - Connection → SSH → Auth → Browse → pilih file `.ppk`
   - Klik **Open**

---

## 🔍 Cara Cari File .pem

### Di Windows Explorer:
1. Tekan **Windows + R**
2. Ketik: `%USERPROFILE%\Downloads`
3. Cari file dengan extension `.pem`

### Atau pakai PowerShell:
```powershell
Get-ChildItem -Path $env:USERPROFILE -Recurse -Filter "*.pem" -ErrorAction SilentlyContinue
```

---

## 🚨 Troubleshooting

### ❌ Error: "Permission denied (publickey)"
**Solusi:**
- File .pem salah atau belum di-set
- Coba pakai: `ssh -i path/to/key.pem ubuntu@52.64.193.232`

### ❌ Error: "Connection timeout"
**Solusi:**
- EC2 instance mungkin mati
- Security Group tidak allow SSH port 22
- Cek di AWS Console apakah instance running

### ❌ Error: "Bad permissions"
**Solusi Windows:**
```powershell
icacls "key.pem" /inheritance:r
icacls "key.pem" /grant:r "%USERNAME%:R"
```

**Solusi Linux/Mac:**
```bash
chmod 400 key.pem
```

---

## ✅ Setelah Berhasil Connect

Kamu akan lihat prompt seperti ini:
```
ubuntu@ip-172-31-7-82:~$
```

Artinya sudah connect! Sekarang paste command deployment:

```bash
cd ~/company-profile/backend && git pull origin staging && npm install && npm run build && npx ts-node -r tsconfig-paths/register src/seeder/seed-pages.ts && pm2 restart all && pm2 list
```

---

## 📞 Kalau Masih Stuck

Kalau masih belum bisa connect, cek:
1. ✅ Apakah kamu punya akses ke AWS Console?
2. ✅ Apakah file `.pem` ada?
3. ✅ Apakah EC2 instance sedang running?

Kalau tidak punya file `.pem`, tanya IT atau yang setup EC2 dulu.
