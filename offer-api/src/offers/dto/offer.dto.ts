import { IsIn, IsOptional, IsString } from 'class-validator';
import type { OfferStatus } from '../offer.schema';

export class CreateOfferDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsIn(['draft', 'published'])
  status?: OfferStatus;
}

export class UpdateOfferDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['draft', 'published'])
  status?: OfferStatus;
} 
