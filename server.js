const express = require('express'),
  es6Renderer = require('express-es6-template-engine'),
  app = express(), PORT = process.env.PORT || 3000;
  
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.get('/', function(req, res) {
  res.render('index', {
    locals: {
      title: 'Welcome!',
      loggedIn: true,
      features: [{
        dt: 'Defn1',
        dd: 'description one',
      }, {
        dt: 'Defn2',
        dd: 'description two',
      }],
    },
    partials: {
      header: 'header',
      footer: 'footer',
    },
  }, (err, html) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(html);
    }
  });
});

app.get('/about', function(req, res) {
  res.render('about', {
      locals: {
        title: 'About!',
        // loggedIn: true // <-- missing variable
      },
      partials: {
        header: 'header',
        footer: 'footer',
      },
    }, (err, html) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(html);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});