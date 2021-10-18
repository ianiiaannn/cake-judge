const PORT = 8080;

import express from 'express';
const app=express();
import http from 'http';
http.createServer(app);
app.set('view_engine', 'ejs');


app.get('/', (req, res)=>{
  res.send('hi');
});


app.listen(PORT, ()=>{
  console.log('server stated on port '+PORT+'.');
});
