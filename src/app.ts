const COOKIE_AGE = 1000 * 60 * 60;
export const uri: string = 'mongodb://mongo:27017/cake-judge';

import express from 'express';
import session from 'express-session';
import http from 'http';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createClient } from 'redis';
import { cppRoute } from './routes/cpp-route';
import { notFound } from './routes/404';
import { dbInit } from './dbconn';
import { problems } from './routes/problems';
// import { UserModel } from './schemas/user-schemas';

dotenv.config();
const app = express();
http.createServer(app);
app.use(express.static('angular/dist'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: '<Serect here change this>',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: COOKIE_AGE },
}));

app.use('/cppTestSubmit', cppRoute);
app.use('/api/problems', problems);
app.use('*', notFound);

app.listen(process.env.PORT, async () => {
  console.log('Server stated on port ' + process.env.PORT + '.');
  dbInit();
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
