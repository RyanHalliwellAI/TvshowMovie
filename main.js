fetch("https://imdb8.p.rapidapi.com/auto-complete?q=game", {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '289ddbefabmsha3d3894436ad14ep1e9913jsnf611f2267b21',
		'x-rapidapi-host': 'imdb8.p.rapidapi.com'
	}

})
.then(response => response.json())
.then(data => console.log(data))
.catch(err => {
    console.error(err);
});



