import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactSubject } from './entities/contact-subject.entity';
import { ContactSubjectsService } from './contact-subjects.service';
import { ContactSubjectsController } from './contact-subjects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContactSubject])],
  controllers: [ContactSubjectsController],
  providers: [ContactSubjectsService],
  exports: [ContactSubjectsService],
})
export class ContactSubjectsModule {}
