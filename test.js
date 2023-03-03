const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.imdb.com/title/tt0386676/';

axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    // Example: Extracting the title of the show
    const title = $('h1').text().trim();
    console.log('Title:', title);

    // Extract other desired information similarly
  })
  .catch(error => {
    console.error('Error fetching data from IMDb:', error);
  });