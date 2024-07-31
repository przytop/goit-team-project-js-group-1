import TmdbApi from './tmdb-api';

const tmdb = new TmdbApi();
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const LOCAL_STORAGE_KEY = 'myLibrary';

// Test API connection
const test = async () => {
  try {
    console.log(await tmdb.getUpcomingMovies());
  } catch (error) {
    console.error('Test failed:', error);
  }
};

// DOMContentLoaded event
document.addEventListener('DOMContentLoaded', async () => {
  const movieContainer = document.getElementById('movie');

  try {
    const movie = await fetchUpcomingMovie();
    if (movie) {
      movieContainer.innerHTML = createMovieMarkup(movie);
      setupLibraryButton(movie);
    } else {
      movieContainer.innerHTML =
        '<p>No upcoming movies found for this month.</p>';
    }
  } catch (error) {
    movieContainer.innerHTML =
      '<p>Failed to fetch movie data. Please try again later.</p>';
    console.error(error);
  }
});

// Fetch upcoming movie
async function fetchUpcomingMovie() {
  const data = await tmdb.getUpcomingMovies();
  const movies = data.results;
  if (movies.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
}

// Create movie markup
function createMovieMarkup(movie) {
  return `
    <img src="${IMAGE_BASE_URL}${movie.backdrop_path}" alt="${movie.title}">
    <div class="movie-info">
      <h3>${movie.title}</h3>
      <p>Release date: <span>${movie.release_date}</span></p>
      <p>Vote / Votes: <span>${movie.vote_average} / ${
    movie.vote_count
  }</span></p>
      <p>Popularity: <span>${movie.popularity}</span></p>
      <p>Genre: <span>${movie.genre_ids.join(', ')}</span></p>
      <p>${movie.overview}</p>
      <button id="library-button">${
        isInLibrary(movie.id) ? 'Remove from my library' : 'Add to my library'
      }</button>
    </div>
  `;
}

// Set up library button
function setupLibraryButton(movie) {
  const button = document.getElementById('library-button');
  button.addEventListener('click', () => {
    const movieId = movie.id;
    let library = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    if (isInLibrary(movieId)) {
      library = library.filter(id => id !== movieId);
      button.textContent = 'Add to my library';
    } else {
      library.push(movieId);
      button.textContent = 'Remove from my library';
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(library));
  });
}

// Check if movie is in library
function isInLibrary(movieId) {
  const library = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  return library.includes(movieId);
}
