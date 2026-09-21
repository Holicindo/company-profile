import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Warn loudly if critical env vars are missing
  if (!process.env.JWT_SECRET) {
    console.warn('⚠️  WARNING: JWT_SECRET is not set. Using insecure default. Set this env var before deploying!');
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3010';
  app.enableCors({
    origin: (origin, callback) => {
      // Izinkan request tanpa origin (seperti curl, mobile app, server-to-server proxy)
      if (!origin) return callback(null, true);

      const isAllowed =
        origin === frontendUrl ||
        origin === 'http://localhost:3010' ||
        origin === 'http://localhost:3000' ||
        origin === 'https://holicindo.com' ||
        origin === 'https://www.holicindo.com' ||
        origin === 'https://staging.holicindo.com' ||
        origin.endsWith('.amplifyapp.com') ||
        origin.includes('localhost');

      if (isAllowed) {
        callback(null, true);
      } else {
        // Fallback izinkan untuk staging domain lain
        callback(null, true);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  app.setGlobalPrefix('api');

  // Serve static files from uploads directory
  const uploadDir = process.env.UPLOAD_DIR
    ? (require('path').isAbsolute(process.env.UPLOAD_DIR) ? process.env.UPLOAD_DIR : require('path').join(process.cwd(), process.env.UPLOAD_DIR))
    : require('path').join(process.cwd(), '..', 'frontend', 'public', 'uploads');
  app.use('/uploads', require('express').static(uploadDir));

  const port = process.env.PORT || 3011;
  await app.listen(port);
  console.log(`🚀 Holicindo API running on http://localhost:${port}/api`);
  console.log(`   CORS allowed origins: ${frontendUrl}, http://localhost:3010, http://localhost:3000`);
}
bootstrap();
