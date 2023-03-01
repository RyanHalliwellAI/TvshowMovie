//this is a event istener for when the page is loaded. It will load and then add the saved storaage data to the webpage
document.addEventListener('DOMContentLoaded', function() {
    const savedItems = JSON.parse(localStorage.getItem('savedItemsWatchlist')) || [];
    const savedItemsContainer = document.querySelector('.saved-itemsW');
    
    savedItems.forEach(item => {
        const movie = `
        <li data-name="${item.name}">
            <a href="#" data-name="${item.name}" data-poster="${item.poster}" data-rating="${item.rating}" data-release-date="${item.releaseDate}" data-overview="${item.overview}" onclick="saveAndRedirect(this)">
                <img src="https://image.tmdb.org/t/p/w500${item.poster}" alt="${item.name}">
                <h2>${item.name}</h2>
            </a>
            <button class="remove-button">Remove</button>
        </li>
        `;
        savedItemsContainer.innerHTML += movie;
    });

    //takes all the remove buttons for the movies, and then if one of them are pressed
    //it will obtained which one was pressed, the item, and the name.
    //it will ask the user if they want to remove it, then will filter out the saved items based on the movie name
    //it will update the storage, and update the page.
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', function(event) {
            const movieItem = event.target.closest('li');
            const movieName = movieItem.getAttribute('data-name');
            if (localStorage.getItem('savedItemsWatchlist') !== null) {
                localStorage.removeItem('savedItemsWatchlist');
                console.log('savedItemsWatchlist has been cleared');
            }
            // Optionally, you can refresh the page or update the UI to reflect the change
            location.reload();
            if (confirm('Are you sure you want to remove this show?')) {
                // Remove from local 
                console.log(movieItem);

                const updatedItems = savedItems.filter(item => item.name !== movieName);
                console.log(updatedItems);
                localStorage.setItem('savedItemsWatchlist', JSON.stringify(updatedItems));
                console.log(updatedItems);

                
                // Remove from the page
                movieItem.remove();
            }
        });
    });
});
