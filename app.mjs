const PORT = 8080;

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
  host: '127.0.0.1',
});

app.get('/', (req, res)=>{
  res.render('index');
});


app.listen(PORT, ()=>{
  console.log('server stated on port '+PORT+'.');
});
