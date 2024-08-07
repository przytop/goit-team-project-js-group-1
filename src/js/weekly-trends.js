import TmdbApi from './tmdb-api';
import openMovieInfoModal from './modal-window';

document.addEventListener('DOMContentLoaded', async function () {
  const movieCardsContainer = document.getElementById('weekly-cards');
  const tmdb = new TmdbApi();

  const genreAbbreviations = {
    'Science Fiction': 'Sci-Fi',
  };

  const backdrop = document.querySelector('.backdrop');
  // const modalWindow = backdrop.querySelector('.modal-window');
  // const closeButton = modalWindow.querySelector('.modal-btn-close');

  // function openModal() {
  //   modalWindow.innerHTML = `
  //     <button class="modal-btn-close" type="button">
  //       <svg class="modal-btn-close-icon" width="10.5" height="10.5" fill="#ffffff">
  //         <use href=""></use>
  //       </svg>
  //     </button>

  //     <img class="modal-film-poster" src="https://via.placeholder.com/248x315" alt="Film Poster">

  //     <div class="modal-film-infos">
  //         <h3 class="modal-film-title">Sample Film Title</h3>
  //         <table class="modal-film-stats">
  //             <tr class="modal-film-tab-row">
  //                 <th class="modal-film-tab-header">Vote / Votes</th>
  //                 <td class="modal-film-tab-data">
  //                     <span class="modal-window-accent-vote">8.5</span>
  //                     /
  //                     <span class="modal-window-accent-votes">2000</span></td>
  //             </tr>
  //             <tr class="modal-film-tab-row">
  //                 <th class="modal-film-tab-header">Popularity</th>
  //                 <td class="modal-film-tab-data">89.2</td>
  //             </tr>
  //             <tr class="modal-film-tab-row">
  //                 <th class="modal-film-tab-header">Genre</th>
  //                 <td class="modal-film-tab-data">Action, Drama</td>
  //             </tr>
  //         </table>

  //         <h3 class="modal-film-desc-about">About</h3>
  //         <p class="modal-film-desc">Sample description  ~~ Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo commodi
  //               iure eius repellendus perspiciatis. Ducimus sit temporibus provident architecto! Adipisci labore
  //               accusantium maiores, laborum voluptates odit illum odio nam id. Lorem ipsum dolor sit amet consectetur
  //               adipisicing elit. Rem fugiat ea, eos provident, illo veritatis quos id laborum a, enim ullam. Provident
  //               atque id quam, aspernatur nemo necessitatibus saepe consequatur. Lorem ipsum dolor sit amet consectetur
  //               adipisicing elit. Consequuntur asperiores cumque, debitis atque ab maiores beatae voluptatum aperiam
  //               error nulla? Nostrum aperiam magni aut magnam ipsam maiores quaerat placeat omnis</p>
  //         <button id="library-actions-btn" type="submit">Add to my library</button>
  //     </div>
  //   `;
  //   // backdrop.classList.remove('is-closed');
  //   // backdrop.classList.add('is-visible');
  // }

  function closeModal() {
    backdrop.classList.remove('is-visible');
    backdrop.classList.add('is-closed');
  }

  // closeButton.addEventListener('click', closeModal);

  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) {
      closeModal();
    }
  });

  try {
    const movies = await tmdb.getTrendingMovies('week');

    function displayGenres() {
      const screenWidth = window.innerWidth;
      let genresToShow = 2;

      if (screenWidth <= 600) {
        genresToShow = 1;
      }

      movieCardsContainer.innerHTML = '';

      movies.slice(0, 3).forEach(async movie => {
        const card = document.createElement('div');
        card.classList.add('card');

        const id = movie.id;

        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const title = movie.title;
        const releaseDate = movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : 'Unknown';
        const rating = Math.round(movie.vote_average * 10) / 10;

        const genresList = await tmdb.getMovieGenres();
        const genreNames = movie.genre_ids
          .slice(0, genresToShow)
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

        card.style.backgroundImage = `url(${imageUrl})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';

        card.dataset.id = id;

        card.innerHTML = `
          <div class="card-content">
            <h2>${title}</h2>
            <p>${genreNames} | ${releaseDate} <span class="stars">${stars}</span></p>
          </div>
        `;

        document.querySelectorAll('.card').forEach(card => {
          card.addEventListener('click', event => {
            const id = event.target.getAttribute('data-id');
            if (id) {
              openMovieInfoModal(id);
            }
          });
        });

        movieCardsContainer.appendChild(card);
      });
    }

    displayGenres();

    window.addEventListener('resize', displayGenres);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
