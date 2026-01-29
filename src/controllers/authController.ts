import { UserService } from '../services/userService';
import { Request, Response } from 'express';

const userService = new UserService();

export const register = 
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;

      const result = await userService.createUser(name, email, password);

      res.status(201).json({
        success: true,
        data: {
          accessToken: result.token,
          user: {
            id: result.user._id,
            name: result.user.name,
            email: result.user.email,
            createdAt: result.user.createdAt,
          },
        },
      });
    } catch (error: any) {
      if (error.message === 'User already exists') {
        res.status(400).json({
          success: false,
          message: error.message,
        });
        return;
      }
      throw error;
    }
  }

export const login = 
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const result = await userService.login(email, password);

      res.status(200).json({
        success: true,
        data: {
          accessToken: result.token,
          user: {
            id: result.user._id,
            name: result.user.name,
            email: result.user.email,
            createdAt: result.user.createdAt,
          },
        },
      });
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        res.status(401).json({
          success: false,
          message: error.message,
        });
        return;
      }
      throw error;
    }
  }

export const getAuthenticatedUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.id;
    
    if (!userId) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
      return;
    }

    const user = await userService.getCurrentUser(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    throw error
  }
};