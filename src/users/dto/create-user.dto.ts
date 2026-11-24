import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsIn,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsIn(['admin', 'staff', 'inspector'])
  role: string;
}