'use strict';
/***********************************
*           DEPENDENCIES           *
************************************/
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');

/***********************************
 *           SERVER SETUP           *
 ************************************/
const app = express();
const PORT = process.env.PORT || 3000;

/***********************************
*          DATABASE SETUP          *
************************************/
// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();
// client.on('error', err => console.error(err));


/***********************************
*           MIDDLEWARE             *
************************************/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


/***********************************
*          API ENDPOINTS           *
************************************/

app.get('/', (req, res) => {
  res.send('Hello World');
});


// ALL OTHER ENDPOINTS MUST GO BELOW HERE!
app.get('*', (req, res) => {
  // route to error-view
  // page(() => page('/error-vew')); or something

  res.status(404).send('Error: File requested could not be found');
});

/***********************************
*              LISTEN              *
************************************/
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
