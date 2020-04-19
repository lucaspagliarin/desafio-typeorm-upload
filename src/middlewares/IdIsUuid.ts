import { Request, Response, NextFunction } from 'express';

import { isUuid } from 'uuidv4';

import AppError from '../errors/AppError';

export default function IdIsUuid(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { id } = request.params;
  if (!isUuid(id)) {
    throw new AppError('Invalid uuid', 400);
  }
  next();
}
