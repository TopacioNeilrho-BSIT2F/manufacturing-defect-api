
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
    return this.defectReportsRepository.findOneBy({
      report_id: id,
    });
  }

  // Filter reports by status
  findByStatus(status: string) {
    return this.defectReportsRepository.find({
      where: { status },
    });
  }

  // Filter reports by severity
  findBySeverity(severity: string) {
    return this.defectReportsRepository.find({
      where: { severity },
    });
  }

  // Filter reports by product ID
  findByProduct(productId: number) {
    return this.defectReportsRepository.find({
      where: { product_id: productId },
    });
  }

  update(id: number, updateDefectReportDto: UpdateDefectReportDto) {
    return this.defectReportsRepository.update(
      id,
      updateDefectReportDto,
    );
  }

  remove(id: number) {
    return this.defectReportsRepository.delete(id);
  }
}
