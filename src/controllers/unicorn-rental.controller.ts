/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import {
  validationResult,
  ValidationError,
  Result,
  check,
} from 'express-validator';
import UnicornRentalService from '../services/unicorn-rental.services';

const checkRequestParams = async (
  req: Request
): Promise<Result<ValidationError>> => {
  await check('unicorn', 'Unicorn name should be a string').isString().run(req);
  return validationResult(req);
};

const UnicornRentalController = {
  async rentUnicorn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      if (Array.isArray(req.query.unicorn))
        return res.status(400).json({
          errors:
            'Unfortunately we are not support multiple Unicorn rentals yet, Please select just one',
        });

      const errors = await checkRequestParams(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const unicorn = await UnicornRentalService.getUnicorn(
        req.query.unicorn.toString()
      );

      const rental = await UnicornRentalService.getRentalDetails(unicorn);

      if (rental) {
        if (rental.deliveredAt === null)
          return res
            .status(400)
            .json({ message: 'Unicorn already rented, sorry 🏇' });

        const unavailable = await UnicornRentalService.checkRemainingRestTime(
          unicorn,
          rental.deliveredAt || new Date()
        );
        if (unavailable) return res.json({ message: unavailable });
      }

      const newRental = await UnicornRentalService.newUnicornRental(unicorn);
      return res.status(200).json(newRental);
    } catch (error) {
      next(error);
    }
  },
  async returnUnicorn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const errors = await checkRequestParams(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const unicornName = req.body.unicorn;
      const unicorn = await UnicornRentalService.getUnicorn(unicornName);
      const rental = await UnicornRentalService.getRentalDetails(unicorn);

      if (rental && rental.deliveredAt !== null)
        return res.json({ message: 'Unicorn already returned ✨🦄✨' });

      let returnedUnicorn;
      if (rental)
        returnedUnicorn = await UnicornRentalService.returnRentedUnicorn(
          unicorn,
          rental
        );

      return res.json(returnedUnicorn);
    } catch (error) {
      next(error);
    }
  },
};

export default UnicornRentalController;
