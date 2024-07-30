// const movieList = document.querySelector('.my-library-movie-list');
// const sorry = document.querySelector('.my-library-sorry');
// const loadMoreButton = document.querySelector(
//   '.my-library-main-section .my-library-button'
// );
// const mainSection = document.querySelector('.my-library-main-section');

// // Function to create a movie list item
// function createMovieListItem(movie) {
//   const listItem = document.createElement('li');
//   listItem.classList.add('my-library-movie-list-item');

//   listItem.innerHTML = `
//       <a href="${movie.image}">
//         <img src="${movie.image}" class="my-library-movie-picture" />
//         <div class="my-library-gradient"></div>
//         <div class="my-library-movie">
//           <span class="my-library-movie-title">${movie.title}</span>
//           <span class="my-library-movie-genres">${movie.genre} | ${movie.year}</span>
//         </div>
//       </a>
//     `;

//   return listItem;
// }

// // Function to render the movie list
// function renderMovieList() {
//   movieList.innerHTML = ''; // Clear current list
//   const movies = JSON.parse(localStorage.getItem('myLibraryMovies')) || [];

//   if (movies.length > 0) {
//     mainSection.style.display = 'block';
//     sorry.style.display = 'none';
//     movies.forEach(movie => {
//       const listItem = createMovieListItem(movie);
//       movieList.appendChild(listItem);
//     });
//   } else {
//     sorry.style.display = 'block';
//     mainSection.style.display = 'none';
//   }
// }

// // Load more button functionality (if you want to load movies in batches)
// loadMoreButton.addEventListener('click', function () {
//   renderMovieList();
// });

// // Initial render
// renderMovieList();
