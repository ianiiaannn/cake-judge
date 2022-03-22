/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
const PORT = 80;
const COOKIE_AGE = 1000 * 60 * 60;

import express from 'express';
import session from 'express-session';
import http from 'http';
import workerThreads from 'worker_threads';
import { connect } from 'mongoose';
import { UserModel } from './schemas';

const uri:string='mongodb://mongo:27017/cake-judge';
const app = express();
http.createServer(app);
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: '<Serect here change this>',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: COOKIE_AGE },
}));

// eslint-disable-next-line require-jsdoc
/*
async function dbTest() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log('db works');
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.end();
  }
}
*/

app.get('/', (req: any, res: any) => {
  res.render('index');
});

app.post('/submitRegister', (req: any, res: any) => {
});

app.post('/submitLogin', (req: any, res: any) => {

});

app.get('/page', (req: any, res: any) => {
  res.render('blank_page_test');
});
/*
app.post('/dbTestSubmit', (req: any, res: any) => {
  let conn: { query: (arg0: any) => string | PromiseLike<string>; end: () => void; };
  let message: string;
  // eslint-disable-next-line require-jsdoc
  async function dbLookup() {
    try {
      conn = await pool.getConnection();
      message = await conn.query(req.body.DB);
    } catch (err) {
      console.log(err);
      message = <string>err;
    } finally {
      if (conn) conn.end();
      res.render('index_old', { a: JSON.stringify(message) });
    }
  };
  dbLookup();
});
*/
app.post('/cppTestSubmit', (req: any, res: any) => {
  const codeRunner = new workerThreads.Worker(__dirname + '/worker.js');
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
  codeRunner.on('message', (result: string) => {
    res.render('index_old', { a: JSON.stringify(result) });
  });
});


app.get('*', (req, res) => {
  if (req.accepts('html')) {
    res.render('404');
    return;
  }
  res.json({ error: 'Not found' });
});


app.listen(PORT, () => {
  console.log('Server stated on port ' + PORT + '.');
  connect(uri).then(() => {
    console.log('Connected to the database.');
  }).catch((err) => {
    console.log('Cannot connect to the database.');
    console.error(err);
    process.exit(1);
  });
});
