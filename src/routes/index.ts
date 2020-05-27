import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import unicornRentalRouter from './unicorn.routes';
import healtzRouter from './healtz.routes';
import swaggerSpec from '../../swagger';

const routes = Router();

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
routes.use('/unicorns', unicornRentalRouter);
routes.use('/healtz', healtzRouter);

export default routes;
