export const COOKIE_AGE = 1000 * 60 * 60 * 24;
export const SALT_WORK_FACTORY = 10;
export const JWT_SECRET = 'secretttttttttttttttttttttttttTt';
export const JWT_EXPIRE = '1d';
export const uri: string = 'mongodb://mongo:27017/cake-judge';

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import http from 'http';
import { createClient } from 'redis';

import { dbInit } from './db-connection';
import { frontEndOr404 } from './routes/404';
import { login } from './routes/login';
import { problemList } from './routes/problem-list';
import { showProblem } from './routes/problem-page';
import { register } from './routes/register';
import { submitAns } from './routes/submit-ans';
import { userInfo } from './routes/user-info';

dotenv.config();
const app = express();
http.createServer(app);
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 1000,
  })
);
app.use(express.static('angular/dist'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// The following routes require no authentication.
app.get('/api/problems', problemList); // list problems
app.get('/api/showProblem', showProblem); // show problem page
app.post('/api/register', register);
app.post('/api/login', login);
// The following routes require user authentication.
app.post('/api/problems/ans', submitAns); // user submit answer
// The following routes require admin access.
// Test routes.
app.get('/api/test/getUserInfo', userInfo);
// 404 page.
app.use('*', frontEndOr404); // If accept html, send index.html or send json 404

app.listen(process.env.PORT, async () => {
  console.log('Server stated on port ' + process.env.PORT + '.');
  dbInit();
  const client = createClient({ url: 'redis://redis:6379' }); // Check redis server health.
  client.on('error', (error: any) => {
    console.log('Unable to connect to redis');
    console.error(error);
    process.exit(1);
  });
  await client.connect();
  console.log('Connected to redis.');
  client.quit();
});
