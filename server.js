/**
 *
 * Created by Aoibhe Wilson <aoibhe@wilsons.io>
 * 5/21/17.
 *
 * No license is granted for this project.
 */
import express from 'express';
import compression from 'compression';
import { join } from 'path';
import sass from 'node-sass';
import nodeSassMiddleware from 'node-sass-middleware';
import moment from 'moment';

import * as url from 'url';
    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();
const port = process.env.PORT || '3010';

const indexData = {
  notification: {
    active: false,
    message: "👷 I'm working on adding my CV as a page on the site. I'm about 30% done right now but will update as I go along."
  }
};

app.locals.moment = moment;

function requireHTTPS(req, res, next) {
  if (!req.secure) {
    console.warn('Not secure. Redirecting...');
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
app.all(requireHTTPS);

app.set('views', __dirname + '/public/views');
app.set('view engine', 'pug');
app.use(compression());
app.use(nodeSassMiddleware({
  src: join(__dirname, 'public/css/sass'),
  dest: join(__dirname, 'public/css'),
  debug: true,
  indentedSyntax: true,
  prefix: '/css'
}));

app.use(express.static(join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('index', indexData);
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