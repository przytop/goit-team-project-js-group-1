import TmdbApi from './tmdb-api';
import openMovieInfoModal from './modal-window';

document.addEventListener('DOMContentLoaded', async () => {
  const tmdb = new TmdbApi();
  const catalogCardsContainer = document.querySelector('.catalog-movie-list');
  const sorryMessage = document.querySelector('.catalog-sorry-message');
  const input = document.querySelector('.input-text');
  const searchButton = document.querySelector('.catalog-button');
  const yearSelect = document.querySelector('.year-select');
  const xButton = document.querySelector('.x-button');
  const genreAbbreviations = { 'Science Fiction': 'Sci-Fi' };

  sorryMessage.style.display = 'none';

  const fetchMovies = async (query = '', page = 1) => {
    try {
      return query ? (await tmdb.searchMovie(query, page)).slice(0, 18) : (await tmdb.getTrendingMovies('week')).slice(0, 18);
    } catch (e) { console.error('Error fetching movies:', e); return []; }
  };

  const fetchGenres = async () => {
    try { return await tmdb.getMovieGenres(); }
    catch (e) { console.error('Error fetching genres:', e); return []; }
  };

  const getGenres = await fetchGenres();
  const filterByYear = (movies, year) => year ? movies.filter(m => new Date(m.release_date).getFullYear() == year) : movies;

  const starRating = rating => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1 ? 1 : 0;
    return '<svg class="star full"><use xlink:href="#icon-star"></use></svg>'.repeat(fullStars) +
           (halfStar ? '<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>' : '') +
           '<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>'.repeat(5 - Math.ceil(rating / 2));
  };

  const renderMovies = movies => {
    catalogCardsContainer.innerHTML = '';
    sorryMessage.style.display = movies.length ? 'none' : 'block';

    movies.forEach(m => {
      const genres = m.genre_ids.slice(0, 2).map(id => (getGenres.find(g => g.id === id)?.name || 'Unknown')).map(name => genreAbbreviations[name] || name).join(', ');
      const releaseDate = m.release_date ? new Date(m.release_date).getFullYear() : 'Unknown';
      const rating = Math.round(m.vote_average * 10) / 10;

      const card = document.createElement('li');
      card.classList.add('card');
      card.style.background = `url(https://image.tmdb.org/t/p/w500${m.poster_path}) center/cover`;
      card.dataset.id = m.id;
      card.innerHTML = `
        <div class="card-content">
          <h2>${m.title}</h2>
          <p>${genres} | ${releaseDate} <span class="stars">${starRating(rating)}</span></p>
        </div>
      `;
      card.addEventListener('click', () => openMovieInfoModal(m.id));
      catalogCardsContainer.appendChild(card);
    });
  };

  const handleSearch = async () => renderMovies(filterByYear(await fetchMovies(input.value.trim()), yearSelect.value));

  searchButton.addEventListener('click', handleSearch);
  yearSelect.addEventListener('change', handleSearch);
  xButton.addEventListener('click', () => input.value = '');
  input.addEventListener('input', () => xButton.style.visibility = input.value.trim() ? 'visible' : 'hidden');

  renderMovies(await fetchMovies());
});
