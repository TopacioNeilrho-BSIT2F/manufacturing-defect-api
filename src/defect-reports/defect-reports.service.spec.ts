import { Test, TestingModule } from '@nestjs/testing';
import { DefectReportsService } from './defect-reports.service.js';

describe('DefectReportsService', () => {
  let service: DefectReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefectReportsService],
    }).compile();

    service = module.get<DefectReportsService>(DefectReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
