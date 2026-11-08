import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefectReportsService } from './defect-reports.service.js';
import { DefectReportsController } from './defect-reports.controller.js';
import { DefectReport } from './entities/defect-report.entity.js';
import { RolesGuard } from '../common/roles.guard.js';

@Module({
  imports: [TypeOrmModule.forFeature([DefectReport])],
  controllers: [DefectReportsController],
 providers: [DefectReportsService, RolesGuard],
})
export class DefectReportsModule {}
