import server from './server';
import { getEnvVar } from 'config/env';
console.log(' Starting server...');

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
    console.error({err});
    console.error(err.message);
  } else {
    console.info(SERVER_START_MESSAGE);
  }
});
