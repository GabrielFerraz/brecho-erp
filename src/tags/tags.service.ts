import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
  ) {}
  create(createTagDto: CreateTagDto) {
    const Tag = this.tagRepo.create(createTagDto);
    return this.tagRepo.save(Tag);
  }

  findAll() {
    return this.tagRepo.find();
  }

  findOne(id: number) {
    return this.tagRepo.findOneBy({ id });
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return this.tagRepo.update(id, updateTagDto);
  }

  async remove(id: number) {
    return await this.tagRepo.delete(id);
  }
}
