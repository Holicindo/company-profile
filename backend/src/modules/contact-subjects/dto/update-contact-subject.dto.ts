import { PartialType } from '@nestjs/mapped-types';
import { CreateContactSubjectDto } from './create-contact-subject.dto';

export class UpdateContactSubjectDto extends PartialType(CreateContactSubjectDto) {}
