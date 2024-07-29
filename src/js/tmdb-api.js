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
      console.error(`Failed to fetch ${endpoint}: ${error.message}`);
      throw error;
    }
  }

  async getTrendingMovies(time_window) {
    if (!['day', 'week'].includes(time_window)) {
      throw new Error("Invalid time_window. Must be 'day' or 'week'");
    }
    return (await this._fetch(`/trending/movie/${time_window}`)).results;
  }

  async getUpcomingMovies() {
    return (await this._fetch(`/movie/upcoming`)).results;
  }

  async searchMovie(query, page = 1) {
    return (await this._fetch('/search/movie', { query, page })).results;
  }

  async getMovieDetails(movie_id, type_of_data) {
    const data = await this._fetch(`/movie/${movie_id}`);
    if (!data[type_of_data]) {
      throw new Error(`Not found ${type_of_data} for ID ${movie_id}`);
    }
    return data[type_of_data];
    }

  async getMovieVideos(movie_id) {
    return (await this._fetch(`/movie/${movie_id}/videos`)).results;
  }

  async getMovieGenres() {
    return (await this._fetch('/genre/movie/list')).genres;
  }

  async getCountriesList() {
    return await this._fetch('/configuration/countries');
  }
}

// Testing
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

test();
