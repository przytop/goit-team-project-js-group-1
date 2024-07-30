'use strict';
import TmdbApi from "./tmdb-api";
import LocalMovieManager from "./local-movie-manager";

// adding event listeners to open modal window and close by kliocking exit button or by pressing ESC
document.addEventListener('DOMContentLoaded', function () {
  const openBtn = document.querySelector('.modal-btn-open');
  const closeBtn = document.querySelector('.modal-btn-close');
  const backdrop = document.querySelector('.backdrop');

  if (openBtn && closeBtn && backdrop) {
    openBtn.addEventListener('click', () => {
      backdrop.classList.remove('is-closed');
    });

    closeBtn.addEventListener('click', () => {
      backdrop.classList.add('is-closed');
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        backdrop.classList.add('is-closed');
      }
    });
  } else {
    console.error(
      'One or more elements are missing. Check the selectors and the HTML structure.'
    );
  }
});

// ---------------------------------------------------------------------------------------------

// const markup = {};
// // ?

// export function createMarkup(data) {
//   return data.map(image => `
//     <div class="modal-window">
//         <button class="modal-btn-close" type="button">
//             <svg class="modal-btn-close-icon" width="10.5" height="10.5" fill="#ffffff">
//                 <use href="./images/icons.svg#icon-close"></use>
//             </svg>
//         </button>

//         <img class="modal-film-poster">

//         <div class="modal-film-infos">
//             <h3 class="modal-film-title">${film.title}</h3>
//             <table class="modal-film-stats">
//                 <tr class="modal-film-tab-row">
//                     <th class="modal-film-tab-header">Vote / Votes</th>
//                     <td class="modal-film-tab-data">
//                         <span class="modal-window-accent-vote">${vote}</span>
//                         /
//                         <span class="modal-window-accent-votes">${votes}</span></td>
//                 </tr>
//                 <tr class="modal-film-tab-row">
//                     <th class="modal-film-tab-header">Popularity</th>
//                     <td class="modal-film-tab-data">${popular.}</td>
//                 </tr>
//                 <tr class="modal-film-tab-row">
//                     <th class="modal-film-tab-header">Genre</th>
//                     <td class="modal-film-tab-data">${genre}</td>
//                 </tr>
//             </table>

//             <h3 class="modal-film-desc-about">About</h3>
//             <p class="modal-film-desc">${descr} ~~ Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo commodi
//                 iure eius repellendus perspiciatis. Ducimus sit temporibus provident architecto! Adipisci labore
//                 accusantium maiores, laborum voluptates odit illum odio nam id. Lorem ipsum dolor sit amet consectetur
//                 adipisicing elit. Rem fugiat ea, eos provident, illo veritatis quos id laborum a, enim ullam. Provident
//                 atque id quam, aspernatur nemo necessitatibus saepe consequatur. Lorem ipsum dolor sit amet consectetur
//                 adipisicing elit. Consequuntur asperiores cumque, debitis atque ab maiores beatae voluptatum aperiam
//                 error nulla? Nostrum aperiam magni aut magnam ipsam maiores quaerat placeat omnis.</p>
//             <button id="library-actions-btn" type="submit">Add to my library</button>

//         </div>
//     </div>
// `).join('');
// }



// // ---------------------------------------------------------------------------------------------

// const tmdb = new TmdbApi();
// const infoMovie = async (id, info) => {
//   try {
//     const result = await tmdb.getMovieDetails(id, info);
//     console.log(result); // Test na konsoli
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// };
// title();

// // title(43764, 'popularity');


// // ---
// const movieManager = new LocalMovieManager();
// // ---