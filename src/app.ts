/* eslint-disable max-len */
const PORT = 80;
const COOKIE_AGE = 1000*60*60;

import express from 'express';
import session from 'express-session';
import http from 'http';
import mariadb from 'mariadb';
import workerThreads from 'worker_threads';

const pool=mariadb.createPool({
  host: 'mariadb',
  user: 'root',
  password: 'my-secret-pw',
  connectionLimit: 5,
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
// const __dirname=path.resolve();

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

app.get('/', (req: any, res: any)=>{
  if (res.session!==0) req.session.a++;
  else req.session.a=0;
  res.render('index', {a: req.session.a});
});

app.post('/submitRegister', (req: any, res: any)=>{

});

app.post('/submitLogin', (req: any, res: any)=>{

});

app.post('/dbTestSubmit', (req: any, res: any)=>{
  let conn: { query: (arg0: any) => string | PromiseLike<string>; end: () => void; };
  let message:string;
  // eslint-disable-next-line require-jsdoc
  async function dbLookup() {
    try {
      conn = await pool.getConnection();
      message = await conn.query(req.body.DB);
    } catch (err) {
      console.log(err);
      message =<string> err;
    } finally {
      if (conn) conn.end();
      res.render('index', {a: JSON.stringify(message)});
    }
  };
  dbLookup();
});

app.post('/cppTestSubmit', (req: { body: { cpp: any; }; }, res: { render: (arg0: string, arg1: { a: string; }) => void; })=>{
  const codeRunner = new workerThreads.Worker(__dirname+'/worker.js');
  codeRunner.postMessage({
    code: req.body.cpp,
    type: 'cpp',
    testData: [{
      input: 'world\nnode',
      output: ['hello, world', 'hello, node'],
      memLimit: '10000',
      timeout: '10',
    }, {
      // eslint-disable-next-line max-len
      input: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      // eslint-disable-next-line max-len
      output: ['hello, aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'],
      memLimit: '10000',
      timeout: '10',
    }],
  });
  codeRunner.on('message', (result:string)=>{
    res.render('index', {a: JSON.stringify(result)});
  });
});

dbTest();
app.listen(PORT, ()=>{
  console.log('server stated on port '+PORT+'.');
});
