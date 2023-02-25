// Wait for the DOM to be fully loaded before accessing elements
// When the button is clicked for submit, it will get values, and put the into the url and send them to the API
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        // input values
        const searchTerm = document.getElementById('tvShowMovie').value;
        const isTVShow = document.getElementById('tv-show-checkbox').checked;
        const isMovie = document.getElementById('movie-checkbox').checked;

        // Construct URL based on inputs
        const type = isTVShow ? 'tv' : 'movie';
        const url = `https://api.themoviedb.org/3/search/${type}?query=${searchTerm}&sort_by=popularity.desc`

        fetchData(url,type);
    });



// // Fetchs the data using the api and input
// async function fetchData(url) {
//     const options = {
//         method: 'GET',
//         headers: {
//             'x-rapidapi-key': '289ddbefabmsha3d3894436ad14ep1e9913jsnf611f2267b21',
//             'x-rapidapi-host': 'imdb8.p.rapidapi.com'
//         }
//     };
//     try {
// 		const response = await fetch(url, options);
// 		const result = await response.json();
//         console.log(result);
//         //console.log(testResult);
//         const testResult = result.data.mainSearch.edges;
//         document.querySelector('.TV').innerHTML = '';
//         for (let i = 0; i <= testResult.length; i++) {
//             const name = testResult[i].node.entity.originalTitleText.text;
//             const rating = testResult[i].node.entity.id;
//             const url2 = 'https://imdb8.p.rapidapi.com/title/v2/get-ratings?tconst=' + rating + '&country=US&language=en-US';
//             const response2 = await fetch(url2, options);
//             const result2 = await response2.json();
//             const ratingForEpisode = result2.data.title.ratingsSummary.aggregateRating;



//             const poster = testResult[i].node.entity.primaryImage.url;
//             const movie = `<li><img src="${poster}"> <h2>${name}</h2> <h2>${ratingForEpisode}</h2><button id = btn${i}">Select</button</li>`
//             document.querySelector('.TV').innerHTML += movie;
//         }


// 	} catch (error) {
// 		console.error(error);
// 	}
// }
// });
let titles = [];
let input = document.getElementById('tvShowMovie').value;

searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    console.log(titles);
    for(let i of titles)
    {
        console.log(i);
    }
})



const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjc2OWU1ZTI1NDc5YzQ1ZTk4ZTMyOGIyNmUxNWY0YyIsIm5iZiI6MTcyMDE4MzI0MS43NDc1NTgsInN1YiI6IjY2ODdlODMzZWM4YTI2ZGMyMGRlZjY2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1tuB-Ny6dPdf0UacaY1KqfqSgxIHVi_JOFni5nIIFxw'
    }
  };

  //Gets all the relevant titles and names and then adds them to html
  function fetchData(url, type)
  {
    console.log(type);
    fetch(url, options)
    .then(response => response.json())
    .then(response => 
        {
            const testResult = response.results;
            console.log(testResult);
        document.querySelector('.TV').innerHTML = '';
        for (let i = 0; i <= testResult.length; i++) {
            let name, rating, releaseDate, overview, poster, movie;

            if(type == "tv")
            {
            name = testResult[i].name;
            titles.push(name);
            rating = testResult[i].vote_average;
            releaseDate = testResult[i].first_air_date;
            overview = testResult[i].overview;
            poster = testResult[i].poster_path;
            }
            else if(type == "movie")
            {
            name = testResult[i].original_title;
            rating = testResult[i].vote_average;
            releaseDate = testResult[i].release_date;
            overview = testResult[i].overview;
            poster = testResult[i].poster_path;
            }

            movie = `
            <li>
                <a href="#" data-name="${name}" data-poster="${poster}" data-rating="${rating}" data-release-date="${releaseDate}" data-overview="${overview}" onclick="saveAndRedirect(this)">
                    <img src="https://image.tmdb.org/t/p/w500${poster}" alt="${name}">
                    <h2>${name}</h2>
                </a>
            </li>
        `;
        
        document.querySelector('.TV').innerHTML += movie;
        }
        })

    .catch(err => console.error(err));
  }

    // const result = response.results;
    // console.log(result);
});

//creating function to save the selected tv show or moive and redirect to saved tv show page.
function saveAndRedirect(element)
{
    const name = element.getAttribute('data-name');
    const poster = element.getAttribute('data-poster');
    const rating = element.getAttribute('data-rating');
    const releaseDate = element.getAttribute('data-release-date');
    const overview = element.getAttribute('data-overview');


    const savedItem = {
        name,
        poster,
        rating,
        releaseDate,
        overview
    };
    //creates an array with current storage, if not then its an empty array, adds to array, sets local storage, then goes to other page.
    let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    savedItems.push(savedItem);
    localStorage.setItem('savedItems', JSON.stringify(savedItems));
    window.location.href = 'saved.html';

}



