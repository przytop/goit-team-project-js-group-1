import TmbdbApi from './tmdb-api';

const tmdb = new TmbdbApi();

const test = async () => {
  try {
    console.log(await tmdb.getTrendingMovies('day'));
    console.log(await tmdb.getTrendingMovies('week'));
    console.log(await tmdb.searchMovie('Dune'));
    console.log(await tmdb.getMovieDetails(438631, 'title'));
    console.log(await tmdb.getMovieVideos(438631));
  } catch (error) {
    console.error('Test failed:', error);
  }
};

const search = async text => {
  try {
    const result = await tmdb.searchMovie(text);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

trending('week');

const trending = tmdb.getTrendingMovies('week').then(result => {
  console.log(result);
  return result;
});

document.addEventListener('DOMContentLoaded', function () {
  const input = document.querySelector('.input-text');
  const sorryMessage = document.querySelector('.catalog-sorry-message');
  const movieListItems = document.querySelectorAll('.catalog-movie-list-item');

  sorryMessage.style.display = 'none'; // Ukryj wiadomość na początku

  input.addEventListener('input', function () {
    const query = input.value.toLowerCase();
    let hasResults = false;

    movieListItems.forEach(item => {
      const title = item
        .querySelector('.catalog-movie-title')
        .textContent.toLowerCase();
      if (title.includes(query)) {
        item.style.display = ''; // Pokaż element
        hasResults = true;
      } else {
        item.style.display = 'none'; // Ukryj element
      }
    });

    if (!hasResults) {
      sorryMessage.style.display = 'block'; // Pokaż wiadomość
    } else {
      sorryMessage.style.display = 'none'; // Ukryj wiadomość
    }
  });
});
