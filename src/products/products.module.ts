import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsService } from './products.service';
;
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductsController } from './products.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
