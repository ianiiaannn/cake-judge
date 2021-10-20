const PORT = 80;

import express from 'express';
import http from 'http';
import mariadb from 'mariadb';

const app=express();
http.createServer(app);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const pool=mariadb.createPool({
  host: '172.18.0.2',
  user: 'root',
  password: 'serect',
  connectionLimit: '5',
});
console.log(pool);
pool.getConnection();
// eslint-disable-next-line require-jsdoc
async function dbTest() {
  let conn;
  try {
    conn=await pool.getConnection();
    console.log('db works');
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.end();
  }
}

app.get('/', (req, res)=>{
  dbTest();
  res.render('index');
});

dbTest();
app.listen(PORT, ()=>{
  console.log('server stated on port '+PORT+'.');
});
