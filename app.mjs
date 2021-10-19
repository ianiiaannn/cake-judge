const PORT = 8080;

import express from 'express';
import http from 'http';


const app=express();
http.createServer(app);
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res)=>{
  res.render('index');
});


app.listen(PORT, ()=>{
  console.log('server stated on port '+PORT+'.');
});
