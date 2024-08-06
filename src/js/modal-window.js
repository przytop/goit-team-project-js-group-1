'use strict';

import TmdbApi from './tmdb-api';
import LocalMovieManager from './local-movie-manager';

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
          <svg class="modal-btn-close-icon" width="10.5" height="10.5" fill="#ffffff">
            <use href="../img/icons.svg#icon-close"></use>
          </svg>
        </button>
        <img class="modal-film-poster" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title} poster"/>
        <div class="modal-film-infos">
          <h3 class="modal-film-title">${title}</h3>
          <table class="modal-film-stats">
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Vote / Votes</th>
              <td class="modal-film-tab-data">
                <span class="modal-window-accent-vote">${vote_average.toFixed(1)}</span>
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
          <button id="library-actions-btn" type="submit">Add to my library</button>
        </div>
      </div>
    `;

    // Closing modal when "closeBtn" button is clicked
    const closeBtn = document.querySelector('.modal-btn-close');
    closeBtn.addEventListener('click', coloseMovieInfoModal);


    // Closing modal by clicking ESCAPE button
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        coloseMovieInfoModal();
      }
    });

    // Add movie to local storage
    const addLibraryBtn = document.getElementById('library-actions-btn');
    addLibraryBtn.addEventListener('click', () => {
      lmm.addMovie({ id, title, poster_path, vote_average, vote_count, popularity, genreNames, overview });
    });

  } catch (error) {
    console.error('Error fetching movie details:', error);
  }  
}


openBtn.addEventListener('click', () => openMovieInfoModal(573435));

// ____________________________________________
// ID Dune: 438631
// ID Bad Boys: 573435
// zaczytanie ID do funkcji
// localStorage- pobranie ID z eventListener!!!
// klucz = 'myLibrary'

