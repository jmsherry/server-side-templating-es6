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

app.get('/about', async function(req, res) {
  try {
    await res.render('about', {
      locals: {
        title: 'About!',
        loggedIn: true,
      },
      partials: {
        header: 'header',
        footer: 'footer',
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});