const axios = require('axios');

module.exports = {
    searchArtist: function(artist) {
        axios
        .get('http://ws.audioscrobbler.com/2.0?method=artist.search&artist=' + artist + '&api_key=506c8597bfa2e8de009ec1411caa8f38&format=json')
        .then(res => {
          console.log(`statusCode: ${res.status}`);
          console.log('RES:', res);
          return res.data.results.artistmatches.artist;
          /* TODO Fix pagination - Results are returned paginated by the endpoint. 
            But known query parameters to navigate through the results like 
            size, offset and also opensearch parameters like size and from do not seem have any effect on the results. 
            Therefore, only up to 30 results per request are returned for now.
          */
        })
        .catch(error => {
          console.error(error);
        });
    }
}
