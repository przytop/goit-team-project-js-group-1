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
