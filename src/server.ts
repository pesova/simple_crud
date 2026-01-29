import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from '../config/database';
import authRoutes from './routes/authRouter';
import itemRoutes from './routes/itemRouter';
import cors from 'cors';
import { NodeEnvs } from './common/constants/env';
import { getEnvVar } from '../config/env_test';

const app = express();

// **** Middleware **** //

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (getEnvVar("NODE_ENV") === NodeEnvs.DEV) {
  app.use(morgan('dev'));
}

connectDB();

if (getEnvVar("NODE_ENV") === NodeEnvs.PRODUCTION) {
  if (!process.env.DISABLE_HELMET) {
    app.use(helmet({
      contentSecurityPolicy: false,
    }));
  }
}

// routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'ok',
    message: 'CRUD API is running',
    documentation: '/api/auth for authentication, /api/items for CRUD operations'
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});
// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {  
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export default app;
