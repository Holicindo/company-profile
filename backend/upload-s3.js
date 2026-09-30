const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-southeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.AWS_S3_BUCKET || 'holicindo-web-storage';
const uploadsDir = path.join(__dirname, '..', 'frontend', 'public', 'uploads');

async function uploadFile(filePath, key) {
  const fileStream = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  let contentType = 'application/octet-stream';
  if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
  else if (ext === '.png') contentType = 'image/png';
  else if (ext === '.gif') contentType = 'image/gif';
  else if (ext === '.webp') contentType = 'image/webp';
  else if (ext === '.svg') contentType = 'image/svg+xml';

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: fileStream,
    ContentType: contentType,
  });

  try {
    await s3Client.send(command);
    console.log(`Uploaded ${key}`);
  } catch (err) {
    console.error(`Failed to upload ${key}:`, err);
  }
}

function getAllFiles(dir, prefix = 'uploads') {
  let fileList = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fileList = fileList.concat(getAllFiles(fullPath, `${prefix}/${entry.name}`));
    } else {
      const key = `${prefix}/${entry.name}`;
      fileList.push({ fullPath, key });
    }
  }
  return fileList;
}

async function uploadAll() {
  const allFiles = getAllFiles(uploadsDir);
  console.log(`Found ${allFiles.length} files to upload to S3 (${bucketName})...`);

  const CONCURRENCY = 8;
  for (let i = 0; i < allFiles.length; i += CONCURRENCY) {
    const chunk = allFiles.slice(i, i + CONCURRENCY);
    await Promise.all(chunk.map(item => uploadFile(item.fullPath, item.key)));
    const pct = Math.round(((i + chunk.length) / allFiles.length) * 100);
    console.log(`Progress: ${i + chunk.length}/${allFiles.length} (${pct}%)`);
  }
  console.log('All files uploaded successfully to S3!');
}

console.log('Starting S3 upload...');
uploadAll().catch(console.error);
