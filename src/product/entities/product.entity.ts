import {
  Column, CreateDateColumn, DeleteDateColumn,
  Entity, JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm";
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { Category } from '../../category/entities/category.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { Brand } from '../../brands/entities/brand.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    length: 20,
  })
  code: string;

  @Column('float')
  min_price: number;

  @Column('float')
  max_price: number;

  @Column('float')
  purchase_price: number;

  @Column('float')
  sell_price: number;

  @Column('float')
  weight: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  supplier: Supplier;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Tag, (tags) => tags.products)
  @JoinTable()
  tags: Tag[];

  @ManyToMany(() => Brand, (brand) => brand.products)
  @JoinTable()
  brands: Brand[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @DeleteDateColumn()
  deleted_at: string;
}
