import{a as _,t as C,M as D}from"./vendor-4a88922e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=o(s);fetch(s.href,a)}})();const N=document.querySelector(".theme-switcher"),b=document.documentElement;function Y(){const e=b.getAttribute("data-theme")==="dark"?"light":"dark";b.setAttribute("data-theme",e),localStorage.setItem("theme",e)}N.addEventListener("click",Y);class h{constructor(){this.axios=_.create({baseURL:"https://api.themoviedb.org/3",headers:{accept:"application/json",Authorization:`Bearer ${{}.VITE_API_KEY}`,Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZhNTk0Y2Q2ZWRlZDUxZGFlZTA0ODU0NjY1MjdkYiIsIm5iZiI6MTcyMjAzNzc3Mi41NzIxMDMsInN1YiI6IjY2YTE3MjQ1ZTE1OTc2ZWJmYWI4YmYzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G9xrsM-y8LQuvYrOh8SZI1olRXGF_yNK39ZipUP4QbY"}})}async _fetch(t,o={}){try{return(await this.axios.get(t,{params:o})).data}catch(n){throw console.error(`Failed to fetch ${t}: ${n.message}`),n}}async getTrendingMovies(t){if(!["day","week"].includes(t))throw new Error("Invalid time_window. Must be 'day' or 'week'");return(await this._fetch(`/trending/movie/${t}`)).results}async getUpcomingMovies(){return(await this._fetch("/movie/upcoming")).results}async searchMovie(t,o=1){return(await this._fetch("/search/movie",{query:t,page:o})).results}async getMovieDetails(t){return await this._fetch(`/movie/${t}`)}async getMovieVideos(t){return(await this._fetch(`/movie/${t}/videos`)).results}async getMovieGenres(){return(await this._fetch("/genre/movie/list")).genres}async getCountriesList(){return await this._fetch("/configuration/countries")}}new h;window.addEventListener("scroll",C(function(){const e=document.getElementById("scrollUpBtn");window.scrollY>50?e.style.display="block":e.style.display="none"},100));document.getElementById("scrollUpBtn").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});class M{constructor(t){this.localStorageKey=t,this.movies=JSON.parse(localStorage.getItem(this.localStorageKey))||[]}_saveData(){try{localStorage.setItem(this.localStorageKey,JSON.stringify(this.movies))}catch(t){console.error("Error saving data:",t)}}addMovie(t){this.movies.findIndex(n=>n.id===t.id)===-1?(this.movies.push(t),this._saveData()):console.log("Movie already added:",t)}removeMovie(t){const o=this.movies.findIndex(n=>n.id===t);o!==-1?(this.movies.splice(o,1),this._saveData()):console.log("Movie not found")}getMovies(){return this.movies}}new M("local-movies");const u=document.querySelector(".backdrop"),q=document.querySelector(".modal-btn-open");function A(e){u.classList.remove("is-closed"),Z(e)}function w(){u.classList.add("is-closed"),u.innerHTML=""}async function Z(e){const t=new h,o=new M("myLibrary"),n=document.querySelector(".backdrop");try{const{title:s,poster_path:a,vote_average:i,vote_count:v,popularity:y,genres:O,overview:p}=await t.getMovieDetails(e),g=O.map(d=>d.name).join(" ");n.innerHTML=`
      <div class="modal-window">
        <button class="modal-btn-close" type="button">
          <svg class="modal-btn-close-icon" width="10.5" height="10.5" fill="#ffffff">
            <use href="../img/icons.svg#icon-close"></use>
          </svg>
        </button>
        <img class="modal-film-poster" src="https://image.tmdb.org/t/p/w500${a}" alt="${s} poster"/>
        <div class="modal-film-infos">
          <h3 class="modal-film-title">${s}</h3>
          <table class="modal-film-stats">
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Vote / Votes</th>
              <td class="modal-film-tab-data">
                <span class="modal-window-accent-vote">${i.toFixed(1)}</span>
                <span class="modal-window-accent-votes">${v}</span>
              </td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Popularity</th>
              <td class="modal-film-tab-data">${y}</td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Genre</th>
              <td class="modal-film-tab-data">${g}</td>
            </tr>
          </table>
          <h3 class="modal-film-desc-about">About</h3>
          <p class="modal-film-desc">${p}</p>
          <button id="library-actions-btn" type="submit">Add to my library</button>
        </div>
      </div>
    `,document.querySelector(".modal-btn-close").addEventListener("click",w),document.addEventListener("keydown",function(d){d.key==="Escape"&&w()}),document.getElementById("library-actions-btn").addEventListener("click",()=>{o.addMovie({id:e,title:s,poster_path:a,vote_average:i,vote_count:v,popularity:y,genreNames:g,overview:p})})}catch(s){console.error("Error fetching movie details:",s)}}q.addEventListener("click",()=>A(573435));const j=document.getElementById("our-team-btn"),c=document.querySelector(".team"),k=document.querySelector(".team-close-btn"),E=document.querySelector("body");j.addEventListener("click",J);function J(e){e.preventDefault(),c.classList.remove("is-closed"),document.body.classList.add("modal-open"),U()}function I(e){e.preventDefault(),e.code==="Escape"&&f()}function B(e){e.target.closest(".team-window")||f()}function T(e){e.preventDefault(),f()}function U(){document.addEventListener("keydown",I),c.addEventListener("click",B),k.addEventListener("click",T),E.style.overflow="hidden"}function f(){document.removeEventListener("keydown",I),c.removeEventListener("click",B),k.removeEventListener("click",T),c.classList.add("is-closed"),document.body.classList.remove("modal-open"),E.style.overflow="auto"}const S=new h,z=e=>{const t=document.getElementById("hero-section"),o=document.querySelector(".hero-text-cont");o.innerHTML=`
    <h2 class="title">${e.title}</h2>
    <div class="star-rating">
      ${H(e.vote_average)}
    </div>
    <p class="desc">${e.overview}</p>
    <div class="hero-btn">
      <button class="watch-btn" data-video-id="${e.id}" onclick="watchTrailer(${e.id})">Watch trailer</button> 
      <button class="details-btn" onclick="showDetails(${e.id})">More details</button>
    </div>
  `;const n=`https://image.tmdb.org/t/p/original${e.backdrop_path}`;t.style.backgroundImage=`linear-gradient(270deg, rgba(89, 130, 252, 0) 5%, rgba(0, 0, 0, 1) 70%), url(${n})`,t.style.backgroundPosition="center",document.querySelector(".watch-btn").addEventListener("click",P)},H=e=>{const t=Math.round(e/2);let o="";for(let n=0;n<5;n++)n<t?o+='<img src="./img/star.svg" alt="star">':o+='<img src="./img/star-outline.svg" alt="star-outline">';return o},P=async e=>{try{const o=(await S.getMovieVideos(e)).results.find(n=>n.type==="Trailer");o?new D(".watch-btn",{channel:"youtube",autoplay:1,url:`https://www.youtube.com/watch?v=${o.key}`}).open():window.alert("Trailer not available")}catch(t){console.error("Failed to load movie videos:",t),W()}};let m=!1;const W=()=>{if(m)return;m=!0;const e=document.getElementById("hero-section"),t=document.createElement("div");t.className="modal-oopsie fade-in",t.id="modal-cont",e.appendChild(t);const o=document.getElementById("modal-cont");o.innerHTML=`
        <p>OOPS... <br> We are very sorry! <br> But we couldn’t find the trailer.</p>
        <img class="image-cont">
        <button id="modal-close">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L4.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.5 4.5L13.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>`,document.getElementById("modal-close").addEventListener("click",function(){m=!1,t.classList.remove("fade-in"),t.classList.add("fade-out"),setTimeout(()=>{t.remove()},300)})},G=async()=>{try{const e=await S.getTrendingMovies("day");if(e.length>0){const t=e[Math.floor(Math.random()*e.length)];z(t)}else L()}catch(e){console.error("Failed to load trending movies:",e),L()}},L=()=>{const e=document.getElementById("hero-section"),t=document.getElementById("text-cont");e.classList.add("hero-default"),t.classList.remove("hero-text-cont"),t.classList.add("default-text-cont");const o=document.querySelector(".default-text-cont");o.innerHTML=`
    <h2 class="title-default">Let’s Make Your Own Cinema</h2>
    <p class="desc-default">Is a guide to creating a personalized movie theater experience. 
    You'll need a projector, screen, and speakers. 
    Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button class="get-started-btn" onclick="location.href='/catalog.html'">Get started</button>
  `};document.addEventListener("DOMContentLoaded",G);const F=document.querySelectorAll(".header-nav-list"),V=document.querySelectorAll(".mobile-nav-list"),x=window.location.href;F.forEach(e=>{e.href===x?e.classList.add("active"):e.classList.remove("active")});V.forEach(e=>{e.href===x?e.classList.add("active"):e.classList.remove("active")});const $=document.getElementById("menu-btn"),l=document.getElementById("mobile-menu-modal"),r=document.getElementById("mobile-menu-backdrop");$.addEventListener("click",function(){l.classList.add("open"),r.style.display="block"});r.addEventListener("click",function(e){e.target===r&&(l.classList.remove("open"),r.style.display="none")});document.addEventListener("click",function(e){!l.contains(e.target)&&e.target!==$&&(l.classList.remove("open"),r.style.display="none")});export{M as L,h as T,A as o};
//# sourceMappingURL=main-6f9b04ed.js.map
