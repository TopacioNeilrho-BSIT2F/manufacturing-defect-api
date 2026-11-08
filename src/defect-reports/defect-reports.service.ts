import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DefectReport } from './entities/defect-report.entity.js';
import { CreateDefectReportDto } from './dto/create-defect-report.dto.js';
import { UpdateDefectReportDto } from './dto/update-defect-report.dto.js';

@Injectable()
export class DefectReportsService {
  constructor(
    @InjectRepository(DefectReport)
    private defectReportsRepository: Repository<DefectReport>,
  ) {}

  create(
    createDefectReportDto: CreateDefectReportDto,
    reportedBy: number,
  ) {
    const report = this.defectReportsRepository.create({
      ...createDefectReportDto,
      reported_by: reportedBy,
    });

    return this.defectReportsRepository.save(report);
  }

  findAll() {
    return this.defectReportsRepository.find();
  }

  findOne(id: number) {
    return this.defectReportsRepository.findOneBy({ report_id: id });
  }

  update(id: number, updateDefectReportDto: UpdateDefectReportDto) {
    return this.defectReportsRepository.update(id, updateDefectReportDto);
  }

  remove(id: number) {
    return this.defectReportsRepository.delete(id);
  }
}