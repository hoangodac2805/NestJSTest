import { Request } from 'express';

export interface RequestWithUser extends Request {
  user?: any; // You can replace 'any' with a more specific type if you have a User type.
}