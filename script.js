let dictionary = {};
let watchedList = JSON.parse(localStorage.getItem('watchedList')) || [];
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// Load CSV data and store it in local storage
async function loadData() {
    const filePath = './merged.csv'; 
    try {
        const response = await fetch(filePath);
        const data = await response.text();
        processData(data);
        localStorage.setItem('dictionary', JSON.stringify(dictionary)); // Store dictionary in local storage
    } catch (error) {
        console.error('Error fetching the file:', error);
    }
}

function processData(data) {
    Papa.parse(data, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            results.data.forEach(row => {
                const key = row.tconst;
                dictionary[key] = [
                    row.tconst, row.title, row.startYear, row.endYear, row.runtime, 
                    row.genres, row.avgRating, row.numVotes, row.Language // Ensure the correct field name is used
                ];
            });
        }
    });
}

function findKeyValuePairsWithGame(dict, search, searchTermGenres) {
    let result = {};
    for (let key in dict) {
        if (Array.isArray(dict[key])) {
            const titleMatches = dict[key][1] && dict[key][1].toLowerCase().includes(search);
            const genresMatch = searchTermGenres.every(genre => dict[key][5] && dict[key][5].toLowerCase().includes(genre));
            if (titleMatches && genresMatch) {
                result[key] = dict[key];
            }
        }
    }
    return result;
}

async function search() {
    const searchTerm = document.getElementById('tvShowMovie').value.trim().toLowerCase();
    const searchTermGenres = document.getElementById('typeOfShow').value.trim().toLowerCase().split(/\s+/);
    const result = findKeyValuePairsWithGame(dictionary, searchTerm, searchTermGenres);
    displayResult(result);
}

function displayResult(result) {
    const tvDiv = document.querySelector('.TV');
    tvDiv.innerHTML = Object.keys(result).length ?
        `<table>
            <thead>
                <tr>
                    <th>tconst</th><th>title</th><th>startYear</th><th>endYear</th><th>runtime</th><th>genres</th><th>avgRating</th><th>numVotes</th><th>Language</th><th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${Object.keys(result).map(key => 
                    `<tr>
                        <td>${key}</td>
                        ${result[key].map(value => `<td>${value}</td>`).join('')}
                        <td><button onclick="addToWatchedList('${key}')">Add to Watched</button></td>
                        <td><button onclick="addToWatchlist('${key}')">Add to Watchlist</button></td>
                    </tr>`).join('')}
            </tbody>
        </table>` : '<p>No results found.</p>';
}

function addToWatchedList(key) {
    if (!watchedList.includes(key)) {
        watchedList.push(key);
        localStorage.setItem('watchedList', JSON.stringify(watchedList)); // Save to local storage
        updateWatchedListDisplay();
    }
}

function addToWatchlist(key) {
    if (!watchlist.includes(key)) {
        watchlist.push(key);
        localStorage.setItem('watchlist', JSON.stringify(watchlist)); // Save to local storage
        updateWatchlistDisplay();
    }
}

function deleteFromWatchedList(key) {
    watchedList = watchedList.filter(item => item !== key);
    localStorage.setItem('watchedList', JSON.stringify(watchedList)); // Update local storage
    updateWatchedListDisplay();
}

function updateWatchedListDisplay() {
    const watchedListDiv = document.getElementById('watchedList');
    if (watchedListDiv) { // Check if the element exists
        watchedListDiv.innerHTML = watchedList.map(key => {
            const title = dictionary[key] ? dictionary[key][1] : "Unknown";
            return `<li>${title} <button onclick="deleteFromWatchedList('${key}')">Delete</button></li>`;
        }).join('');
    }
}

function updateWatchlistDisplay() {
    const watchlistDiv = document.getElementById('watchlist');
    if (watchlistDiv) { // Check if the element exists
        watchlistDiv.innerHTML = watchlist.map(key => {
            const title = dictionary[key] ? dictionary[key][1] : "Unknown";
            return `<li>${title} <button onclick="removeFromWatchlist('${key}')">Remove</button></li>`;
        }).join('');
    }
}

function removeFromWatchlist(key) {
    watchlist = watchlist.filter(item => item !== key);
    localStorage.setItem('watchlist', JSON.stringify(watchlist)); // Update local storage
    updateWatchlistDisplay();
}

// Check for dictionary in local storage and load if not present
function initializeData() {
    const storedDictionary = JSON.parse(localStorage.getItem('dictionary'));
    if (storedDictionary) {
        dictionary = storedDictionary;
        updateWatchedListDisplay(); // Update display if the dictionary is already loaded
        updateWatchlistDisplay(); // Update watchlist display
    } else {
        loadData(); // Load the data if not already in local storage
    }
}

// Call initializeData on page load
initializeData();
