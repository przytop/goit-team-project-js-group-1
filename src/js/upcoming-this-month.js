import TmdbApi from './tmdb-api';

const API_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const LOCAL_STORAGE_KEY = 'myLibrary';

document.addEventListener('DOMContentLoaded', async () => {
  const movieContainer = document.getElementById('movie');
  const tmdb = new TmdbApi();

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

async function fetchUpcomingMovie() {
  const response = await fetch(
    `${API_URL}/movie/upcoming?api_key=${tmdb}&language=en-US&page=1`
  );
  const data = await response.json();
  const movies = data.results;
  if (movies.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
}

function createMovieMarkup(movie) {
  return `
    <img src="${IMAGE_BASE_URL}/${movie.backdrop_path}" alt="${movie.title}">
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

function isInLibrary(movieId) {
  const library = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  return library.includes(movieId);
}
