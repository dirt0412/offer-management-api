import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto, UpdateOfferDto } from './dto/offer.dto';
import { ListOffersQuery } from './dto/list-offers.query';
import { PaginationHeadersInterceptor } from '../common/interceptors/pagination-headers.interceptor';
import { ParseObjectIdPipe } from '../common/pipes/parse-objectid.pipe';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('offers')
@Controller('offers')
export class OffersController {
  constructor(private readonly svc: OffersService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new offer' })
  @ApiCreatedResponse({ description: 'Offer created' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiBody({ type: CreateOfferDto })
  create(@Body() dto: CreateOfferDto) {
    return this.svc.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOfferDto) {
    return this.svc.update(id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get offer by id' })
  @ApiOkResponse({ description: 'Offer found' })
  @ApiNotFoundResponse({ description: 'Offer not found' })
  @ApiParam({ name: 'id', description: 'Offer ObjectId' })
  get(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.svc.findOne(id);
  }

  @ApiOperation({ summary: 'List offers (pagination & filters)' })
  @ApiOkResponse({ description: 'Paginated list of offers' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: ['draft', 'published'] })
  @ApiQuery({ name: 'search', required: false, type: String })
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