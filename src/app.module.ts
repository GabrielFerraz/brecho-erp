import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { BrandsModule } from './brands/brands.module';
import { TagsModule } from './tags/tags.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { Product } from './product/entities/product.entity';
import { Category } from './category/entities/category.entity';
import { Tag } from './tags/entities/tag.entity';
import { Brand } from './brands/entities/brand.entity';
import { Supplier } from './suppliers/entities/supplier.entity';

@Module({
  imports: [
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'marrua_dev',
      entities: [Product, Category, Tag, Brand, Supplier],
      synchronize: true,
    }),
    ProductModule,
    BrandsModule,
    TagsModule,
    SuppliersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
