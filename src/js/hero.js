import TmdbApi from "./tmdb-api";

const tmdb = new TmdbApi();
const test = async () => {
  try {
    console.log(await tmdb.getTrendingMovies('day'));
    console.log(await tmdb.getTrendingMovies('week'));
    console.log(await tmdb.getUpcomingMovies());
    console.log(await tmdb.searchMovie('Dune'));
    console.log(await tmdb.getMovieDetails(438631, 'title'));
    console.log(await tmdb.getMovieVideos(438631));
    console.log(await tmdb.getMovieGenres());
    console.log(await tmdb.getCountriesList());
  } catch (error) {
    console.error('Test failed:', error);
  }
};