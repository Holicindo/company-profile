const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const { S3Client, PutBucketPolicyCommand, GetBucketPolicyCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-southeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.AWS_S3_BUCKET || 'holicindo-web-storage';

const policy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicReadGetObject",
      Effect: "Allow",
      Principal: "*",
      Action: ["s3:GetObject"],
      Resource: [`arn:aws:s3:::${bucketName}/*`]
    }
  ]
};

async function setPolicy() {
  try {
    const command = new PutBucketPolicyCommand({
      Bucket: bucketName,
      Policy: JSON.stringify(policy),
    });
    await s3Client.send(command);
    console.log("Bucket policy updated successfully to allow public read!");
  } catch (err) {
    console.error("Failed to update bucket policy:", err);
  }
}

setPolicy();
