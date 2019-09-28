const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const apiKey ="87a1ca5b";

app.get('/api/search', (req, res) => {
  const movie = req.query.movie
  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${movie}`)
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(() => {
      console.log("Search api failed", err);
      res.redirect('/error');
    })
});

app.listen(port, () => console.log(`Listening on port ${port}`));