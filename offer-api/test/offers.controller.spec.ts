import { Test } from '@nestjs/testing';
import { OffersController } from '../src/offers/offers.controller';
import { OffersService } from '../src/offers/offers.service';

describe('OffersController', () => {
  let controller: OffersController;
  let service: jest.Mocked<OffersService>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OffersController],
      providers: [
        {
          provide: OffersService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            findOne: jest.fn(),
            list: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get(OffersController);
    service = moduleRef.get(OffersService) as jest.Mocked<OffersService>;
  });

  it('should call service to create', async () => {
    service.create.mockResolvedValue({ _id: '1' } as any);

    await controller.create({ title: 'A', description: 'B', status: 'draft' } as any);

    expect(service.create).toHaveBeenCalled();
  });

  it('should call service to update', async () => {
    service.update.mockResolvedValue({ _id: '1', title: 'X' } as any);

    await controller.update('1', { title: 'X' } as any);

    expect(service.update).toHaveBeenCalledWith('1', { title: 'X' });
  });

  it('should call service to get one', async () => {
    service.findOne.mockResolvedValue({ _id: '1' } as any);

    await controller.get('1');

    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should call service to list', async () => {
    service.list.mockResolvedValue({ items: [], total: 0, page: 1, pages: 0, limit: 10 } as any);

    const res = await controller.list({} as any);

    expect(service.list).toHaveBeenCalled();
    expect(res).toHaveProperty('items');
  });
});
