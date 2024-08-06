import TmdbApi from "./tmdb-api";
import ModalVideo from 'modal-video';
import 'modal-video/css/modal-video.min.css';


const tmdb = new TmdbApi();


const displayMovieInfo = (movie) => {
  const hero = document.getElementById("hero-section");
  const heroTextCont = document.querySelector('.hero-text-cont');
  heroTextCont.innerHTML = `
    <h2 class="title">${movie.title}</h2>
    <div class="star-rating">
      ${getStarRatingHTML(movie.vote_average)}
    </div>
    <p class="desc">${movie.overview}</p>
    <div class="hero-btn">
      <button class="watch-btn" data-video-id="${movie.id}" onclick="watchTrailer(${movie.id})">Watch trailer</button> 
      <button class="details-btn" onclick="showDetails(${movie.id})">More details</button>
    </div>
  `;

  const imageUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
  
  hero.style.backgroundImage = `linear-gradient(270deg, rgba(89, 130, 252, 0) 5%, rgba(0, 0, 0, 1) 70%), url(${imageUrl})`, innerWidth;
  hero.style.backgroundPosition = "center"

  const watchBtn = document.querySelector('.watch-btn');
  watchBtn.addEventListener('click', watchTrailer)

};

const getStarRatingHTML = (voteAverage) => {
  const stars = Math.round(voteAverage / 2);
  let starHTML = '';
  for (let i = 0; i < 5; i++) {
    if (i < stars) {
      starHTML += '<img src="./img/star.svg" alt="star">';
    } else {
      starHTML += '<img src="./img/star-outline.svg" alt="star-outline">';
    }
  }
  return starHTML;
};

const watchTrailer = async (movieId) => {
  try {
    const videos = await tmdb.getMovieVideos(movieId);
    const trailer = videos.results.find(video => video.type === 'Trailer');
    if (trailer) {
      new ModalVideo('.watch-btn', {
        channel: 'youtube',
        autoplay: 1,
        url: `https://www.youtube.com/watch?v=${trailer.key}`
      }).open();
    } else {
      window.alert('Trailer not available');
    }
  } catch (error) {
    console.error('Failed to load movie videos:', error);
    modalOopsie()
  }
};

let modalOpened = false;

const modalOopsie = () => {
  if(modalOpened) return;
  modalOpened = true;

  const hero = document.getElementById('hero-section')
  const modalDiv = document.createElement("div");
  modalDiv.className = 'modal-oopsie fade-in';
  modalDiv.id = 'modal-cont';
  hero.appendChild(modalDiv);

  const modalCont = document.getElementById("modal-cont");
  modalCont.innerHTML = `
        <p>OOPS... <br> We are very sorry! <br> But we couldn’t find the trailer.</p>
        <img class="image-cont">
        <button id="modal-close">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L4.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.5 4.5L13.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>`

  document.getElementById('modal-close').addEventListener('click', function() {
    modalOpened = false;

    modalDiv.classList.remove('fade-in');
    modalDiv.classList.add('fade-out');
    
    setTimeout(() => {
      modalDiv.remove();
    }, 300)
  });
};
   

const showDetails = (movieId) => {
  window.location.href = `/details.html?movieId=${movieId}`;
};

const loadHeroContent = async () => {
  try {
    const movies = await tmdb.getTrendingMovies('day');
    if (movies.length > 0) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      displayMovieInfo(randomMovie);
    } else {
      displayDefaultHero();
    }
  } catch (error) {
    console.error('Failed to load trending movies:', error);
    displayDefaultHero();
  }
};

const displayDefaultHero = () => {
  const hero = document.getElementById("hero-section");
  const textCont = document.getElementById("text-cont");
  hero.classList.add("hero-default");
  textCont.classList.remove("hero-text-cont");
  textCont.classList.add("default-text-cont");
  const defaultTextCont = document.querySelector('.default-text-cont');
  defaultTextCont.innerHTML = `
    <h2 class="title-default">Let’s Make Your Own Cinema</h2>
    <p class="desc-default">Is a guide to creating a personalized movie theater experience. 
    You'll need a projector, screen, and speakers. 
    Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button class="get-started-btn" onclick="location.href='/catalog.html'">Get started</button>
  `;
};

document.addEventListener('DOMContentLoaded', loadHeroContent);