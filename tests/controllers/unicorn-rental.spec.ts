/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import httpMocks from 'node-mocks-http';
import UnicornRentalController from '../../src/controllers/unicorn-rental.controller';
import UnicornRentalService from '../../src/services/unicorn-rental.services';

jest.mock('../../src/services/unicorn-rental.services');

let req: any;
let res: any;
let next: any;

const unicornPinkyPieMock = {
  createdAt: '2020-05-01T10:00:00.000Z',
  updatedAt: '2020-05-01T10:00:00.000Z',
  _id: '5eb05664a298c430dcf3ca17',
  uuid: '9e9c286c-d0f2-4d2b-b410-ebf394d5b5be',
  name: 'Pinky Pie',
  categoryId: '104eb716-6622-4008-b3f8-189f6bbcc58f',
};

const newPinkyPieRentalMocked = {
  message: 'Unicorn Pinky Pie rented successfully, enjoy your ride!',
  unicorn: 'Pinky Pie',
  rentedAt: '08.05.2020, 12:45:45',
  basePrice: 'Price per Hour is 8,00 €',
};

const returnedUnicornMock = {
  message: 'Unicorn returned successfully, you have to pay 131,30 € Thanks!',
  value: '131.30',
  unicorn: 'Pinky Pie',
  deliveredTime: '08.05.2020, 14:57:53',
};

beforeAll(async () => {
  UnicornRentalService.getUnicorn = jest
    .fn()
    .mockResolvedValue(unicornPinkyPieMock);
  UnicornRentalService.newUnicornRental = jest
    .fn()
    .mockResolvedValue(newPinkyPieRentalMocked);
  UnicornRentalService.returnRentedUnicorn = jest
    .fn()
    .mockResolvedValue(returnedUnicornMock);
});

beforeEach(async () => {
  req = await httpMocks.createRequest();
  res = await httpMocks.createResponse();
  next = jest.fn();
});

afterAll(async () => {
  jest.clearAllMocks();
});

describe('Test Unicorn Rental Controller', () => {
  it('should return an Unicorn Rental', async done => {
    UnicornRentalService.getRentalDetails = jest.fn().mockResolvedValue(null);
    req.query = { unicorn: 'Pinky Pie' };
    await UnicornRentalController.rentUnicorn(req, res, next);
    expect(UnicornRentalService.getUnicorn).toHaveBeenCalled();
    expect(UnicornRentalService.getUnicorn).toHaveBeenCalledWith('Pinky Pie');
    expect(UnicornRentalService.getRentalDetails).toHaveBeenCalled();
    expect(UnicornRentalService.newUnicornRental).toHaveBeenCalled();
    expect(res._getJSONData()).toStrictEqual(newPinkyPieRentalMocked);
    done();
  });

  it('should return a Rented Unicorn', async done => {
    UnicornRentalService.getRentalDetails = jest.fn().mockResolvedValue({
      uuid: 'cf0a21dc-ef37-49f3-b365-4f296ff31ca7',
      unicornId: '9e9c286c-d0f2-4d2b-b410-ebf394d5b5be',
      rentedAt: '2020-05-07T20:33:08.290+00:00',
      deliveredAt: null,
    });
    req.query = { unicorn: 'Pinky Pie' };
    await UnicornRentalController.returnUnicorn(req, res, next);
    expect(UnicornRentalService.getUnicorn).toHaveBeenCalled();
    expect(UnicornRentalService.getUnicorn).toHaveBeenCalledWith('Pinky Pie');
    expect(UnicornRentalService.getRentalDetails).toHaveBeenCalled();
    expect(UnicornRentalService.returnRentedUnicorn).toHaveBeenCalled();
    expect(res._getJSONData()).toStrictEqual(returnedUnicornMock);
    done();
  });

  it('should return a message when try to return a already returned Unicorn', async done => {
    UnicornRentalService.getRentalDetails = jest.fn().mockResolvedValue({
      uuid: 'cf0a21dc-ef37-49f3-b365-4f296ff31ca7',
      unicornId: '9e9c286c-d0f2-4d2b-b410-ebf394d5b5be',
      rentedAt: '2020-05-07T20:33:08.290+00:00',
      deliveredAt: '2020-05-07T20:53:08.290+00:00',
    });
    req.query = { unicorn: 'Pinky Pie' };
    await UnicornRentalController.returnUnicorn(req, res, next);
    expect(UnicornRentalService.getUnicorn).toHaveBeenCalled();
    expect(UnicornRentalService.getUnicorn).toHaveBeenCalledWith('Pinky Pie');
    expect(UnicornRentalService.getRentalDetails).toHaveBeenCalled();
    expect(UnicornRentalService.returnRentedUnicorn).toHaveBeenCalled();
    expect(res._getJSONData()).toStrictEqual({
      message: 'Unicorn already returned ✨🦄✨',
    });
    done();
  });
});
