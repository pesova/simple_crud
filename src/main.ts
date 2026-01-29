import logger from 'jet-logger';

import server from './server';
import { getEnvVar } from 'config/env';

/******************************************************************************
                                Constants
******************************************************************************/

const SERVER_START_MESSAGE =
  'Express server started on port: ' + getEnvVar("PORT").toString();

/******************************************************************************
                                  Run
******************************************************************************/

// Start the server
server.listen(getEnvVar("PORT"), (err) => {
  if (!!err) {
    logger.err(err.message);
  } else {
    logger.info(SERVER_START_MESSAGE);
  }
});
