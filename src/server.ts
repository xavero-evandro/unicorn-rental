/* eslint-disable import/no-mutable-exports */
import app from './app';
import * as database from './config/database';
import { MONGODB_URI } from './constants/mongo.config';
import { addUnicorn, addUnicornCategory } from './migrate-data';

const startServer = async (): Promise<void> => {
  try {
    await database.connect(MONGODB_URI);

    // MIGRATE THE DATA
    await addUnicornCategory();
    await addUnicorn();

    app.listen(3333, () => {
      console.log('🦄Server Started on Port 3333');
    });
  } catch (err) {
    console.log(
      '😭Failed to Start Server, Please Also Check if MongoDB is running'
    );
    process.exit(1);
  }
};

const server = startServer().catch(x => console.error(x));

export default server;
