// fetch('https://imdb8.p.rapidapi.com/auto-complete?q=game&type=TV&first=500', {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': '289ddbefabmsha3d3894436ad14ep1e9913jsnf611f2267b21',
// 		'x-rapidapi-host': 'imdb8.p.rapidapi.com'
// 	}

// })
// .then(response => response.json())
// .then(data => {
//     const contentList = data.d;

//     contentList.map((item) => {
//         const name = item.l;
//         const poster = item.i.imageUrl;
//         const movie = `<li><img src="${poster}"> <h2>${name}</h2></li>`
//         document.querySelector('.TV').innerHTML += movie;
        
//         console.log(item)
//     })

// })
// .catch(err => {
//     console.error(err);
// });

const url = 'https://imdb8.p.rapidapi.com/v2/search?searchTerm=game&type=TV&first=500';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '289ddbefabmsha3d3894436ad14ep1e9913jsnf611f2267b21',
		'x-rapidapi-host': 'imdb8.p.rapidapi.com'
	}
};

async function fetchData() {
	try {
		const response = await fetch(url, options);
		const result = await response.json();
        const testResult = result.data.mainSearch.edges;
        for (let i = 0; i <= testResult.length; i++) {
           console.log(testResult[i].node.entity.originalTitleText.text);
        }
    //     const list =  result.d;
    //     list.map((item) => {
    //         const name = item.l;
    //         const poster = item.i.imageUrl;
    //         const movie = `<li><img src="${poster}"> <h2>${name}</h2></li>`
    //         document.querySelector('.TV').innerHTML += movie;
            
    //         console.log(item)
    // })



		console.log(result);
        console.log(testResult);
	} catch (error) {
		console.error(error);
	}
}

fetchData();

