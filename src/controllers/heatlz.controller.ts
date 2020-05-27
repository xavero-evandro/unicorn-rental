/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';

const HealtzController = {
  async status(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'Unicorn Service ok ✨🦄✨',
      status: 200,
      timestamp: Date.now(),
    };
    return res.json(healthcheck);
  },
};

export default HealtzController;
