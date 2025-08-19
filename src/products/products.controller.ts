import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import type { Express } from 'express';

const storage = diskStorage({
  destination: './uploads/products',
  filename: (req, file, callback) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    callback(null, uniqueName + extname(file.originalname));
  },
});

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //  Create product with SINGLE image
 @Post('single')
@UseInterceptors(FileInterceptor('image', { storage, fileFilter: imageFileFilter }))
async createSingle(
  @Body() dto: CreateProductDto,
  @UploadedFile() file: Express.Multer.File, 
) {
  const imagePaths = file ? [`/uploads/products/${file.filename}`] : [];
  return this.productsService.create(dto, imagePaths);
}

@Post('multiple')
@UseInterceptors(FilesInterceptor('images', 5, { storage }))
async createMultiple(
  @Body() dto: CreateProductDto,
  @UploadedFiles() files: Express.Multer.File[], 
) {
  const imagePaths = files.map((file) => `/uploads/products/${file.filename}`);
  return this.productsService.create(dto, imagePaths);
}


  @Get()
  async findAll() {
    try {
      return await this.productsService.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  //  Get product by id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put('single/:id')
  @UseInterceptors(
    FileInterceptor('image', { storage, fileFilter: imageFileFilter }),
  )
  async updateSingle(
    @Param('id') id: string,
    @Body() dto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      const imagePaths = file ? [`/uploads/products/${file.filename}`] : [];
      return await this.productsService.update(id, dto, imagePaths);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  //  Update product with MULTIPLE images
  @Patch('multiple/:id')
  @UseInterceptors(FilesInterceptor('images', 5, { storage }))
  async updateMultiple(
    @Param('id') id: string,
    @Body() dto: CreateProductDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    try {
      const imagePaths =
        files?.map((file) => `/uploads/products/${file.filename}`) || [];
      return await this.productsService.update(id, dto, imagePaths);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  //  Delete product
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.productsService.delete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
