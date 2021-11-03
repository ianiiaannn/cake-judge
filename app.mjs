const PORT = 80;
const COOKIE_AGE = 1000*60*60;

import express from 'express';
import session from 'express-session';
import http from 'http';
import mariadb from 'mariadb';
import workerThreads from 'worker_threads';
import path from 'path';

const pool=mariadb.createPool({
  host: '172.18.0.2',
  user: 'root',
  password: 'serect',
  connectionLimit: '5',
});
pool.getConnection();

const app=express();
http.createServer(app);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: '<Serect here change this>',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: COOKIE_AGE},
}));
const __dirname=path.resolve();

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
  if (res.session!==0) req.session.a++;
  else req.session.a=0;
  res.render('index', {a: req.session.a});
});

app.post('/submitRegister', (req, res)=>{

});

app.post('/submitLogin', (req, res)=>{

});

app.post('/dbTestSubmit', (req, res)=>{
  let conn;
  let message;
  // eslint-disable-next-line require-jsdoc
  async function dbLookup() {
    try {
      conn = await pool.getConnection();
      message = await conn.query(req.body.DB);
    } catch (err) {
      console.log(err);
      message = err;
    } finally {
      if (conn) conn.end();
      res.render('index', {a: JSON.stringify(message)});
    }
  };
  dbLookup();
});

app.post('/cppTestSubmit', (req, res)=>{
  const codeRunner = new workerThreads.Worker(__dirname+'/worker.mjs');
  codeRunner.postMessage({
    code: req.body.cpp,
    type: 'cpp',
    testData: [{
      input: 'world\nnode',
      output: ['hello, world', 'hello, node'],
      memLimit: '10000',
      timeout: '10000',
    }],
  });
  codeRunner.on('message', (result)=>{
    res.render('index', {a: JSON.stringify(result)});
  });
});

dbTest();
app.listen(PORT, ()=>{
  console.log('server stated on port '+PORT+'.');
});
