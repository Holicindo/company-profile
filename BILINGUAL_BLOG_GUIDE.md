# Panduan Konten Blog Bilingual (Indonesian/English)

## Fitur Baru: Dukungan Bilingual untuk Blog Posts

Website Holicindo sekarang mendukung konten blog dalam 2 bahasa: **Bahasa Indonesia** dan **English**.

### Cara Kerja

1. **Pengguna Switch Bahasa**: Ketika pengguna klik toggle bahasa di website, semua konten akan berubah ke bahasa yang dipilih
2. **Blog Cards**: Judul dan excerpt di halaman Holic Insights akan otomatis menampilkan versi sesuai bahasa
3. **Isi Artikel**: Ketika membuka artikel, seluruh konten akan tampil dalam bahasa yang dipilih

---

## Cara Mengisi Konten Bilingual di Admin Panel

### Field yang Tersedia

Setiap blog post sekarang memiliki **6 field konten**:

**Versi Indonesia (Wajib):**
- `title` - Judul artikel dalam Bahasa Indonesia
- `excerpt` - Ringkasan singkat dalam Bahasa Indonesia
- `content` - Isi lengkap artikel dalam Bahasa Indonesia

**Versi English (Opsional tapi Direkomendasikan):**
- `title_en` - Judul artikel dalam English
- `excerpt_en` - Ringkasan singkat dalam English
- `content_en` - Isi lengkap artikel dalam English

### Cara Menambah/Edit Artikel Bilingual

#### 1. Login ke Admin Panel
```
https://holicindo.com/admin/login
```

#### 2. Pilih Menu Blog
```
Admin → Blog
```

#### 3. Buat Artikel Baru atau Edit yang Ada

**Isi Versi Indonesia (Wajib):**
```
Title: Integrasi Pencahayaan, Suhu, dan Pelayanan: Formula Kepuasan Customer
Excerpt: Harmoni 3 pilar Utama: Visual (Cahaya), Termal (Suhu), dan Emosional (Pelayanan) untuk mengangkat...
Content: [Isi lengkap artikel dalam Bahasa Indonesia]
```

**Isi Versi English (Sangat Direkomendasikan):**
```
Title (EN): Lighting, Temperature, and Service Integration: The Customer Satisfaction Formula
Excerpt (EN): Harmonizing 3 Core Pillars: Visual (Lighting), Thermal (Temperature), and Emotional (Service) to elevate...
Content (EN): [Full article content in English]
```

#### 4. Save/Publish

Artikel akan otomatis tersedia dalam 2 bahasa!

---

## Penting untuk Diperhatikan

### ✅ Best Practices

1. **Selalu isi versi Indonesia terlebih dahulu** (ini default/fallback)
2. **Terjemahkan ke English untuk artikel penting** - terutama artikel yang:
   - Ditampilkan di homepage
   - Tutorial/panduan produk
   - Artikel tentang mesin dan spesifikasi teknis
3. **Konsisten dengan istilah teknis**:
   - `Showcase` tetap `Showcase` (jangan diterjemahkan)
   - `Chiller` tetap `Chiller`
   - `Display Cabinet` bisa jadi `Lemari Pajang` (ID) atau `Display Cabinet` (EN)

### ⚠️ Fallback Behavior

Jika versi English **tidak diisi**, sistem akan otomatis menampilkan versi Indonesia:

```
User pilih English → title_en kosong → sistem tampilkan title (Indonesia)
```

Ini OK untuk artikel yang memang hanya untuk audience lokal, tapi **tidak ideal** untuk website yang ingin terlihat profesional secara global.

### 🎯 Rekomendasi

- **Artikel Baru**: Selalu buat dalam 2 bahasa sejak awal
- **Artikel Lama**: Prioritaskan terjemahkan artikel dengan view tinggi atau featured
- **Konsistensi**: Gunakan tone of voice yang sama di kedua bahasa

---

## Cara Mengetahui Artikel Mana yang Perlu Diterjemahkan

1. Login ke Admin Panel
2. Buka menu **Blog**
3. Lihat kolom status:
   - ✅ **Ada icon globe/world** = Sudah bilingual (ada versi EN)
   - ⚠️ **Tidak ada icon** = Belum ada versi EN

---

## API Reference (untuk Developer)

### Endpoint Blog dengan Parameter Bahasa

**Get All Posts:**
```
GET /api/blog?page=1&limit=10&lang=en
```

**Get Post by Slug:**
```
GET /api/blog/artikel-pencahayaan?lang=en
```

**Get Latest Posts:**
```
GET /api/blog/latest?limit=3&lang=en
```

Parameter `lang`:
- `id` atau `ID` = Bahasa Indonesia (default)
- `en` atau `EN` = English

---

## Database Schema

**Tabel: `blog_posts`**

```sql
-- Kolom Lama (Versi Indonesia)
title VARCHAR
excerpt TEXT
content TEXT

-- Kolom Baru (Versi English)
title_en VARCHAR      -- ditambahkan
excerpt_en TEXT       -- ditambahkan  
content_en TEXT       -- ditambahkan
```

Migration sudah dijalankan otomatis saat deploy.

---

## Testing

### Cara Test di Production

1. Buka https://holicindo.com/news
2. Lihat artikel dalam Bahasa Indonesia
3. Klik toggle bahasa (🌐 ID/EN) di header
4. Switch ke **EN**
5. **Semua card artikel harus berubah ke English** (judul + excerpt)
6. Klik buka salah satu artikel
7. **Isi artikel harus dalam English**

### Jika Masih Tampil Indonesia Padahal Sudah Switch English

**Kemungkinan:**
1. Artikel tersebut belum ada versi English-nya → **Perlu diterjemahkan**
2. Browser cache → Hard refresh (Ctrl+Shift+R)
3. API belum update → Tunggu beberapa menit setelah deploy

---

## Troubleshooting

### Problem: "Artikel saya sudah ada versi EN tapi tetap tampil Indonesia"

**Solution:**
1. Pastikan field `title_en`, `excerpt_en`, `content_en` benar-benar terisi (tidak kosong)
2. Clear browser cache
3. Check di database langsung (gunakan pgAdmin atau SQL client)

### Problem: "Error 500 saat fetch blog post"

**Solution:**
1. Check backend logs
2. Pastikan migration sudah jalan (kolom `title_en`, `excerpt_en`, `content_en` ada)
3. Restart backend service

---

## Kontak

Jika ada pertanyaan teknis tentang implementasi bilingual:
- Developer: lihat source code di `backend/src/modules/blog/` dan `frontend/src/lib/api.ts`
- Content Team: hubungi tim developer untuk training admin panel

---

**Versi:** 1.0  
**Tanggal:** September 2026  
**Status:** ✅ Production Ready
