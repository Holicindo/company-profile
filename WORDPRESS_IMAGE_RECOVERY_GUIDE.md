# WordPress Image Recovery Guide

## Problem
Foto produk hilang setelah deployment 22-23 karena perubahan logic `getImageUrl()` yang tidak handle URL WordPress legacy (`/wp-content/uploads/...`).

## Root Cause Analysis

### Timeline:
- **Deployment 21 (Sept 21, 10:34 AM)**: Foto masih tampil ✅
- **Deployment 22-23**: Foto hilang ❌

### What Changed:
Commit `9a392c5` menghapus logic di `getImageUrl()` yang handle `/uploads/` path dan prefix dengan backend server.

**Before (Working):**
```typescript
if (url.startsWith('/uploads/')) {
  return cleanBackend ? `${cleanBackend}${url}` : url;
}
// cleanBackend = http://52.64.193.232:3011
```

**After (Broken):**
```typescript
if (url.startsWith('/')) {
  return url; // No transformation!
}
```

### Issue:
Database menyimpan URL lengkap WordPress:
```
https://holicindo.com/wp-content/uploads/2021/11/SRWP-70.png
```

Function `getImageUrl()`:
1. Cek `url.startsWith('https://')` → **TRUE**
2. Return as-is tanpa transformasi
3. Next.js coba fetch dari domain sendiri
4. Path `/wp-content/uploads/` tidak ada di Next.js
5. **404 Not Found**

## Solution Implemented

### Fix 1: Update `getImageUrl()` Function
File: `frontend/src/lib/api.ts`

Added logic to:
1. ✅ Detect WordPress legacy URLs (`/wp-content/uploads/...`)
2. ✅ Extract path after `/wp-content/uploads/`
3. ✅ Transform to backend URL: `http://52.64.193.232:3011/uploads/...`
4. ✅ Handle both relative and absolute URLs
5. ✅ Proxy all image requests through backend server

### Fix 2: Backend Already Configured
File: `backend/src/main.ts`

Backend sudah setup static file serving:
```typescript
app.use('/uploads', require('express').static(uploadDir));
// uploadDir = ../frontend/public/uploads
```

## Next Steps: Download WordPress Images

Foto-foto masih ada di server WordPress lama, perlu di-copy ke project.

### Option 1: SSH/SFTP (Recommended) ⭐

#### Step 1: Connect to WordPress Server
```bash
ssh username@wordpress-server
```

#### Step 2: Find WordPress Uploads Folder
```bash
# Common locations:
/var/www/html/wp-content/uploads/
/home/username/public_html/wp-content/uploads/
/usr/share/nginx/html/wp-content/uploads/
```

#### Step 3: Download Entire Uploads Folder
```bash
# From local machine (Windows PowerShell)
scp -r username@wordpress-server:/var/www/html/wp-content/uploads ./wordpress-uploads-backup

# Or use WinSCP/FileZilla GUI
```

#### Step 4: Copy to Project
```powershell
# Copy all files to frontend public uploads
Copy-Item -Recurse .\wordpress-uploads-backup\* .\frontend\public\uploads\

# Verify
ls .\frontend\public\uploads\
```

#### Step 5: Commit & Deploy
```bash
git add frontend/public/uploads
git commit -m "feat: restore all WordPress product images"
git push origin staging
git push origin main
```

---

### Option 2: Download from URLs (If No SSH Access)

If SSH/SFTP not available, use the download script.

#### Step 1: Get All Image URLs from Database
```sql
-- Run in database client (pgAdmin, DBeaver, etc.)
SELECT image_url 
FROM products 
WHERE image_url LIKE '%wp-content/uploads%'
ORDER BY id;

-- Export to CSV or copy to clipboard
```

#### Step 2: Update Download Script
File: `download-wordpress-images.js`

```javascript
const imageUrls = [
  'https://holicindo.com/wp-content/uploads/2021/11/SRWP-70.png',
  'https://holicindo.com/wp-content/uploads/2021/11/SRWP-71.png',
  // Paste all URLs from database here
];
```

#### Step 3: Run Download Script
```bash
node download-wordpress-images.js
```

Output:
```
🚀 Starting download of X images...
⬇️  [1/X] Downloading: 2021/11/SRWP-70.png
✅ [1/X] Downloaded: 2021/11/SRWP-70.png
...
✅ Download complete! Images saved to: ./downloaded-wp-images
```

#### Step 4: Copy Downloaded Images
```powershell
Copy-Item -Recurse .\downloaded-wp-images\* .\frontend\public\uploads\
```

#### Step 5: Commit & Deploy
```bash
git add frontend/public/uploads
git commit -m "feat: restore WordPress product images via download script"
git push origin staging
git push origin main
```

---

### Option 3: Scrape from Archive.org (Last Resort)

If WordPress server is gone and URLs are dead:

1. Visit https://web.archive.org/
2. Enter old domain: `holicindo.com`
3. Find snapshot from before migration (Sept 21, 2026 or earlier)
4. Browse to products page
5. Right-click image → Save As
6. Repeat for all images (tedious but works)

---

## Verification After Deployment

### 1. Check Frontend Build
```bash
cd frontend
npm run build
# Should complete without errors
```

### 2. Check Image Transformation
Add console log test:
```javascript
import { getImageUrl } from '@/lib/api';

// Test WordPress URL
const wpUrl = 'https://holicindo.com/wp-content/uploads/2021/11/SRWP-70.png';
console.log('WordPress URL:', getImageUrl(wpUrl));
// Expected: http://52.64.193.232:3011/uploads/2021/11/SRWP-70.png
```

### 3. Test on Production
1. Deploy to staging/production
2. Open products page: https://holicindo.com/products
3. Check browser Network tab
4. Image requests should go to: `http://52.64.193.232:3011/uploads/...`
5. All images should display correctly

### 4. Database Check (Optional Future Migration)
After confirming images work, optionally update database URLs:

```sql
-- Update all WordPress URLs to new format
UPDATE products 
SET image_url = REPLACE(image_url, '/wp-content/uploads/', '/uploads/')
WHERE image_url LIKE '%/wp-content/uploads/%';

-- Verify
SELECT image_url FROM products LIMIT 10;
```

**Note**: Only run this after confirming images display correctly!

---

## Troubleshooting

### Problem: "Images still not showing after deployment"

**Check:**
1. ✅ Code deployed? Check commit hash in Amplify
2. ✅ Files uploaded? Check `frontend/public/uploads/` exists
3. ✅ Backend running? Visit `http://52.64.193.232:3011/uploads/2021/11/SRWP-70.png`
4. ✅ CORS configured? Check Network tab for CORS errors
5. ✅ Cache cleared? Hard refresh (Ctrl+Shift+R)

**Solution:**
- If backend offline → restart backend service
- If 404 on backend → files not copied correctly
- If CORS error → check `main.ts` CORS config

### Problem: "Some images work, some don't"

**Reason**: Partial file upload or different URL formats

**Solution:**
1. Check which images 404
2. Compare URL format in database
3. Update `getImageUrl()` regex pattern if needed
4. Re-download missing images

### Problem: "Too many images to download manually"

**Solution:**
Use the download script with database export:

```bash
# Export all URLs from database
psql -h localhost -U postgres -d holicindo_db -c "COPY (SELECT image_url FROM products WHERE image_url LIKE '%wp-content%') TO STDOUT" > image_urls.txt

# Parse and add to download script
# Or write custom script to read from file
```

---

## File Structure After Recovery

```
frontend/
  public/
    uploads/
      2021/
        11/
          SRWP-70.png
          SRWP-71.png
          ...
      2022/
        01/
          ...
      2024/
        ...
```

Backend serves these via:
```
GET http://52.64.193.232:3011/uploads/2021/11/SRWP-70.png
```

---

## Summary

✅ **Fixed**: Updated `getImageUrl()` to handle WordPress legacy URLs  
⏳ **Pending**: Download/copy images from WordPress server  
📋 **Next**: Deploy and verify all images display

**Status**: Code fix deployed, awaiting image file transfer.

---

**Contact**: Developer team untuk bantuan SSH/SFTP access ke WordPress server lama.

**Estimated Recovery Time**:
- Option 1 (SSH): 15-30 minutes
- Option 2 (Download script): 1-2 hours (depending on number of images)
- Option 3 (Archive.org): Several hours (manual)
