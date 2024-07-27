'use strict';

import axios from 'axios';

export default class TmdbApi {
  constructor() {
    this.axios = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // VITE_API_KEY must be set correctly in environment variables
      },
    });
  }

  async _fetch(endpoint, params = {}) {
    try {
      const response = await this.axios.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error(
        `Failed to fetch data from themoviedb at ${endpoint}: ${error.message}`
      );
      throw error;
    }
  }

  async getTrendingMovies(time_window) {
    // time_window must be 'day or 'week'
    const valid = ['day', 'week'];
    if (!valid.includes(time_window)) {
      throw new Error("Invalid time_window. Must be 'day' or 'week'");
    }
    return this._fetch(`/trending/movie/${time_window}`);
  }

  async getUpcomingMovies() {
    return this._fetch(`/movie/upcoming`);
  }

  async searchMovie(query, page = 1) {
    return this._fetch('/search/movie', { query, page });
  }

  async getMovieDetails(movie_id) {
    return this._fetch(`/movie/${movie_id}`);
  }

  async getMovieVideos(movie_id) {
    return this._fetch(`/movie/${movie_id}/videos`);
  }

  async getMovieGenres() {
    return this._fetch('/genre/movie/list');
  }

  async getCountriesList() {
    return this._fetch('/configuration/countries');
  }
}

// Testing
// const tmdb = new TmdbApi();

// tmdb.getTrendingMovies('day').then(console.log).catch(console.error);
// tmdb.getTrendingMovies('week').then(console.log).catch(console.error);
// tmdb.getUpcomingMovies().then(console.log).catch(console.error);
// tmdb.searchMovie('Dune').then(console.log).catch(console.error);
// tmdb.getMovieDetails(438631).then(console.log).catch(console.error);
// tmdb.getMovieVideos(438631).then(console.log).catch(console.error);
// tmdb.getMovieGenres().then(console.log).catch(console.error);
// tmdb.getCountriesList().then(console.log).catch(console.error);
