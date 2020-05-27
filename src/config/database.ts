import mongoose from 'mongoose';

export const connect = async (uri: string): Promise<void> => {
  try {
    const mongoUrl = uri;
    mongoose.Promise = Promise;

    if (!mongoUrl) {
      process.exit(1);
    }

    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

export const disconnect = async (): Promise<void> => {
  await mongoose.disconnect();
};
