import {
  Controller, Post, UseGuards, UseInterceptors,
  UploadedFile, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join, isAbsolute } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Upload dir: configurable via UPLOAD_DIR env var (absolute path),
// falls back to <frontend>/public/uploads for local dev.
function resolveUploadDir(): string {
  if (process.env.UPLOAD_DIR) {
    return isAbsolute(process.env.UPLOAD_DIR)
      ? process.env.UPLOAD_DIR
      : join(process.cwd(), process.env.UPLOAD_DIR);
  }
  // Local dev fallback — only works when frontend/ is a sibling of backend/
  return join(process.cwd(), '..', 'frontend', 'public', 'uploads');
}

const UPLOAD_DIR = resolveUploadDir();

// Ensure upload directory exists
if (!existsSync(UPLOAD_DIR)) {
  try {
    mkdirSync(UPLOAD_DIR, { recursive: true });
  } catch (err) {
    console.warn(`[UploadController] Could not create upload dir at ${UPLOAD_DIR}:`, err);
  }
}

console.log(`[UploadController] Upload directory: ${UPLOAD_DIR}`);

@Controller('upload')
export class UploadController {
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_DIR,
        filename: (_req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (_req, file, cb) => {
        // SVG excluded: can contain embedded scripts (XSS risk)
        const allowed = /^image\/(jpeg|jpg|png|gif|webp)$/;
        if (!allowed.test(file.mimetype)) {
          return cb(new BadRequestException('Hanya file gambar (JPG, PNG, GIF, WebP) yang diizinkan'), false);
        }
        cb(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File tidak ditemukan');
    // Return URL accessible from the frontend
    return { url: `/uploads/${file.filename}`, filename: file.filename };
  }
}
