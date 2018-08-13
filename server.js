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
const app = espress();
const PORT = process.env.PORT;

/***********************************
*          DATABASE SETUP          *
************************************/
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));


/***********************************
*           MIDDLEWARE             *
************************************/
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


/***********************************
*          API ENDPOINTS           *
************************************/



/***********************************
*              LISTEN              *
************************************/
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));