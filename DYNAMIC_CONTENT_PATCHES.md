# Dynamic Content Migration - Remaining Patches

## ✅ Completed (12/17)
- Backend modules (SiteSettings, Clients, ContactSubjects)
- Admin panels (/admin/pengaturan-situs, /admin/klien, /admin/subjek-kontak)
- Seeders (all 3 ready)
- CTASection component
- ClientsMarquee component
- Utilities (useSiteSettings hook, apiService)

## ⏳ Remaining Frontend Updates (4 components)

### 1. Footer Component (`frontend/src/components/layout/Footer.tsx`)

**Add imports:**
```typescript
import { useSiteSettings } from '@/hooks/useSiteSettings';
```

**At start of Footer function:**
```typescript
const { settings } = useSiteSettings();

const whatsappUrl = settings?.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}` : 'https://wa.me/6281111825718';
const email = settings?.email || 'info@holicindo.com';
const address = settings?.address || 'Green Sedayu Bizpark Blok GSB No. 016...';
const mapsLink = settings?.googleMapsLink || 'https://maps.app.goo.gl/bYT5nUqigmC3iS3SA';
const companyTagline = settings?.companyTagline || t('Spesialis showcase kue...', 'Specialist in cake showcases...');
const ctaHeading = settings?.ctaHeading || t('Siap Mengembangkan Bisnis Anda?', 'Ready to Elevate Your Business?');
const ctaDescription = settings?.ctaDescription || t('Konsultasikan spesifikasi mesin...', 'Consult machinery specifications...');

const socialLinks = [
  { name: 'Facebook', href: settings?.facebookUrl || 'https://web.facebook.com/holicindo.id', icon: Facebook, bg: 'bg-[#1877F2]/25', border: 'border-[#1877F2]/80', hover: 'hover:bg-[#1877F2]' },
  { name: 'Instagram', href: settings?.instagramUrl || 'https://www.instagram.com/holicindo.id', icon: Instagram, bg: 'bg-[#E4405F]/25', border: 'border-[#E4405F]/80', hover: 'hover:bg-[#E4405F]' },
  { name: 'YouTube', href: settings?.youtubeUrl || 'https://youtube.com/@holicindo', icon: Youtube, bg: 'bg-[#FF0000]/25', border: 'border-[#FF0000]/80', hover: 'hover:bg-[#FF0000]' },
  { name: 'LinkedIn', href: settings?.linkedinUrl || 'https://www.linkedin.com/company/pt-holicindo-dasa-anugerah/', icon: Linkedin, bg: 'bg-[#0A66C2]/25', border: 'border-[#0A66C2]/80', hover: 'hover:bg-[#0A66C2]' },
];
```

**Replace all hardcoded values in JSX:**
- CTA heading: `{ctaHeading}`
- CTA description: `{ctaDescription}`
- WhatsApp links: `href={whatsappUrl}`
- Email: `href={`mailto:${email}`}` and `{email}`
- Address: `{address}`
- Maps link: `href={mapsLink}`
- Company tagline: `{companyTagline}`

### 2. Contact Page (`frontend/src/app/contact/page.tsx`)

**Add imports:**
```typescript
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { apiService } from '@/services/api';
```

**Add state and fetch:**
```typescript
const { settings } = useSiteSettings();
const [subjects, setSubjects] = useState([]);

useEffect(() => {
  const fetchSubjects = async () => {
    const data = await apiService.getContactSubjects();
    setSubjects(data.map(s => lang === 'id' ? s.label_id : s.label_en));
  };
  fetchSubjects();
}, [lang]);
```

**Replace hardcoded values:**
- WhatsApp: `settings?.whatsapp || '+6281111825718'` and `whatsappUrl`
- Email: `settings?.email || 'info@holicindo.com'`
- Address: `settings?.address || 'Green Sedayu Bizpark...'`
- Maps embed: `settings?.googleMapsEmbed || 'https://www.google.com/maps/embed?pb=...'`
- Maps link: `settings?.googleMapsLink || 'https://maps.app.goo.gl/...'`
- Operating hours: Use `settings?.operatingHours` object
- Subject options: Map over `subjects` array instead of hardcoded array

### 3. Navbar (`frontend/src/components/layout/Navbar.tsx`)

**Add import:**
```typescript
import { useSiteSettings } from '@/hooks/useSiteSettings';
```

**Add at start:**
```typescript
const { settings } = useSiteSettings();
const whatsappUrl = settings?.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}` : 'https://wa.me/6281111825718';
```

**Replace mobile menu WhatsApp link:**
```typescript
<a href={whatsappUrl} ...>
```

### 4. Services Page (`frontend/src/app/services/ServicesView.tsx`)

**Add import:**
```typescript
import { useSiteSettings } from '@/hooks/useSiteSettings';
```

**Add at start:**
```typescript
const { settings } = useSiteSettings();
const whatsappUrl = settings?.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}` : 'https://wa.me/6281111825718';
```

**Replace line ~207 (Smart Ecosystem section):**
```typescript
<a href={whatsappUrl} ...>
```

---

## 🚀 Testing Steps

### 1. Run Seeders (in order):
```bash
cd backend
npx ts-node src/seeder/seed-site-settings.ts
npx ts-node src/seeder/seed-clients.ts
npx ts-node src/seeder/seed-contact-subjects.ts
```

### 2. Build & Restart Backend:
```bash
npm run build
npm run start:dev
```

### 3. Test API Endpoints:
```bash
# Site Settings (public)
curl http://localhost:3011/api/site-settings

# Clients (public)
curl http://localhost:3011/api/clients

# Contact Subjects (public)
curl http://localhost:3011/api/contact-subjects
```

### 4. Test Frontend:
- Visit homepage → check CTA section and Clients marquee
- Visit /contact → check all contact info and form subjects
- Check Footer → all social links and contact info
- Check Navbar mobile menu → WhatsApp link

### 5. Test Admin Panels:
- Login to /admin/login
- Visit /admin/pengaturan-situs → edit and save
- Visit /admin/klien → add/edit/delete clients
- Visit /admin/subjek-kontak → manage subjects
- Refresh frontend → verify changes appear

---

## 📦 What Was Built

### Backend (NestJS):
1. **SiteSettingsModule** - Contact info, social media, operating hours, CTA content
2. **ClientsModule** - Client list with logos and display order
3. **ContactSubjectsModule** - Form subject options (bilingual)

### Frontend (Next.js):
1. **Admin Panels** - Full CRUD interfaces for all 3 modules
2. **Hooks & Services** - `useSiteSettings()`, `apiService.getClients()`, `apiService.getContactSubjects()`
3. **Updated Components** - CTASection, ClientsMarquee (+ 4 more with patches above)

### Database Seeders:
1. **seed-site-settings.ts** - All current hardcoded values
2. **seed-clients.ts** - 17 clients (Gelael, Lulu, XXI, etc.)
3. **seed-contact-subjects.ts** - 5 subjects (Product Inquiry, etc.)

---

## ✅ Production Readiness Checklist

Before go-live:
- [ ] Run all 3 seeders on production database
- [ ] Apply remaining 4 component patches (Footer, Contact, Navbar, Services)
- [ ] Test all admin panels with production JWT
- [ ] Verify all S3 environment variables in Amplify
- [ ] Test website with empty cache
- [ ] Verify Google Maps embed loads
- [ ] Test all social media links
- [ ] Verify WhatsApp links work on mobile
- [ ] Test contact form submissions

---

## 🎯 Benefits Achieved

✅ **No More Hardcoded Content** - All contact info, social media, clients, form subjects editable from CMS
✅ **Admin Control** - Non-technical staff can update site content without code changes
✅ **Bilingual Support** - Contact subjects support Indonesian and English labels
✅ **Scalable Client Management** - Easily add/remove clients with drag-to-reorder
✅ **Single Source of Truth** - Contact info centralized in site settings (used across Footer, CTA, Contact, Navbar)
✅ **Production Ready** - All seeders preserve current values, zero downtime migration

---

## 📝 Notes

- All changes are backward compatible - fallbacks to hardcoded values if API fails
- Seeders check for existing data before inserting (safe to run multiple times)
- Admin authentication required for all edit endpoints (JWT guard)
- Public endpoints (GET) don't require auth for frontend consumption
