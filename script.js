document.getElementById('searchButton').addEventListener('click', searchMovie);

// Get the input field
var input = document.getElementById("searchInput");
var movieInfo = document.getElementById('movieInfo');

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("searchButton").click();
  }
});

document.getElementById('searchButton').addEventListener('click', function() {
    searchMovie();
    saveLastSearchedMovie(input.value.trim());
});

function searchMovie() {
    const apiKey = '10d8dccd';
    const searchTerm = input.value.trim();
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                displayMovieInfo(data);
            } else {
                displayErrorMessage(data.Error);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            displayErrorMessage('An error occurred while fetching data.');
        });
}

function displayMovieInfo(movie) {
    movieInfo.innerHTML = `
        <h2><strong>Title:</strong> ${movie.Title}</h2>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Duration:</strong> ${movie.Runtime}</p>
        <p><strong>Actors:</strong> ${movie.Actors}</p>
        <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
        <img src="${movie.Poster}" alt="${movie.Title} Poster" class="movie-poster">
    `;
}

function displayErrorMessage(message) {
    movieInfo.innerHTML = `<p class="error">${message}</p>`;
}

// Function to save the last searched movie to local storage
function saveLastSearchedMovie(movieTitle) {
    localStorage.setItem('lastSearchedMovie', movieTitle);
}

// Function to retrieve the last searched movie from local storage
function getLastSearchedMovie() {
    return localStorage.getItem('lastSearchedMovie') || '';
}

// Display the last searched movie on page load (if available in local storage)
input.value = getLastSearchedMovie();
