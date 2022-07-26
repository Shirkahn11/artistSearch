const axios = require('axios');
const createError = require('http-errors')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const Artist = require('../model/artist');


module.exports = {
    searchArtist: function(artist, artistSearchResults, reqStartPage, fileName, limit) {

        const csvWriter = createCsvWriter({
            path: fileName +'.csv',
            header: [
              {id: 'name', title: 'Name'},
              {id: 'mbid', title: 'Mbid'},
              {id: 'url', title: 'URL'},
              {id: 'image_small', title: 'Small Image'},
              {id: 'image', title: 'Image'},
            ]
          });

        return axios
        .get('http://ws.audioscrobbler.com/2.0?method=artist.search&artist=' + artist + '&api_key=506c8597bfa2e8de009ec1411caa8f38&format=json&page=' + reqStartPage + '&limit=' + limit) 
        // use a higher limit to reduce the number of get calls to the API
        .then(res => {
          if(artistSearchResults == null) {
              artistSearchResults = res.data.results.artistmatches.artist;
          } else {
              artistSearchResults = artistSearchResults.concat(res.data.results.artistmatches.artist)
          }
          const itemsPerPage = res.data.results['opensearch:itemsPerPage'];
          const totalResults = res.data.results['opensearch:totalResults'];

          var artists = new Array();

          if(totalResults === 0) {
            let rawdata = JSON.parse(fs.readFileSync('./public/dictionaries/artists.json'));
            for (let index = 0; index < 10; index++) {
              let randomNumber = Math.floor(Math.random() * rawdata.length) + 1;
              artists.push(rawdata[randomNumber]);
            }
          }

          if(reqStartPage * itemsPerPage < totalResults && reqStartPage < 10) { //Only get the first 10 result pages. Otherwise the runtime is too long and Last.fm could start blocking calls.
            return this.searchArtist(artist, artistSearchResults, reqStartPage + 1, fileName, limit);
          } else {
            
            artistSearchResults.forEach(artist => {
                artistObj = new Artist(artist.name, artist.mbid, artist.url, JSON.stringify(artist.image[0]), JSON.stringify(artist.image));
                artists.push(artistObj);
            });
            return csvWriter
            .writeRecords(artists)
            .then(()=> {
                console.log('The CSV file %s was written successfully', fileName);
                return JSON.stringify(artists, null, 2);
            });            
          }
        })
        .catch(error => {
          // If no results are returned from the server: Send back random artists
          if(error.code == 'ENOTFOUND') {
            throw createError(404, 'Server was not found. Check your internet connection');
          }
        });
    }
}