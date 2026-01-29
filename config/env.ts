// config/env.ts - SIMPLIFIED
console.log('🔧 Loading environment configuration...');

// NO DOTENV - Railway provides env vars directly

const REQUIRED_ENV_VARS = ['PORT', 'MONGODB_URI', 'JWT_SECRET', 'JWT_EXPIRE', 'NODE_ENV'] as const;

// Check required variables
for (const envVar of REQUIRED_ENV_VARS) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing environment variable: ${envVar}`);
    console.error('💡 Please set it in Railway Variables dashboard');
    process.exit(1);
  }
}

// Export environment variables
export const PORT = parseInt(process.env.PORT || '3000', 10);
export const MONGODB_URI = process.env.MONGODB_URI as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const IS_PRODUCTION = NODE_ENV === 'production';
export const IS_DEVELOPMENT = NODE_ENV === 'development';


console.log(`✅ Environment loaded: ${NODE_ENV}`);
console.log(`✅ MongoDB URI: ${MONGODB_URI ? 'Set' : 'Not set'}`);
export const getEnvVar = (key: string): string | number | boolean => {
//   const value = ENV[key];
//   if (value === undefined) {
//     throw new Error(`Environment variable ${key} is not defined`);
//   }
  return key;
};