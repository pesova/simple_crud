import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

import { getEnvVar } from '../../config/env';

export class UserService {
  private generateToken(id: string, email: string): string {
    return jwt.sign({ id, email }, getEnvVar('JWT_SECRET') as string, {
      expiresIn: getEnvVar('JWT_EXPIRE') as jwt.SignOptions['expiresIn'],
    });
  }

  async createUser(name: string, email: string, password: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.hashPassword(password);
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword 
    });
    const token = this.generateToken(user._id.toString(), user.email);

    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await user.verifyPassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user._id.toString(), user.email);
    const { password: _, ...userWithoutPassword } = user.toObject();

    return { user: userWithoutPassword, token };
  }

  async getUserById(id: string) {
    return await User.findById(id);
  }

  async getCurrentUser(id: string) {
    return await this.getUserById(id);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
}
