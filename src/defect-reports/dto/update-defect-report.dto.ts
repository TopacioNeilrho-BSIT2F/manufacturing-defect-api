import { PartialType } from '@nestjs/mapped-types';
import { CreateDefectReportDto } from './create-defect-report.dto.js';

export class UpdateDefectReportDto extends PartialType(
  CreateDefectReportDto,
) {}
