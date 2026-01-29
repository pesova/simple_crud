import dotenv from 'dotenv';

dotenv.config();

const REQUIRED_ENV_VARS = [
  'PORT',
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_EXPIRE',
  'NODE_ENV'
] as const;
export const ENV: Record<string, string | number | boolean | undefined> = {
  PORT: undefined,
  NODE_ENV: undefined,
  
  MONGODB_URI: undefined,
  
  JWT_SECRET: undefined,
  JWT_EXPIRE: undefined,
  
  IS_PRODUCTION: undefined,
  IS_DEVELOPMENT: undefined,
  IS_TEST: undefined,
};

export const validateEnv = (): void => {
  const missingVars: string[] = [];
  
  for (const envVar of REQUIRED_ENV_VARS) {
    const value = process.env[envVar];
    if (!value || value.trim() === '') {
      missingVars.push(envVar);
    }
  }
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
  
  for (const envVar of REQUIRED_ENV_VARS) {
    const value = process.env[envVar];
    if (value) {
      if (envVar === 'PORT') {
        ENV[envVar] = parseInt(value, 10);
      } else {
        ENV[envVar] = value;
      }
    }
  }
  
  const nodeEnv = ENV.NODE_ENV as string;
  ENV.IS_PRODUCTION = nodeEnv === 'production';
  ENV.IS_DEVELOPMENT = nodeEnv === 'development';
  ENV.IS_TEST = nodeEnv === 'test';
};

export const getEnvVar = (key: string): string | number | boolean => {
  const value = ENV[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const PORT = ENV.PORT as number | undefined;
export const MONGODB_URI = ENV.MONGODB_URI as string | undefined;
export const JWT_SECRET = ENV.JWT_SECRET as string | undefined;
export const JWT_EXPIRE = ENV.JWT_EXPIRE as string | undefined;
export const NODE_ENV = ENV.NODE_ENV as string | undefined;
export const IS_PRODUCTION = ENV.IS_PRODUCTION as boolean | undefined;
export const IS_DEVELOPMENT = ENV.IS_DEVELOPMENT as boolean | undefined;
export const IS_TEST = ENV.IS_TEST as boolean | undefined;

try {
  validateEnv();
} catch (error: any) {
  process.exit(1);
}