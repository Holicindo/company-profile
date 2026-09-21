import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { extname, join, isAbsolute } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

@Injectable()
export class UploadService {
  private s3Client: S3Client | null = null;
  private bucketName: string = '';
  private region: string = 'ap-southeast-1';

  constructor() {
    const bucket = process.env.AWS_S3_BUCKET || process.env.AWS_BUCKET_NAME;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const region = process.env.AWS_REGION || 'ap-southeast-1';

    if (bucket && accessKeyId && secretAccessKey) {
      this.bucketName = bucket;
      this.region = region;
      this.s3Client = new S3Client({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
      console.log(`[UploadService] AWS S3 Client initialized for bucket: ${bucket} (${region})`);
    } else {
      console.log('[UploadService] AWS S3 credentials not configured. Local disk fallback active.');
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string; filename: string }> {
    if (!file) {
      throw new BadRequestException('File tidak ditemukan');
    }

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    const ext = extname(file.originalname || '').toLowerCase() || '.jpg';
    const filename = `${uniqueSuffix}${ext}`;

    // Upload ke AWS S3 jika credentials di-set
    if (this.s3Client && this.bucketName) {
      try {
        const key = `uploads/${filename}`;
        const command = new PutObjectCommand({
          Bucket: this.bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype || 'image/jpeg',
        });

        await this.s3Client.send(command);

        const customDomain = process.env.AWS_S3_CUSTOM_DOMAIN;
        const url = customDomain
          ? `${customDomain.replace(/\/+$/, '')}/${key}`
          : `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;

        console.log(`[UploadService] Successfully uploaded to S3: ${url}`);
        return { url, filename };
      } catch (err: any) {
        console.error('[UploadService] S3 upload failed, falling back to local storage:', err);
      }
    }

    // Fallback simpan ke disk lokal
    const uploadDir = this.resolveUploadDir();
    if (!existsSync(uploadDir)) {
      try {
        mkdirSync(uploadDir, { recursive: true });
      } catch (err) {
        console.warn(`[UploadService] Could not create upload dir: ${uploadDir}`, err);
      }
    }

    const filePath = join(uploadDir, filename);
    try {
      writeFileSync(filePath, file.buffer);
      console.log(`[UploadService] Successfully saved to disk: ${filePath}`);
    } catch (err) {
      console.error('[UploadService] Failed to write file to disk:', err);
      throw new BadRequestException('Gagal menyimpan file ke penyimpanan server');
    }

    return { url: `/uploads/${filename}`, filename };
  }

  private resolveUploadDir(): string {
    if (process.env.UPLOAD_DIR) {
      return isAbsolute(process.env.UPLOAD_DIR)
        ? process.env.UPLOAD_DIR
        : join(process.cwd(), process.env.UPLOAD_DIR);
    }
    return join(process.cwd(), '..', 'frontend', 'public', 'uploads');
  }
}
