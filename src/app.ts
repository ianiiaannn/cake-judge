/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
const PORT = 80;
const COOKIE_AGE = 1000 * 60 * 60;

import express from 'express';
import session from 'express-session';
import http from 'http';
import { createClient } from 'redis';
import { connect } from 'mongoose';
import { cppRoute } from './routes/cpp-route';
import { notFound } from './routes/404';
import { index } from './routes/index';
// import { UserModel } from './schemas/user-schemas';

const uri: string = 'mongodb://mongo:27017/cake-judge';
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


app.use(['/', 'index', 'index.html', 'index.htm'], index);
app.post('/submitRegister', (req: any, res: any) => {
});

app.post('/submitLogin', (req: any, res: any) => {

});

app.get('/page', (req: any, res: any) => {
  res.render('blank_page_test');
});

app.use('/cppTestSubmit', cppRoute);
app.get('/index.html', (req, res) => {
  res.redirect('\\');
});

// 404 page should be placed at the end.
app.use('*', notFound);

app.listen(PORT, async () => {
  console.log('Server stated on port ' + PORT + '.');
  connect(uri).then(() => {
    console.log('Connected to the database.');
  }).catch((err) => {
    console.log('Cannot connect to the database.');
    console.error(err);
    process.exit(1);
  });
  const client = createClient({ url: 'redis://redis:6379' });
  client.on('error', (error: any) => {
    console.log('Unable to connect to redis');
    console.error(error);
    process.exit(1);
  });
  await client.connect();
  console.log('Connected to redis.');
  client.quit();
});
