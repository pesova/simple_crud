import { IUser } from "./types";

export interface IAuthService {
  register(userData: Partial<IUser>): Promise<{ user: IUser; token: string }>;
  login(email: string, password: string): Promise<{ user: IUser; token: string }>;
  getCurrentUser(userId: string): Promise<IUser | null>;
  validateToken(token: string): Promise<{ id: string; email: string }>;
}
