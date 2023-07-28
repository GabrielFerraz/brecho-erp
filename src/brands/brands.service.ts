import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Brand } from "./entities/brand.entity";

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandRepo: Repository<Brand>,
  ) {}
  create(createBrandDto: CreateBrandDto) {
    const category = this.brandRepo.create(createBrandDto);
    return this.brandRepo.save(category);
  }

  findAll() {
    return this.brandRepo.find();
  }

  findOne(id: number) {
    return this.brandRepo.findOneBy({ id });
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.brandRepo.update(id, updateBrandDto);
  }

  async remove(id: number) {
    return await this.brandRepo.delete(id);
  }
}
