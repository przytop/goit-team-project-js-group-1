import TmdbApi from './tmdb-api';
import openMovieInfoModal from './modal-window';

document.addEventListener('DOMContentLoaded', async function () {
  const tmdb = new TmdbApi();
  const MOVIE_CATALOG = document.getElementById('movie-catalog');
  const PAGE_NUMBER = document.getElementById('page-number');
  const TITLE_SEARCH = document.getElementById('title-search');
  const YEAR_SELECT = document.getElementById('year-select');
  const CLEAR_SEARCH = document.getElementById('clear-search');
  const PAGINATION_CONTAINER = document.querySelector('.pagination');
  const backdrop = document.querySelector('.backdrop');

  const genreAbbreviations = {
    'Science Fiction': 'Sci-Fi',
    Documentary: 'Doc',
    Animation: 'Anim',
    Adventure: 'Adv',
  };

  let currentPage = 1;
  let totalPages = 1;

  function populateYearSelect() {
    // Dodaj opcję "YEAR" jako domyślną pierwszą opcję
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'YEAR';
    defaultOption.disabled = true; // Opcja jest niedostępna do wyboru
    defaultOption.selected = true; // Opcja jest domyślnie wybrana
    YEAR_SELECT.appendChild(defaultOption);

    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      YEAR_SELECT.appendChild(option);
    }
  }

  populateYearSelect();

  async function fetchMovies() {
    try {
      const title = TITLE_SEARCH.value;
      const year = YEAR_SELECT.value;
      let movies = [];

      const params = {
        page: currentPage,
      };

      if (year) {
        params['primary_release_year'] = year;
      }

      if (title) {
        const response = await tmdb.searchMovie(title, currentPage);
        if (response && Array.isArray(response)) {
          movies = response;
        } else if (response && response.results) {
          movies = response.results;
          totalPages = response.total_pages;
        }
      } else {
        const response = await tmdb._fetch('/discover/movie', params);
        if (response && response.results && Array.isArray(response.results)) {
          movies = response.results;
          totalPages = response.total_pages;
        }
      }

      if (movies.length === 0) {
        MOVIE_CATALOG.innerHTML = '<p>No movies found.</p>';
      } else {
        displayMovies(movies);
      }

      PAGE_NUMBER.textContent = currentPage;
      renderPagination();
    } catch (error) {
      console.error('Error fetching movies:', error);
      MOVIE_CATALOG.innerHTML =
        '<p>Error loading movies. Please try again later.</p>';
    }
  }

  function displayMovies(movies) {
    MOVIE_CATALOG.innerHTML = '';

    movies.slice(0, 18).forEach(movie => {
      const card = document.createElement('div');
      card.className = 'card';

      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'placeholder.png';
      const genres = movie.genre_ids
        .slice(0, 2)
        .map(id => {
          let genreName = getGenreNameById(id);
          return genreAbbreviations[genreName] || genreName;
        })
        .join(', ');
      const releaseDate = movie.release_date
        ? movie.release_date.split('-')[0]
        : 'Unknown';

      const rating = (movie.vote_average / 2).toFixed(1);

      const fullStars = Math.floor(rating);
      const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
      const emptyStars = 5 - fullStars - halfStar;

      const stars = [
        ...Array(fullStars).fill(
          '<svg class="star"><use xlink:href="#icon-star"></use></svg>'
        ),
        ...Array(halfStar).fill(
          '<svg class="star"><use xlink:href="#icon-star-half"></use></svg>'
        ),
        ...Array(emptyStars).fill(
          '<svg class="star"><use xlink:href="#icon-star-outline"></use></svg>'
        ),
      ].join('');

      card.style.backgroundImage = `url(${poster})`;
      card.innerHTML = `
              <div class="card-content">
                  <h2>${movie.title}</h2>
                      <p class="genres">${genres} | ${releaseDate}
                      <span class="stars">${stars}</span></p>
                  </div>
              </div>
            `;

      card.dataset.id = movie.id;
      card.addEventListener('click', event => {
        const id = event.currentTarget.dataset.id;
        if (id) {
          openMovieInfoModal(id);
        }
      });

      MOVIE_CATALOG.appendChild(card);
    });
  }

  function renderPagination() {
    PAGINATION_CONTAINER.innerHTML = '';

    if (totalPages <= 1) return;

    const createPageButton = page => {
      const button = document.createElement('button');
      button.textContent = page;
      button.classList.add('page-number-button');
      if (page === currentPage) {
        button.classList.add('active');
      }
      button.addEventListener('click', () => {
        currentPage = page;
        fetchMovies();
      });
      return button;
    };

    PAGINATION_CONTAINER.appendChild(createPageButton(1));
    if (totalPages > 1) PAGINATION_CONTAINER.appendChild(createPageButton(2));
    if (totalPages > 2) PAGINATION_CONTAINER.appendChild(createPageButton(3));

    if (totalPages > 4 && currentPage > 4) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      PAGINATION_CONTAINER.appendChild(dots);
    }

    if (currentPage > 3 && currentPage < totalPages - 2) {
      PAGINATION_CONTAINER.appendChild(createPageButton(currentPage));
    }

    if (totalPages > 4 && currentPage < totalPages - 2) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      PAGINATION_CONTAINER.appendChild(dots);
    }

    PAGINATION_CONTAINER.appendChild(createPageButton(totalPages));

    if (currentPage > 1) {
      const prevButton = document.createElement('button');
      prevButton.textContent = '←';
      prevButton.classList.add('arrow-button');
      prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          fetchMovies();
        }
      });
      PAGINATION_CONTAINER.insertBefore(
        prevButton,
        PAGINATION_CONTAINER.firstChild
      );
    }

    if (currentPage < totalPages) {
      const nextButton = document.createElement('button');
      nextButton.textContent = '→';
      nextButton.classList.add('arrow-button');
      nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
          currentPage++;
          fetchMovies();
        }
      });
      PAGINATION_CONTAINER.appendChild(nextButton);
    }
  }

  function getGenreNameById(id) {
    const genreMapping = {
      28: 'Action',
      12: 'Adventure',
      16: 'Animation',
      35: 'Comedy',
      80: 'Crime',
      99: 'Documentary',
      18: 'Drama',
      10751: 'Family',
      14: 'Fantasy',
      36: 'History',
      27: 'Horror',
      10402: 'Music',
      9648: 'Mystery',
      10749: 'Romance',
      878: 'Science Fiction',
      10770: 'TV Movie',
      53: 'Thriller',
      10752: 'War',
      37: 'Western',
    };
    return genreMapping[id] || 'Unknown';
  }

  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) {
      closeModal();
    }
  });

  document.getElementById('search-button').addEventListener('click', () => {
    currentPage = 1;
    fetchMovies();
  });

  CLEAR_SEARCH.addEventListener('click', () => {
    TITLE_SEARCH.value = '';
    CLEAR_SEARCH.style.display = 'none';
    currentPage = 1;
    fetchMovies();
  });

  TITLE_SEARCH.addEventListener('input', () => {
    CLEAR_SEARCH.style.display = TITLE_SEARCH.value ? 'block' : 'none';
  });

  function closeModal() {
    backdrop.classList.remove('is-visible');
    backdrop.classList.add('is-closed');
  }

  fetchMovies();
});
