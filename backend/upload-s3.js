require('dotenv').config();
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
const mime = require('mime-types'); // Need this or a simple extension mapper

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

async function uploadDirectory(dir, prefix = 'uploads') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await uploadDirectory(fullPath, `${prefix}/${entry.name}`);
    } else {
      const key = `${prefix}/${entry.name}`;
      await uploadFile(fullPath, key);
    }
  }
}

console.log('Starting S3 upload...');
uploadDirectory(uploadsDir).then(() => console.log('Done!'));
