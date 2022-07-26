var express = require('express');
var router = express.Router();
var controller = require('../public/javascripts/http-controller');
const bodyParser = require('body-parser');

const middlewares = [
  bodyParser.urlencoded({ extended: true }),
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ArtistSearch' });
});

/* GET download csv file. */
router.get('/download', function(req, res) {
  res.download('./' + req.query.fileName + '.csv');
})

/* POST search query */
router.post('/search_artist', function(req, res) {
  const artist = req.body.artist;
  const fileName = req.body.fileName;
  const limit = req.body.limit;
  controller.searchArtist(artist, null, 1, fileName, 100).then(artistResult => {
    res.render('artist', { artist: artist, results: artistResult, fileName: fileName});
  })
  .catch(error => {  
    res.render('error', { error: error});
  });
});

module.exports = router;
