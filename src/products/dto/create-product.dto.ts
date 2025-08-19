import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  price: string;

   // for single file upload
  image?: Express.Multer.File;

  // for multiple files upload
  images?: Express.Multer.File[];
}
