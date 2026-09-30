/**
 * Script to download all WordPress images from database URLs
 * Run: node download-wordpress-images.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// List of image URLs from database (get from SQL: SELECT image_url FROM products WHERE image_url LIKE '%wp-content%')
const imageUrls = [
  'https://holicindo.com/wp-content/uploads/2021/11/SRWP-70.png',
  // Add more URLs here from database query result
  // You can export from database to CSV then paste here
];

const outputDir = './downloaded-wp-images';

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(url, index, total) {
  return new Promise((resolve, reject) => {
    try {
      const urlObj = new URL(url);
      const protocol = urlObj.protocol === 'https:' ? https : http;
      
      // Extract filename and path structure
      const match = url.match(/\/wp-content\/uploads\/(.+)$/);
      if (!match) {
        console.log(`❌ Skipping invalid URL: ${url}`);
        resolve();
        return;
      }
      
      const relativePath = match[1]; // e.g., 2021/11/SRWP-70.png
      const outputPath = path.join(outputDir, relativePath);
      const outputDirPath = path.dirname(outputPath);
      
      // Create nested directories
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }
      
      // Check if file already exists
      if (fs.existsSync(outputPath)) {
        console.log(`⏭️  [${index+1}/${total}] Already exists: ${relativePath}`);
        resolve();
        return;
      }
      
      console.log(`⬇️  [${index+1}/${total}] Downloading: ${relativePath}`);
      
      const file = fs.createWriteStream(outputPath);
      
      protocol.get(url, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`✅ [${index+1}/${total}] Downloaded: ${relativePath}`);
            resolve();
          });
        } else {
          fs.unlink(outputPath, () => {});
          console.log(`❌ [${index+1}/${total}] Failed (${response.statusCode}): ${url}`);
          resolve();
        }
      }).on('error', (err) => {
        fs.unlink(outputPath, () => {});
        console.log(`❌ [${index+1}/${total}] Error: ${err.message}`);
        resolve();
      });
      
    } catch (error) {
      console.log(`❌ [${index+1}/${total}] Exception: ${error.message}`);
      resolve();
    }
  });
}

async function downloadAll() {
  console.log(`🚀 Starting download of ${imageUrls.length} images...\n`);
  
  for (let i = 0; i < imageUrls.length; i++) {
    await downloadImage(imageUrls[i], i, imageUrls.length);
    // Small delay to avoid overwhelming server
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log(`\n✅ Download complete! Images saved to: ${outputDir}`);
  console.log(`📁 Next step: Copy to frontend/public/uploads/`);
  console.log(`   Copy-Item -Recurse ${outputDir}\\* frontend\\public\\uploads\\`);
}

downloadAll().catch(console.error);
