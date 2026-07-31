import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './modules/products/products.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { BlogModule } from './modules/blog/blog.module';
import { ContactModule } from './modules/contact/contact.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get('DB_HOST', 'localhost'),
        port: cfg.get<number>('DB_PORT', 5432),
        username: cfg.get('DB_USERNAME', 'postgres'),
        password: cfg.get('DB_PASSWORD', ''),
        database: cfg.get('DB_DATABASE', 'holicindo_web'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: cfg.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ProductsModule,
    PortfolioModule,
    BlogModule,
    ContactModule,
    UploadModule,
  ],
})
export class AppModule {}
