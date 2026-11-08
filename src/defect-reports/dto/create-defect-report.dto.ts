import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn,
  Min,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateDefectReportDto {
  @IsInt()
  @Min(1)
  product_id!: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  defect_description!: string;

  @IsIn(['Low', 'Medium', 'High'])
  severity!: string;

  @IsOptional()
  @IsIn(['Pending', 'In Progress', 'Resolved'])
  status?: string;
}