import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';


@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(dto: CreateProductDto, imagePaths: string[]): Promise<Product> {
    try {
      const product = new this.productModel({
        ...dto,
        images: imagePaths && imagePaths.length > 0 ? imagePaths : undefined, 
      });
      return await product.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
  const product = await this.productModel.findById(id).lean().exec();
  if (!product) throw new NotFoundException('Product not found');

  return {
    ...product,
    hasImages: product.images?.length > 0,
  };
}


  async update(id: string, dto: CreateProductDto, imagePaths?: string[]): Promise<Product> {
  const updateData: any = { ...dto };

  if (imagePaths && imagePaths.length > 0) {
    updateData.images = imagePaths;  // <-- string[]
  }

  const product = await this.productModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  if (!product) throw new NotFoundException('Product not found');

  return product;
}

  async delete(id: string): Promise<{ message: string }> {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Product not found');
    return { message: 'Product deleted successfully' };
  }
}
