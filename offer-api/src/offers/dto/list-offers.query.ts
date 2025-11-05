import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import type { OfferStatus } from '../offer.schema';
import { Type } from 'class-transformer';

export class ListOffersQuery {
  @IsOptional()
  @IsIn(['draft', 'published'])
  status?: OfferStatus;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;
}