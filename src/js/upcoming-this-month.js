import TmdbApi from './tmdb-api.js';

const tmdb = new TmdbApi();

async function getUpcomingMovies() {
  try {
    const movies = await tmdb.getUpcomingMovies();
    const today = new Date();
    const thisMonthMovies = movies.filter(movie => {
      const releaseDate = new Date(movie.release_date);
      return (
        releaseDate.getFullYear() === today.getFullYear() &&
        releaseDate.getMonth() === today.getMonth()
      );
    });

    if (thisMonthMovies.length === 0) {
      displayMessage('No upcoming movies this month.');
    } else {
      const randomMovie =
        thisMonthMovies[Math.floor(Math.random() * thisMonthMovies.length)];
      displayMovie(randomMovie);
    }
  } catch (error) {
    console.error('Failed to fetch upcoming movies:', error);
    displayMessage('Failed to fetch upcoming movies. Please try again later');
  }
}

function displayMessage(message) {
  const movieContainer = document.getElementById('movie-container');
  movieContainer.innerHTML = `<p>${message}</p>`;
}

function displayMovie(movie) {
  const movieContainer = document.getElementById('movie-container');
  const imageUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
  const releaseDate = new Date(movie.release_date).toLocaleDateString();
  const genres = movie.genre_ids.map(id => genreMap[id]).join(', ');

  const html = `
    <div class="upcoming-container" >
      <div class="upcoming-img">
        <img class="upcoming-img" src="${imageUrl}" alt="${movie.title}"></div>
        <div class="movie-details">
            <h2 class="movie-title">${movie.title}</h2>
            <p class="detail-item">Release date: <span class="relase-date">${releaseDate}</span></p>
            <p class="detail-item">Vote / Votes: <span class="vote-count">${movie.vote_count}</span></p>
            <p class="detail-item">Popularity: <span class="popularity-value">${movie.popularity}</span></p>
            <p class="genres-item">Genre: <span class="genres">${genres}</span></p>
            <p class="about">ABOUT</p>
            <p class="overview">${movie.overview}</p>
            <button  id="library-btn" data-id="${movie.id}">Add to my library</button>
        </div>
    </div>
    `;

  movieContainer.innerHTML = html;

  const libraryBtn = document.getElementById('library-btn');
  libraryBtn.addEventListener('click', () => toggleLibrary(movie.id));
}

function toggleLibrary(movieId) {
  const library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  const movieIndex = library.indexOf(movieId);

  if (movieIndex > -1) {
    library.splice(movieIndex, 1);
    alert('Removed from my library');
  } else {
    library.push(movieId);
    alert('Added to my library');
  }

  localStorage.setItem('myLibrary', JSON.stringify(library));
  updateLibraryButton(movieId);
}

function updateLibraryButton(movieId) {
  const library = JSON.parse(localStorage.getItem('myLibrary')) || [];
  const libraryBtn = document.getElementById('library-btn');

  if (library.includes(movieId)) {
    libraryBtn.textContent = 'Remove from my library';
  } else {
    libraryBtn.textContent = 'Add to my library';
  }
}

const genreMap = {};
tmdb.getMovieGenres().then(genres => {
  genres.forEach(genre => {
    genreMap[genre.id] = genre.name;
  });

  getUpcomingMovies();
});