import { Injectable, Logger } from "@nestjs/common";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Category } from '../category/entities/category.entity';
import { Tag } from '../tags/entities/tag.entity';
import { Brand } from '../brands/entities/brand.entity';

@Injectable()
export class ProductService {
  async create(createProductDto: CreateProductDto) {
    const partialProduct: any = createProductDto;
    if (Object.hasOwnProperty.bind(partialProduct)('supplier')) {
      partialProduct.supplier = await Supplier.findOneBy({
        id: createProductDto.supplier,
      });
    }
    if (Object.hasOwnProperty.bind(partialProduct)('categories')) {
      partialProduct.categories = await Category.find({
        where: {
          id: In(createProductDto.categories),
        },
      });
    }
    if (Object.hasOwnProperty.bind(partialProduct)('tags')) {
      partialProduct.tags = await Tag.find({
        where: {
          id: In(createProductDto.tags),
        },
      });
    }
    if (Object.hasOwnProperty.bind(partialProduct)('brand')) {
      partialProduct.brand = await Brand.findOneBy({
        id: createProductDto.brand,
      });
    }
    const product = Product.create(partialProduct);
    return Product.save(product);
  }

  findAll(page: number) {
    Logger.log('page', page);
    return Product.find({
      relations: {
        brand: true,
        categories: true,
        tags: true,
        supplier: true,
      },
      take: 10,
      skip: 10 * (page - 1),
    });
  }

  findOne(id: number) {
    return Product.find({
      where: {
        id,
      },
      relations: {
        brand: true,
        categories: true,
        tags: true,
        supplier: true,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const partialProduct: any = updateProductDto;
    if (partialProduct.supplier) {
      partialProduct.supplier = Supplier.findOneBy({
        id: updateProductDto.supplier,
      });
    }
    if (partialProduct.categories) {
      partialProduct.categories = Category.find({
        where: {
          id: In(updateProductDto.categories),
        },
      });
    }
    if (partialProduct.tags) {
      partialProduct.tags = Tag.find({
        where: {
          id: In(updateProductDto.tags),
        },
      });
    }
    if (partialProduct.brand) {
      partialProduct.brand = Brand.findOneBy({
        id: updateProductDto.brand,
      });
    }
    const product = Product.create(partialProduct);
    return Product.update(id, product);
  }

  async remove(id: number) {
    return await Product.delete(id);
  }
}
