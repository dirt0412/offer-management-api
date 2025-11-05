import { Test } from '@nestjs/testing';
import { OffersService } from '../src/offers/offers.service';
import { OffersRepository } from '../src/offers/offers.repository';

describe('OffersService', () => {
  let service: OffersService;
  let repo: jest.Mocked<OffersRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        OffersService,
        {
          provide: OffersRepository,
          useValue: {
            create: jest.fn(),
            updateById: jest.fn(),
            findById: jest.fn(),
            list: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get(OffersService);
    repo = moduleRef.get(OffersRepository) as jest.Mocked<OffersRepository>;
  });

  it('should create a new offer', async () => {
    const dto = { title: 'Backend Dev', description: 'NestJS', status: 'draft' as const };
    repo.create.mockResolvedValue({ _id: '1', ...dto } as any);

    const result = await service.create(dto as any);

    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(result).toMatchObject({ _id: '1', title: 'Backend Dev' });
  });

  it('should update an existing offer', async () => {
    repo.updateById.mockResolvedValue({ _id: '1', title: 'Updated' } as any);

    const result = await service.update('1', { title: 'Updated' } as any);

    expect(repo.updateById).toHaveBeenCalledWith('1', { title: 'Updated' });
    expect(result).toMatchObject({ title: 'Updated' });
  });

  it('should return a single offer by id', async () => {
    repo.findById.mockResolvedValue({ _id: '1', title: 'One', description: 'Desc', status: 'draft' } as any);

    const result = await service.findOne('1');

    expect(repo.findById).toHaveBeenCalledWith('1');
    expect(result).toMatchObject({ _id: '1' });
  });

  it('should list offers with pagination and filters', async () => {
    repo.list.mockResolvedValue({
      items: [
        { _id: 'a', title: 'Offer A', description: 'Test offer', status: 'draft' } as any,
      ],
      total: 1,
      page: 1,
      pages: 1,
      limit: 10,
    } as any);

    const result = await service.list({ page: 1, limit: 10 } as any);

    expect(repo.list).toHaveBeenCalled();
    expect(result).toHaveProperty('items');
    expect(result.total).toBe(1);
  });
});
