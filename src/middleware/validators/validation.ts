import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Promise.all(validations.map(validation => validation.run(req)));

      const errors = validationResult(req);
      
      if (errors.isEmpty()) {
        return next();
      }

      const formattedErrors = errors.array().map(error => ({
        field: error.type === 'field' ? error.path : error.type,
        message: error.msg,
        ...(error.type === 'field' && { value: error.value }),
      }));

      res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: formattedErrors,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
};

/**
 * Helper to check if a value is not empty
 */
export const isNotEmpty = (value: any): boolean => {
  return value !== undefined && value !== null && value !== '';
};

/**
 * Helper to check if a value is a valid email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};