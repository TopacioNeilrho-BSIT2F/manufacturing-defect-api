
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DefectReport } from './entities/defect-report.entity.js';
import { Product } from '../products/entities/product.entity.js';
import { User } from '../users/entities/user.entity.js';
import { CreateDefectReportDto } from './dto/create-defect-report.dto.js';
import { UpdateDefectReportDto } from './dto/update-defect-report.dto.js';

@Injectable()
export class DefectReportsService {
  constructor(
    @InjectRepository(DefectReport)
    private defectReportsRepository: Repository<DefectReport>,
  ) {}

  private async validateProduct(productId: number) {
    const product = await this.defectReportsRepository.manager
      .getRepository(Product)
      .findOneBy({ product_id: productId });

    if (!product) {
      throw new NotFoundException(
        `Product with ID ${productId} not found`,
      );
    }
  }

  private async validateReporter(userId: number) {
    const user = await this.defectReportsRepository.manager
      .getRepository(User)
      .findOneBy({ user_id: userId });

    if (!user) {
      throw new NotFoundException(
        `User with ID ${userId} not found`,
      );
    }
  }

  async create(
    createDefectReportDto: CreateDefectReportDto,
    reportedBy: number,
  ) {
    await this.validateProduct(
      createDefectReportDto.product_id,
    );

    await this.validateReporter(reportedBy);

    const report = this.defectReportsRepository.create({
      ...createDefectReportDto,
      reported_by: reportedBy,
    });

    return this.defectReportsRepository.save(report);
  }

  findAll() {
    return this.defectReportsRepository.find();
  }

  async findOne(id: number) {
    const report = await this.defectReportsRepository.findOneBy({
      report_id: id,
    });

    if (!report) {
      throw new NotFoundException(
        `Defect report with ID ${id} not found`,
      );
    }

    return report;
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

  async update(
    id: number,
    updateDefectReportDto: UpdateDefectReportDto,
  ) {
    await this.findOne(id);

    if (updateDefectReportDto.product_id !== undefined) {
      await this.validateProduct(
        updateDefectReportDto.product_id,
      );
    }

    return this.defectReportsRepository.update(
      id,
      updateDefectReportDto,
    );
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.defectReportsRepository.delete(id);
  }
}
