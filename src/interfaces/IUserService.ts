import { IUser } from "./types";

export interface IUserService {
  createUser(userData: Partial<IUser>): Promise<{ user: IUser; token: string }>;
  authenticate(email: string, password: string): Promise<{ user: IUser; token: string }>;
  findUserById(id: string): Promise<IUser | null>;
  findUserByEmail(email: string): Promise<IUser | null>;
  updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null>;
  deleteUser(id: string): Promise<boolean>;
  getAllUsers(): Promise<IUser[]>;
}