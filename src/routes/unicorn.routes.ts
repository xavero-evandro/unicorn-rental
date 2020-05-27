import { Router } from 'express';
import UnicornRentalController from '../controllers/unicorn-rental.controller';

const unicornRentalRouter = Router();

/**
 * @swagger
 *
 * /unicorns/rentals:
 *    get:
 *     description: Get an Unicorn Rental
 *     tags:
 *       - Rental
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: unicorn
 *        in: query
 *        description: Unicorn Name
 *        required: true
 *        schema:
 *          type: string
 *          example: 'Pinky Pie'
 *     responses:
 *       200:
 *         description: Should return a Unicorn Rental Details in JSON
 *       400:
 *         description: Bad parameters
 *       422:
 *         description: Wrong Parameter
 *       500:
 *         description: Generic error
 */
unicornRentalRouter.get('/rentals', UnicornRentalController.rentUnicorn);

/**
 * @swagger
 *
 * /unicorns/rentals:
 *    post:
 *     description: Return an Unicorn and get how much have to pay
 *     tags:
 *       - Rental
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - unicorn
 *             properties:
 *               unicorn:
 *                 type: string
 *                 example: 'Pinky Pie'
 *     responses:
 *       200:
 *         description: Should return a message with the value to pay for the Rental in JSON
 *       204:
 *         description: Should return a message when an unicorn is already returned
 *       400:
 *         description: Bad parameters
 *       422:
 *         description: Wrong Parameter
 *       500:
 *         description: Generic error
 */
unicornRentalRouter.post('/rentals', UnicornRentalController.returnUnicorn);

export default unicornRentalRouter;
