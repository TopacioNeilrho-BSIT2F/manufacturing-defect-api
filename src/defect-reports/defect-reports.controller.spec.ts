import { Test, TestingModule } from '@nestjs/testing';
import { DefectReportsController } from './defect-reports.controller.js';
import { DefectReportsService } from './defect-reports.service.js';

describe('DefectReportsController', () => {
  let controller: DefectReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DefectReportsController],
      providers: [DefectReportsService],
    }).compile();

    controller = module.get<DefectReportsController>(DefectReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
