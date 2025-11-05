import { Injectable } from '@nestjs/common';
import { OffersRepository } from './offers.repository';
import { CreateOfferDto, UpdateOfferDto } from './dto/offer.dto';
import { ListOffersQuery } from './dto/list-offers.query';

@Injectable()
export class OffersService {
  constructor(private readonly repo: OffersRepository) { }

  create(dto: CreateOfferDto) {
    return this.repo.create(dto);
  }

  update(id: string, dto: UpdateOfferDto) {
    return this.repo.updateById(id, dto);
  }

  findOne(id: string) {
    return this.repo.findById(id);
  }

  remove(id: string) {
    return this.repo.removeById(id);
  }

  list(q: ListOffersQuery) {
    const filter: any = {};
    if (q.status) filter.status = q.status;
    if (q.search) filter.$or = [
      { title: { $regex: q.search, $options: 'i' } },
      { description: { $regex: q.search, $options: 'i' } },
    ];
    const page = Number(q.page ?? 1);
    const limit = Math.min(Number(q.limit ?? 20), 100);
    return this.repo.list(filter, page, limit);
  }
}