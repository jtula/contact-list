import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

const returnedCreatedMock = {
  _id: '123',
  name: 'jose',
  address: 'Capotico',
  phone: '123',
  email: 'test@example.com'
}

const createContactMock = {
  name: 'jose',
  address: 'Capotico',
  phone: '123',
  email: 'test@example.com'
}

const mockService = {
  createContact: jest.fn().mockResolvedValueOnce(returnedCreatedMock),
  getApiHome: jest.fn().mockReturnValueOnce({ msg: 'Hi!' }),
}

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [{provide: AppService, useValue: mockService}],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return "Hi!"', () => {
    expect(service.getApiHome()).toEqual({ msg: 'Hi!' });
  });

  it('should create a new contact', async () => {
    const result = await service.createContact(createContactMock);
    expect(service.createContact).toHaveBeenCalledWith(createContactMock);
    expect(result).toEqual(returnedCreatedMock);
  });
 
});