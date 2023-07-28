import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepo: Repository<Supplier>,
  ) {}
  create(createSupplierDto: CreateSupplierDto) {
    const supplier = this.supplierRepo.create(createSupplierDto);
    return this.supplierRepo.save(supplier);
  }

  findAll() {
    return this.supplierRepo.find();
  }

  findOne(id: number) {
    return this.supplierRepo.findOneBy({ id });
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return this.supplierRepo.update(id, updateSupplierDto);
  }

  async remove(id: number) {
    return await this.supplierRepo.delete(id);
  }
}
