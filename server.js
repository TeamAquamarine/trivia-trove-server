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
*        3rd-Party API ENDPOINTS           *
************************************/

app.get('/api/v1/categories', (req, res) => {

  let url = 'https://opentdb.com/api_category.php'
  superagent
    .get(url)
    .then(results => {
      res.send(results.body.trivia_categories)
    })
    .catch(err => console.error(err));
});

/***********************************
*          DB ENDPOINTS           *
************************************/

app.get('/api/v1/highscores', (req, res) => {
  let SQL = `SELECT * from highscores`;

  client.query(SQL)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

app.get('/api/v1/highscores:category', (req, res) => {
  let SQL = `SELECT * from highscores WHERE category=$1`;
  let values = [req.body.category]

  client.query(SQL)
    .then(results => res.send(results.rows))
    .catch(console.error);
});

/***********************************
*          CATCH-ALL ENDPOINT           *
************************************/
app.get('*', (req, res) => {
  // route to error-view
  // page(() => page('/error-vew')); or something

  res.status(404).send('Error: File requested could not be found');
});
loadDB();
/***********************************
*              LISTEN              *
************************************/
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

/***********************************
*        DB Helper Functions      *
************************************/
function loadDB() {
client.query(`
  CREATE TABLE IF NOT EXISTS
  highscores (
    id SERIAL PRIMARY KEY,
    initials VARCHAR(3),
    category VARCHAR(60),
    score INTEGER
  );`
)
.catch(err => {
  console.error(err)
});
}