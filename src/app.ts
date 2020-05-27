import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import errorHandler from './middlewares/error.middleware';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.use(errorHandler);

export default app;
