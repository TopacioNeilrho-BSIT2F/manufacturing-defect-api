import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  product_name: string;

  @IsOptional()
  @IsString()
  description?: string;
}