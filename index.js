const express = require('express');
const app = express();

const checkWorkingHours = (req, res, next) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay(); // Sunday: 0, Monday: 1, ...
  const currentHour = currentDate.getHours();

  if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.status(403).send('Sorry, the web application is only available during working hours.');
  }
};

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home', { Home});
});

app.get('/services', (req, res) => {
  res.render('services', { pageTitle: 'Our Services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { pageTitle: 'Contact Us' });
});

// Attach the middleware to all routes
app.use(checkWorkingHours);

app.listen(3000);