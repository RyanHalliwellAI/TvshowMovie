const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.imdb.com/title/tt1190634/';

const fetchData = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching the page:', error);
    throw error;
  }
};

const parseData = (html) => {
  const $ = cheerio.load(html);

  const title = $('h1').text().trim();
  const rating = $('span[class^="ipc-metadata-list-item__list-content-item ipc-metadata-list-item__list-content-item--link"]').text().trim();
  const summary = $('span[data-testid="plot-xs_to_m"]').text().trim();
  const releaseDate = $('li[data-testid="title-details-releasedate"] a').text().trim();
  const genre = $('div[data-testid="genres"] a').map((i, el) => $(el).text().trim()).get().join(', ');
  const language = $('li[data-testid="title-details-languages"] a').text().trim();
  const poster = $('div.ipc-media img').attr('src');

  return { title, rating, summary, releaseDate, genre, language, poster };
};

const generateHTML = ({ title, rating, summary, releaseDate, genre, language, poster }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title} - IMDb Data</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { font-size: 2em; margin-bottom: 0.5em; }
        p { margin: 0.2em 0; }
        strong { font-weight: bold; }
        img { max-width: 100%; height: auto; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <img src="${poster}" alt="${title} Poster">
      <p><strong>Radting:</strong> ${rating}</p>
      <p><strong>Summary:</strong> ${summary}</p>
      <p><strong>Release Date:</strong> ${releaseDate}</p>
      <p><strong>Genre:</strong> ${genre}</p>
      <p><strong>Language:</strong> ${language}</p>
    </body>
    </html>
  `;
};

const saveToFile = (content, filename) => {
  fs.writeFileSync(filename, content, 'utf-8');
  console.log(`HTML file generated: ${filename}`);
};

const scrapeIMDBPage = async (url) => {
  try {
    const html = await fetchData(url);
    const data = parseData(html);
    const htmlContent = generateHTML(data);
    saveToFile(htmlContent, 'index5.html');
  } catch (error) {
    console.error('Error during the scraping process:', error);
  }
};

scrapeIMDBPage(url);
