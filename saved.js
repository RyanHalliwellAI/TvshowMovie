//load items from saved local storage
//gets it from local storages, creates a container, then goes through all saved intems in loop to add to page.
document.addEventListener('DOMContentLoaded', function() {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const savedItemsContainer = document.querySelector('.saved-items');
    
    savedItems.forEach(item => {
        const movie = `
            <li>
                <img src="https://image.tmdb.org/t/p/w500${item.poster}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p>Rating: ${item.rating}</p>
                <p>Release Date: ${item.releaseDate}</p>
                <p>${item.overview}</p>
            </li>
        `;
        savedItemsContainer.innerHTML += movie;
    });
});
