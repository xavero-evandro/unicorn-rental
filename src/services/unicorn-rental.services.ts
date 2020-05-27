/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from 'uuid';
import {
  RentalUnicorn,
  RentalUnicornsDocument,
  Unicorn,
  UnicornsDocument,
  UnicornCategory,
  UnicornCategoriesDocument,
} from '../models/UnicornRental';
import HttpException from '../exceptions/HttpException';
import { dateDiffInMinutes, dateFormatDE } from '../utils/date-utils';

const getUnicorn = async (unicornName: string): Promise<UnicornsDocument> => {
  const unicorn = await Unicorn.findOne({
    name: new RegExp(unicornName, 'i'),
  });
  if (!unicorn) throw new HttpException(400, 'Unicorn Not Found');
  return unicorn;
};

const getRentalDetails = async (
  unicorn: UnicornsDocument
): Promise<RentalUnicornsDocument | null> => {
  const rentalDetail = await RentalUnicorn.findOne({
    unicornId: unicorn.uuid,
  })
    .sort({ rentedAt: -1 })
    .limit(1);

  return rentalDetail;
};

const getUnicornCategory = async (
  unicorn: UnicornsDocument
): Promise<UnicornCategoriesDocument | null> => {
  return UnicornCategory.findOne({
    uuid: unicorn.categoryId,
  });
};

const getRentalPriceToPay = (
  rentedAt: Date,
  deliveredAt: Date,
  basePrize = 0
): number => {
  const rentedMinutes = dateDiffInMinutes(rentedAt, deliveredAt);
  const rentedHourPrize = (rentedMinutes / 60) * basePrize;
  return rentedHourPrize;
};

const checkRemainingRestTime = async (
  unicorn: UnicornsDocument,
  deliveredAt: Date
): Promise<string> => {
  const diff = dateDiffInMinutes(deliveredAt, new Date());

  const unicornCategory = await getUnicornCategory(unicorn);

  const lackMinutes = unicornCategory?.lackMinutes || 0;
  if (diff < lackMinutes) {
    const restMinutesLeft = (lackMinutes - diff).toFixed(0);
    return `The ${unicorn.name} 🦄 needs to rest for ${restMinutesLeft} minutes more, please wait.`;
  }
  return '';
};

const newUnicornRental = async (
  unicorn: UnicornsDocument
): Promise<Record<string, any>> => {
  const newRental = new RentalUnicorn({
    uuid: uuidv4(),
    unicornId: unicorn.uuid,
    rentedAt: new Date(),
    deliveredAt: null,
  });
  const unicornCategory = await getUnicornCategory(unicorn);
  const basePriceFormatted = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(unicornCategory?.basePrice || 0);
  const rentedUnicorn = await newRental.save();
  if (!rentedUnicorn)
    throw new HttpException(
      400,
      'Can not rental this Unicorn right now, horses problems, sorry 😢'
    );
  return {
    message: `Unicorn ${unicorn.name} rented successfully, enjoy your ride!`,
    unicorn: unicorn.name,
    rentedAt: dateFormatDE(rentedUnicorn.rentedAt),
    basePrice: `Price per Hour is ${basePriceFormatted}`,
  };
};

const returnRentedUnicorn = async (
  unicorn: UnicornsDocument,
  rentalDetail: RentalUnicornsDocument
): Promise<Record<string, string>> => {
  try {
    rentalDetail.deliveredAt = new Date();
    await rentalDetail.save();

    const unicornCategory = await getUnicornCategory(unicorn);

    const value = getRentalPriceToPay(
      rentalDetail.rentedAt,
      rentalDetail.deliveredAt,
      unicornCategory?.basePrice
    );
    const valueFormated = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);

    return {
      message: `Unicorn returned successfully, you have to pay ${valueFormated} Thanks!`,
      value: value.toFixed(2),
      unicorn: unicorn.name,
      deliveredTime: dateFormatDE(rentalDetail.deliveredAt),
    };
  } catch (error) {
    return error;
  }
};

const UnicornRentalService = {
  getUnicorn,
  getRentalDetails,
  getRentalPriceToPay,
  getUnicornCategory,
  checkRemainingRestTime,
  newUnicornRental,
  returnRentedUnicorn,
};

export default UnicornRentalService;
