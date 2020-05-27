/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import * as unicornCategories from '../UnicornCategory.json';
import * as unicorns from '../Unicorn.json';
import { UnicornCategory, Unicorn } from './models/UnicornRental';

export const addUnicornCategory = async (): Promise<void> => {
  try {
    await unicornCategories.data.map(async (category: any) => {
      const { uuid, basePrice, lackMinutes } = category;
      const found = await UnicornCategory.findOne({ uuid });
      if (!found) {
        await UnicornCategory.create({ uuid, basePrice, lackMinutes });
      }
    });
  } catch (error) {
    return error;
  }
};

export const addUnicorn = async (): Promise<void> => {
  try {
    await unicorns.data.map(async (unicorn: any) => {
      const { uuid, name, categoryId, createdAt, updatedAt } = unicorn;
      const found = await Unicorn.findOne({ uuid });
      if (!found) {
        await Unicorn.create({ uuid, name, categoryId, createdAt, updatedAt });
      }
    });
  } catch (error) {
    return error;
  }
};
