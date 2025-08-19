import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';


@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name, 'productsConnection') private productModel: Model<ProductDocument>) {}

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

 async filterProducts(filters: {
  name?: string;
  startDate?: string;
  endDate?: string;
  stock?: string;  // will accept numbers
}): Promise<Product[]> {
  const query: any = {};

  //  Filter by name (case-insensitive)
  if (filters.name) {
  const cleanedName = filters.name.replace(/[^a-zA-Z0-9 ]/g, ''); // remove unwanted chars
  query.name = { $regex: cleanedName, $options: 'i' };
}

  //  Filter by created date
  if (filters.startDate || filters.endDate) {
    query.createdAt = {};
    if (filters.startDate) {
      query.createdAt.$gte = new Date(filters.startDate);
    }
    if (filters.endDate) {
      query.createdAt.$lte = new Date(filters.endDate);
    }
  }

  //  Filter by stock count
  if (filters.stock) {
    const stockNum = Number(filters.stock);
    if (!isNaN(stockNum)) {
      query.stock = stockNum; // exact stock count
    }
  }

  return this.productModel.find(query).exec();
}


}
