/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 5/21/17.
 *
 * No license is granted for this project.
 */
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || '3010';

app.use(express.static(path.join(__dirname, 'public/dist/')));

app.get('/', (res, req) => {
  res.sendFile(path.join(__dirname + '/public/dist/index.html'));
});

app.use( (req, res, next) => {
  res.status(404);
  
  // respond with html page
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname + '/public/dist/404.html'));
    return;
  }
  
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  
  // default to plain-text. send()
  res.type('txt').send('Not found');
});



app.listen(port, function () {
  console.log(`Portfolio-ing soo hard on port ${port}`);
});