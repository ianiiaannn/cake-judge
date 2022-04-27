export const COOKIE_AGE = 1000 * 60 * 60 * 24;
export const SALT_WORK_FACTORY = 10;
export const JWT_SECRET = 'secretttttttttttttttttttttttttTt';
export const JWT_EXPIRE = '1d';
export const uri: string = 'mongodb://mongo:27017/cake-judge';

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import http from 'http';
import { createClient } from 'redis';

import { dbInit } from './dbconn';
import { notFound } from './routes/404';
import { cppRoute } from './routes/cpp-route';
import { login } from './routes/login';
import { problems } from './routes/problems';
import { register } from './routes/register';
import { showProblem } from './routes/show-problem';
import { submitAns } from './routes/submit-ans';
import { userInfo } from './routes/user-info';

dotenv.config();
const app = express();
http.createServer(app);
app.use(express.static('angular/dist'));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/cppTestSubmit', cppRoute);
app.get('/api/problems', problems);
app.post('/api/problems/ans', submitAns);
app.get('/api/showProblem', showProblem);
app.post('/api/register', register);
app.post('/api/login', login);
app.get('/api/test/getUserInfo', userInfo);
app.use('*', notFound); // If accpet html, send index.html or send json 404


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
