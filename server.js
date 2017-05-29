/**
 *
 * Created by Jason Wilson <jason@wilsons.io>
 * 5/21/17.
 *
 * No license is granted for this project.
 */
const express = require('express');
const compression = require('compression');
const app = express();
const path = require('path');
const sass = require('node-sass');
const port = process.env.PORT || '3010';

function requireHTTPS(req, res, next) {
  if (!req.secure) {
    console.warn('Not secure. Redirecting...');
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
app.all(requireHTTPS);

app.configure(function(){
  app.set('views', __dirname + '/public/views');
  app.set('view engine', 'pug');
  app.use(compression());
  app.use(sass.middleware({
    src: path.join(__dirname, 'public/css/sass'),
    dest: path.join(__dirname, 'public/css'),
    debug: true
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/', (res, req) => {
  res.render('index', {message: 'It worked'});
});

app.use( (req, res, next) => {
  res.status(404);
  
  // respond with html page
  if (req.accepts('html')) {
    res.render('404');
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