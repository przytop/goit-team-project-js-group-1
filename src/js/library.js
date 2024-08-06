import TmdbApi from './tmdb-api';
import openMovieInfoModal from './modal-window';

const movieList = document.querySelector('.my-library-movie-list');
const sorry = document.querySelector('.my-library-sorry');
const loadMoreButton = document.querySelector('.my-library-main-section .my-library-button');
const mainSection = document.querySelector('.my-library-main-section');
const genreSelect = document.querySelector('#genre');

// Variables to track state
let currentDisplayCount = 0;
const batchSize = 9;
const genreMap = new Map();

async function fetchGenres() {
  try {
    const tmdb = new TmdbApi();
    const genres = await tmdb.getMovieGenres(); // Returns an array of genre objects from db

    genres.forEach(genre => {
      if (genre.id && genre.name) {
        genreMap.set(genre.id, genre.name);
      }
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
}

function createMovieListItem(movie) {
  const listItem = document.createElement('li');
  listItem.classList.add('my-library-movie-list-item');

  const genreNames = (movie.genre_ids || [])
    .map(id => genreMap.get(id) || 'Unknown')
    .join(', ');

  const id = movie.id;
  const releaseYear = new Date(movie.release_date).getFullYear();
  listItem.dataset.id = id;

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  listItem.style.backgroundImage = `url(${imageUrl})`;
  listItem.style.backgroundSize = 'cover';
  listItem.style.backgroundPosition = 'center';
  listItem.innerHTML = `
    <div class="my-library-gradient"></div>
    <div class="my-library-movie">
      <span class="my-library-movie-title">${movie.title}</span>
      <span class="my-library-movie-genres">${genreNames} | ${releaseYear}</span>
    </div>
  `;

  return listItem;
}

function renderMovieList(genre = '', reset = true) {
  const movies = JSON.parse(localStorage.getItem('myLibrary')) || [];

  // Reset display count if necessary
  if (reset) {
    currentDisplayCount = 0;
  }

  const filteredMovies = genre
    ? movies.filter(movie => {
        const movieGenre = movie.genre_ids || [];
        return movieGenre.some(id => genreMap.get(id).toLowerCase() === genre.toLowerCase());
      })
    : movies;

  if (reset) {
    movieList.innerHTML = '';
  }

  if (filteredMovies.length > 0) {
    mainSection.style.display = 'block';
    sorry.style.display = 'none';
    document.querySelector('.genre-form').style.display = 'block';

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
    document.querySelector('.genre-form').style.display = 'none';
    loadMoreButton.style.display = 'none';
  }

  // Event for movie items
  document.querySelectorAll('.my-library-movie-list-item').forEach(item => {
    item.addEventListener('click', event => {
      const listItem = event.currentTarget;
      const id = listItem.dataset.id;
      if (id) {
        openMovieInfoModal(id);
      }
    });
  });
}

loadMoreButton.addEventListener('click', function () {
  renderMovieList(genreSelect.value, false);
});

genreSelect.addEventListener('change', function () {
  const selectedGenre = genreSelect.value;
  renderMovieList(selectedGenre);
});

async function render() {
  await fetchGenres();
  renderMovieList();
}

render();
