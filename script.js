document.getElementById('searchButton').addEventListener('click', searchMovie);

// Get the input field
var input = document.getElementById("searchInput");

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

async function searchMovie() {
    const apiKey = '10d8dccd';
    const searchTerm = document.getElementById('searchInput').value.trim();
    const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.Response === 'True') {
            displayMovieInfo(data);
        } else {
            displayErrorMessage(data.Error);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        displayErrorMessage('An error occurred while fetching data.');
    }
}

function displayMovieInfo(movie) {
    const movieInfo = document.getElementById('movieInfo');
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
    const movieInfo = document.getElementById('movieInfo');
    movieInfo.innerHTML = `<p class="error">${message}</p>`;
}

$(function(){
    var currentDayEl = $('#currentDay');

    function displayDate(){
        var dateToday = dayjs().format('MMM DD, YYYY');
        currentDayEl.text(dateToday);
    }
    displayDate()
    function determineTimeNow() {
        var time = dayjs().hour()
        var hour = $(this).attr("id").slice(5)
        var hour = $(this).attr("id").slice(5)
        if (hour < currentTime) {
          $(this).addClass("past").removeClass("present future")
        }
        else if (hour == currentTime) {
          $(this).addClass("present").removeClass("past future")
        }
        else {
          $(this).addClass("future").removeClass("present past")
        }
    }
})

