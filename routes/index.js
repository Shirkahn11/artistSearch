var express = require('express');
var router = express.Router();
var controller = require('../public/javascripts/http-controller');
const axios = require('axios');
const bodyParser = require('body-parser');

const middlewares = [
  bodyParser.urlencoded({ extended: true }),
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ArtistSearch' });
});

router.post('/search_artist', function(req, res) {
  const artist = req.body.artist;
  console.log('Begin artist search for ' + artist);
    axios
    .get('http://ws.audioscrobbler.com/2.0?method=artist.search&artist=' + artist + '&api_key=506c8597bfa2e8de009ec1411caa8f38&format=json&limit=100')
    .then(response => {
      console.log(`statusCode: ${response.status}`);
      artistResult = JSON.stringify(response.data.results.artistmatches.artist);
      res.render('artist', { artist: artist, results: artistResult});
    })
    .catch(error => {
      console.error(error);
    });
  console.log('End artistSearch for', req.body.artist);
});

module.exports = router;
