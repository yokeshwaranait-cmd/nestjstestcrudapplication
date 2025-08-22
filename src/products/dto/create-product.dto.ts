import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  stock?: string;

  @IsNotEmpty()
  @IsString()
  price!: string;

  // for single file upload
  image?: (string | File)[];

  // for multiple files upload
  images?: (string | File)[];
}
