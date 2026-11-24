
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';

import { DefectReportsService } from './defect-reports.service.js';
import { CreateDefectReportDto } from './dto/create-defect-report.dto.js';
import { UpdateDefectReportDto } from './dto/update-defect-report.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard.js';
import { RolesGuard } from '../common/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';

@Controller('defect-reports')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DefectReportsController {
  constructor(
    private readonly defectReportsService: DefectReportsService,
  ) {}

  @Roles('admin', 'staff', 'inspector')
  @Post()
  create(
    @Body() createDefectReportDto: CreateDefectReportDto,
    @Req() request: any,
  ) {
    return this.defectReportsService.create(
      createDefectReportDto,
      request.user.user_id,
    );
  }

  @Roles('admin', 'staff')
  @Get()
  findAll() {
    return this.defectReportsService.findAll();
  }

  // Filter by status
  @Roles('admin', 'staff')
  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.defectReportsService.findByStatus(status);
  }

  // Filter by severity
  @Roles('admin', 'staff')
  @Get('severity/:severity')
  findBySeverity(@Param('severity') severity: string) {
    return this.defectReportsService.findBySeverity(severity);
  }

  // Filter by product ID
  @Roles('admin', 'staff')
  @Get('product/:productId')
  findByProduct(
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.defectReportsService.findByProduct(productId);
  }

  @Roles('admin', 'staff', 'inspector')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.defectReportsService.findOne(id);
  }

  @Roles('admin', 'staff')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDefectReportDto: UpdateDefectReportDto,
  ) {
    return this.defectReportsService.update(id, updateDefectReportDto);
  }

  @Roles('admin')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.defectReportsService.remove(id);
  }
}
