import TmdbApi from './tmdb-api';

document.addEventListener('DOMContentLoaded', async function () {
  const movieCardsContainer = document.getElementById('weekly-cards');
  const tmdb = new TmdbApi();

  const genreAbbreviations = {
    'Science Fiction': 'Sci-Fi',
  };

  try {
    const movies = await tmdb.getTrendingMovies('week');

    movies.slice(0, 3).forEach(async movie => {
      const card = document.createElement('div');
      card.classList.add('card');

      const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      const title = movie.title;
      const releaseDate = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 'Unknown';
      const rating = Math.round(movie.vote_average * 10) / 10; 

      const genresList = await tmdb.getMovieGenres();
      const genreNames = movie.genre_ids
        .slice(0, 2)
        .map(id => {
          const genre = genresList.find(g => g.id === id);
          const genreName = genre ? genre.name : 'Unknown';
          return genreAbbreviations[genreName] || genreName;
        })
        .join(', ');

      const maxStars = 5;
      const fullStars = Math.floor(rating / 2);
      const halfStar = rating % 2 >= 1 ? 1 : 0;
      const emptyStars = maxStars - fullStars - halfStar;

      const stars = [
        ...Array(fullStars).fill(
          '<svg class="star full"><use xlink:href="#icon-star"></use></svg>'
        ),
        ...Array(halfStar).fill(
          '<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'
        ),
        ...Array(emptyStars).fill(
          '<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>'
        ),
      ].join('');

      card.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <div class="card-content">
          <h2>${title}</h2>
          <p>${genreNames} | ${releaseDate} <span class="stars">${stars}</span></p>
        </div>
      `;

      movieCardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
