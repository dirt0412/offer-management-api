import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto, UpdateOfferDto } from './dto/offer.dto';
import { ListOffersQuery } from './dto/list-offers.query';
import { PaginationHeadersInterceptor } from '../common/interceptors/pagination-headers.interceptor';
import { ParseObjectIdPipe } from '../common/pipes/parse-objectid.pipe';

@Controller('offers')
export class OffersController {
  constructor(private readonly svc: OffersService) { }

  @Post()
  create(@Body() dto: CreateOfferDto) {
    return this.svc.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOfferDto) {
    return this.svc.update(id, dto);
  }

  @Get(':id')
  get(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.svc.findOne(id);
  }

  @Get()
  @UseInterceptors(PaginationHeadersInterceptor)
  list(@Query() q: ListOffersQuery) {
    return this.svc.list(q);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}