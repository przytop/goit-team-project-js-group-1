'use strict';

import TmdbApi from './tmdb-api';
import LocalMovieManager from './local-movie-manager';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const backdrop = document.querySelector('.backdrop');
const openBtn = document.querySelector('.modal-btn-open');

export default function openMovieInfoModal(id) {
  backdrop.classList.remove('is-closed');
  createMovieInfoMarkup(id);
}

function coloseMovieInfoModal() {
  backdrop.classList.add('is-closed');
  backdrop.innerHTML = '';
}

export async function createMovieInfoMarkup(id) {
  const tmdb = new TmdbApi();
  const lmm = new LocalMovieManager('myLibrary');
  const backdrop = document.querySelector('.backdrop');

  try {
    const {
      title,
      poster_path,
      vote_average,
      vote_count,
      popularity,
      genres,
      overview,
    } = await tmdb.getMovieDetails(id);
    const genreNames = genres.map(genre => genre.name).join(' ');

    backdrop.innerHTML = `
      <div class="modal-window">
        <button class="modal-btn-close" type="button">
          <svg class="modal-btn-close-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <use href="./img/icons.svg#icon-close"></use>
          </svg>
        </button>
        <img class="modal-film-poster" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title} poster"/>
        <div class="modal-film-infos">
          <h3 class="modal-film-title">${title}</h3>
          <table class="modal-film-stats">
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Vote / Votes</th>
              <td class="modal-film-tab-data">
                <span class="modal-window-accent-vote">${vote_average.toFixed(
                  1
                )}</span>
                /
                <span class="modal-window-accent-votes">${vote_count}</span>
              </td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Popularity</th>
              <td class="modal-film-tab-data">${popularity}</td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Genre</th>
              <td class="modal-film-tab-data">${genreNames}</td>
            </tr>
          </table>
          <h3 class="modal-film-desc-about">About</h3>
          <p class="modal-film-desc">${overview}</p>
          <button id="library-actions-btn" type="submit">Dodaj do mojej biblioteki</button>
        </div>
      </div>
    `;

    const closeBtn = document.querySelector('.modal-btn-close');
    closeBtn.addEventListener('click', coloseMovieInfoModal);

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        coloseMovieInfoModal();
      }
    });

    const addLibraryBtn = document.getElementById('library-actions-btn');
    updateLibraryButton(id);
    addLibraryBtn.addEventListener('click', () => {
      toggleLibrary({
        id,
        title,
        poster_path,
        vote_average,
        vote_count,
        popularity,
        genres,
        overview,
      });
    });
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}

function toggleLibrary(movie) {
  const movieId = movie.id;
  const lmm = new LocalMovieManager('myLibrary');
  const isInLibrary = lmm.getMovies().some(m => m.id === movieId);

  if (isInLibrary) {
    lmm.removeMovie(movieId);
    iziToast.info({
      title: 'Info',
      message: 'Removed from my library',
      backgroundColor: 'red',
      messageSize: '13',
      closeOnEscape: true,
      closeOnClick: true,
    });
  } else {
    lmm.addMovie(movie);
    iziToast.success({
      title: 'Success ',
      message: 'Added to my library',
      backgroundColor: 'orange',
      messageSize: '13',
      closeOnEscape: true,
      closeOnClick: true,
    });
  }

  updateLibraryButton(movieId);
}

function updateLibraryButton(movieId) {
  const lmm = new LocalMovieManager('myLibrary');
  const isInLibrary = lmm.getMovies().some(m => m.id === movieId);
  const libraryBtn = document.getElementById('library-actions-btn');

  if (isInLibrary) {
    libraryBtn.textContent = 'Remove from my library';
  } else {
    libraryBtn.textContent = 'Add to my library';
  }
}

openBtn.addEventListener('click', () => openMovieInfoModal(573435));
