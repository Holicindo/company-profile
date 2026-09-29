# Translation Fixes - Bahasa Indonesia → English

## ✅ COMPLETED (Already Fixed):
1. ✅ LatestNewsSection.tsx - All text translated
2. ✅ CTASection.tsx - "Chat via WhatsApp" button translated

## 🔧 REMAINING FIXES NEEDED:

### **HIGH PRIORITY:**

#### 1. Footer.tsx - 2 instances
**Line ~37:**
```tsx
// BEFORE:
Chat via WhatsApp

// AFTER:
{t('Chat via WhatsApp', 'Chat via WhatsApp')}
```

**Line ~188:**
```tsx
// BEFORE:
Food Machinery, Refrigerator &amp; Showcase

// AFTER:
{t('Food Machinery, Refrigerator & Showcase', 'Food Machinery, Refrigerator & Showcase')}
```

#### 2. Navbar.tsx
**Line ~164:**
```tsx
// BEFORE:
<span>Chat WhatsApp</span>

// AFTER:
<span>{t('Chat WhatsApp', 'Chat WhatsApp')}</span>
```

#### 3. ProductsView.tsx - Industry Solution Cards
**Lines 90-91, 109-110, 128-129, 147-148:**

Add translations for:
```tsx
// Card 1:
{t('Bakery & Pastry', 'Bakery & Pastry')}
{t('Estetika Display & Presisi Suhu', 'Display Aesthetics & Temperature Precision')}

// Card 2:
{t('HORECA (Hotel & Resto)', 'HORECA (Hotel & Restaurant)')}
{t('Ketahanan Dapur Komersial', 'Commercial Kitchen Durability')}

// Card 3:
{t('Retail & Supermarket', 'Retail & Supermarket')}
{t('Visibilitas & Kapasitas Ekstra', 'Extra Visibility & Capacity')}

// Card 4:
{t('Pengolahan Industri', 'Industrial Processing')}
{t('Kekuatan Produksi Massal', 'Mass Production Power')}
```

**Line 179:**
```tsx
// BEFORE:
<span className="...">Showcase Sub:</span>

// AFTER:
<span className="...">{t('Showcase Sub:', 'Showcase Sub:')}</span>
```

**Lines 185-188 - Sub-categories:**
```tsx
const subCategories = [
  { name: t('Semua Showcase', 'All Showcases'), slug: 'showcase' },
  { name: t('Cold Case', 'Cold Case'), slug: 'cold-case' },
  { name: t('Undercounter', 'Undercounter'), slug: 'showcase-undercounter' },
  { name: t('Show Case', 'Show Case'), slug: 'show-case' },
];
```

#### 4. AboutView.tsx - DEFAULT_FEATURES Array
**Lines 25-43:**
```tsx
const DEFAULT_FEATURES = [
  {
    title: t('Dimensi', 'Dimensions'),
    desc: t('Dimensi dan ukuran yang dapat disesuaikan...', 'Customizable dimensions and sizes...'),
  },
  {
    title: t('Bentuk', 'Shape'),
    desc: t('Bentuk dan lekukan yang dirancang khusus...', 'Specially designed shapes and curves...'),
  },
  {
    title: t('Warna', 'Color'),
    desc: t('Pilihan warna yang beragam...', 'Diverse color options...'),
  },
  {
    title: t('Material', 'Material'),
    desc: t('Pemilihan material grade industri...', 'Industrial grade material selection...'),
  },
  {
    title: t('Fungsi', 'Function'),
    desc: t('Sistem pengaturan suhu dan tingkat kelembapan...', 'Temperature and humidity control systems...'),
  },
];
```

### **MEDIUM PRIORITY:**

#### 5. SEO Metadata - All page.tsx files

**app/page.tsx (Home):**
```tsx
export const metadata: Metadata = {
  title: language === 'id' 
    ? 'Holicindo - Spesialis Showcase & Chiller Komersial Indonesia' 
    : 'Holicindo - Commercial Showcase & Chiller Specialist Indonesia',
  description: language === 'id'
    ? 'PT Holicindo Dasa Anugerah - Distributor resmi mesin makanan...'
    : 'PT Holicindo Dasa Anugerah - Official food machinery distributor...',
  // ... etc
};
```

**Note:** Metadata requires server-side detection or client-side rendering approach

#### 6. Image Alt Texts (Lower priority but good for SEO/accessibility)
- HeroSection.tsx line 30: "Kitchen Equipment Showcase"
- AboutView.tsx line 71, 100, 120, 122: Various image alt texts
- ProjectsView.tsx line 19, 52: Image alt texts and aria-labels
- And others as identified in audit

### **LOW PRIORITY / CAN STAY:**
- Admin panel pages (Indonesian only per requirement)
- Console logs
- Technical placeholders ("No Image", "Uncategorized")
- PDF filenames
- aria-hidden decorative elements

---

## 🚀 QUICK FIX APPROACH:

For fastest go-live, focus on:
1. ✅ Footer "Chat via WhatsApp" button
2. ✅ Navbar mobile "Chat WhatsApp" 
3. ✅ ProductsView industry cards (most visible to users)

These 3 are the most noticeable when switching languages.

---

## 📝 HOW TO IMPLEMENT:

1. Import `useLanguage` hook:
```tsx
import { useLanguage } from '@/context/LanguageContext';
```

2. Use in component:
```tsx
const { t, language } = useLanguage();
```

3. Wrap text:
```tsx
{t('Indonesian Text', 'English Text')}
```

---

## 🎯 TEST CHECKLIST:

After fixes:
- [ ] Switch language to English on homepage
- [ ] Scroll through all sections - verify no Indonesian text remains
- [ ] Click through to About, Services, Products, Projects, Contact, Blog pages
- [ ] Check footer and navbar in both languages
- [ ] Test mobile menu language switching
- [ ] Verify all buttons and links translate properly

---

## Current Status:
- **Fixed:** 2/10 high priority items (LatestNewsSection, CTASection)
- **Remaining:** 8 high priority items
- **Estimated time:** ~30-45 minutes for all remaining fixes
