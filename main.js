// Wait for the DOM to be fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get input values
        const searchTerm = document.getElementById('tvShowMovie').value;
        const isTVShow = document.getElementById('tv-show-checkbox').checked;
        const isMovie = document.getElementById('movie-checkbox').checked;

        // Construct URL based on inputs
        const type = isTVShow ? 'TV' : 'MOVIE';
        const url = `https://imdb8.p.rapidapi.com/v2/search?searchTerm=${searchTerm}&type=${type}&first=500`;

        // Call a function to fetch data using the constructed URL
        fetchData(url);
    });




async function fetchData(url) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '289ddbefabmsha3d3894436ad14ep1e9913jsnf611f2267b21',
            'x-rapidapi-host': 'imdb8.p.rapidapi.com'
        }
    };
    try {
		const response = await fetch(url, options);
		const result = await response.json();
        console.log("TEST RESULT:" + result);

        const testResult = result.data.mainSearch.edges;
        for (let i = 0; i <= testResult.length; i++) {
            const name = testResult[i].node.entity.originalTitleText.text;
            const poster = testResult[i].node.entity.primaryImage.url;
            const movie = `<li><img src="${poster}"> <h2>${name}</h2></li>`
            document.querySelector('.TV').innerHTML += movie;
        }




		console.log(result);
        console.log(testResult);
	} catch (error) {
		console.error(error);
	}
}
});