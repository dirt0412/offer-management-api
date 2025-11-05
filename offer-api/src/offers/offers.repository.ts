import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Offer, OfferDocument } from './offer.schema';

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}

@Injectable()
export class OffersRepository {
  constructor(@InjectModel(Offer.name) private readonly model: Model<OfferDocument>) {}

  create(data: Partial<Offer>) {
    return this.model.create(data);
  }

  updateById(id: string, data: Partial<Offer>) {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  findById(id: string) {
    return this.model.findById(id).exec();
  }

  removeById(id: string) {
    return this.model.findByIdAndDelete(id).exec();
  }

  async list(filter: FilterQuery<Offer>, page = 1, limit = 20): Promise<Paginated<Offer>> {
    const query = this.model.find(filter).sort({ createdAt: -1, _id: -1 });
    const [items, total] = await Promise.all([
      query.skip((page - 1) * limit).limit(limit).exec(),
      this.model.countDocuments(filter),
    ]);
    return { items, total, page, pages: Math.ceil(total / limit), limit };
  }
}