import { Router } from 'express';
import HealtzController from '../controllers/heatlz.controller';

const healtzRouter = Router();

healtzRouter.get('/', HealtzController.status);

export default healtzRouter;
