import server from './server';
console.log(' Starting server...');

/******************************************************************************
                                Constants
******************************************************************************/
const port = process.env.PORT ?? 3000;
const SERVER_START_MESSAGE =
  'Express server started on port: ' + port;

/******************************************************************************
                                  Run
******************************************************************************/

// Start the server
server.listen(port, (err) => {
  if (!!err) {
    console.error({err});
    console.error(err.message);
  } else {
    console.info(SERVER_START_MESSAGE);
  }
});
