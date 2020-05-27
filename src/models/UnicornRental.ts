import mongoose from 'mongoose';

export type UnicornCategoriesDocument = mongoose.Document & {
  uuid: string;
  basePrice: number;
  lackMinutes: number;
};

export type UnicornsDocument = mongoose.Document & {
  uuid: string;
  name: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
};

export type RentalUnicornsDocument = mongoose.Document & {
  uuid: string;
  unicornId: string;
  rentedAt: Date;
  deliveredAt?: Date;
};

const unicornCategorySchema = new mongoose.Schema({
  uuid: {
    type: String,
    unique: true,
    index: true,
  },
  basePrice: Number,
  lackMinutes: Number,
});

const unicornSchema = new mongoose.Schema({
  uuid: {
    type: String,
    unique: true,
    index: true,
  },
  name: String,
  categoryId: String,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const rentalUnicornSchema = new mongoose.Schema({
  uuid: {
    type: String,
    unique: true,
    index: true,
  },
  unicornId: String,
  rentedAt: { type: Date, default: Date.now() },
  deliveredAt: { type: Date, required: false, default: null },
});

export const UnicornCategory = mongoose.model<UnicornCategoriesDocument>(
  'UnicornCategories',
  unicornCategorySchema
);

export const Unicorn = mongoose.model<UnicornsDocument>(
  'Unicorns',
  unicornSchema
);

export const RentalUnicorn = mongoose.model<RentalUnicornsDocument>(
  'RentalUnicorns',
  rentalUnicornSchema
);
