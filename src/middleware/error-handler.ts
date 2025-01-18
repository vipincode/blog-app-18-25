import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../utils/error-handling';

export const errorHandler: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  } else {
    console.error('Unhandled error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
