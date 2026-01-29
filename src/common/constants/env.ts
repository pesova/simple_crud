import jetEnv, { num } from 'jet-env';
import { isValueOf } from 'jet-validators';
import dotenv from 'dotenv';
dotenv.config();
/******************************************************************************
                                 Constants
******************************************************************************/

export const NodeEnvs = {
  DEV: 'development',
  TEST: 'test',
  PRODUCTION: 'production',
} as const;

/******************************************************************************
                                 Setup
******************************************************************************/

const EnvVars = jetEnv({
  NodeEnv: isValueOf(NodeEnvs),
  Port: num,
});

/******************************************************************************
                            Export default
******************************************************************************/

export default EnvVars;
