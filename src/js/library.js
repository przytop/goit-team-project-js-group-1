const movieList = document.querySelector('.my-library-movie-list');
const sorry = document.querySelector('.my-library-sorry');
const loadMoreButton = document.querySelector(
  '.my-library-main-section .my-library-button'
);
const mainSection = document.querySelector('.my-library-main-section');
const genreSelect = document.querySelector('#genre');

// Variables to track state
let currentDisplayCount = 0;
const batchSize = 9;

// Function to create a movie list item
function createMovieListItem(movie) {
  const listItem = document.createElement('li');
  listItem.classList.add('my-library-movie-list-item');

  const genreString = movie.genre_ids.join(', ');

  listItem.innerHTML = `
      <a href="#">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="my-library-movie-picture" />
        <div class="my-library-gradient"></div>
        <div class="my-library-movie">
          <span class="my-library-movie-title">${movie.title}</span>
          <span class="my-library-movie-genres">${genreString} | ${movie.release_date}</span>
        </div>
      </a>
    `;

  return listItem;
}

// Function to render the movie list
function renderMovieList(genre = '', reset = true) {
  const movies = JSON.parse(localStorage.getItem('myLibrary')) || [];

  const filteredMovies = genre
    ? movies.filter(movie =>
        movie.genre.toLowerCase().includes(genre.toLowerCase())
      )
    : movies;

  if (reset) {
    currentDisplayCount = 0;
    movieList.innerHTML = ''; // Clear current list
  }

  if (filteredMovies.length > 0) {
    mainSection.style.display = 'block';
    sorry.style.display = 'none';

    const moviesToDisplay = filteredMovies.slice(
      currentDisplayCount,
      currentDisplayCount + batchSize
    );
    moviesToDisplay.forEach(movie => {
      const listItem = createMovieListItem(movie);
      movieList.appendChild(listItem);
    });

    currentDisplayCount += batchSize;

    if (currentDisplayCount >= filteredMovies.length) {
      loadMoreButton.style.display = 'none';
    } else {
      loadMoreButton.style.display = 'block';
    }
  } else {
    sorry.style.display = 'block';
    mainSection.style.display = 'none';
    loadMoreButton.style.display = 'none';
  }
}

// Load more button
loadMoreButton.addEventListener('click', function () {
  renderMovieList(genreSelect.value, false);
});

// Event listener for genre selection
genreSelect.addEventListener('change', function () {
  const selectedGenre = genreSelect.value;
  renderMovieList(selectedGenre);
});

renderMovieList();
