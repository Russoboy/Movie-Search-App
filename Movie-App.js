const apiKey = "your_api_key_here"; // Replace with your actual API key
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const movieContainer = document.getElementById("movieContainer");

searchButton.addEventListener("click", () => {
    const movieName = searchInput.value.trim();
    if (movieName) {
        fetchMovie(movieName);
    } else {
        alert("Please enter a movie name!");
    }
});

async function fetchMovie(movie) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovie(data);
        } else {
            movieContainer.innerHTML = `<p>Movie not found! Try another title.</p>`;
        }
    } catch (error) {
        console.error("Error fetching movie:", error);
        movieContainer.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    }
}

function displayMovie(movie) {
    movieContainer.innerHTML = `
        <div class="movie">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h2>${movie.Title} (${movie.Year})</h2>
            <p>${movie.Plot}</p>
        </div>
    `;
}
