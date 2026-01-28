import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  verifyPassword(userPassword: string): Promise<boolean>;
}

export interface IItem extends Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export interface JwtPayload {
  id: string;
  email: string;
}