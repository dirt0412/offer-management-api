import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OfferDocument = HydratedDocument<Offer>;
export type OfferStatus = 'draft' | 'published';

@Schema({ timestamps: true, collection: 'offer' })
export class Offer {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ enum: ['draft', 'published'], default: 'draft', index: true })
  status: OfferStatus;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
OfferSchema.index({ status: 1, createdAt: -1 });