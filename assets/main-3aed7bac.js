import{a as $,t as _}from"./vendor-f9df95ff.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=s(o);fetch(o.href,a)}})();const O=document.querySelector(".theme-switcher"),p=document.documentElement;function C(){const e=p.getAttribute("data-theme")==="dark"?"light":"dark";p.setAttribute("data-theme",e),localStorage.setItem("theme",e)}O.addEventListener("click",C);class u{constructor(){this.axios=$.create({baseURL:"https://api.themoviedb.org/3",headers:{accept:"application/json",Authorization:`Bearer ${{}.VITE_API_KEY}`,Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZhNTk0Y2Q2ZWRlZDUxZGFlZTA0ODU0NjY1MjdkYiIsIm5iZiI6MTcyMjAzNzc3Mi41NzIxMDMsInN1YiI6IjY2YTE3MjQ1ZTE1OTc2ZWJmYWI4YmYzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G9xrsM-y8LQuvYrOh8SZI1olRXGF_yNK39ZipUP4QbY"}})}async _fetch(t,s={}){try{return(await this.axios.get(t,{params:s})).data}catch(n){throw console.error(`Failed to fetch ${t}: ${n.message}`),n}}async getTrendingMovies(t){if(!["day","week"].includes(t))throw new Error("Invalid time_window. Must be 'day' or 'week'");return(await this._fetch(`/trending/movie/${t}`)).results}async getUpcomingMovies(){return(await this._fetch("/movie/upcoming")).results}async searchMovie(t,s=1){return(await this._fetch("/search/movie",{query:t,page:s})).results}async getMovieDetails(t){return await this._fetch(`/movie/${t}`)}async getMovieVideos(t){return(await this._fetch(`/movie/${t}/videos`)).results}async getMovieGenres(){return(await this._fetch("/genre/movie/list")).genres}async getCountriesList(){return await this._fetch("/configuration/countries")}}new u;window.addEventListener("scroll",_(function(){const e=document.getElementById("scrollUpBtn");window.scrollY>50?e.style.display="block":e.style.display="none"},100));document.getElementById("scrollUpBtn").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});class w{constructor(t){this.localStorageKey=t,this.movies=JSON.parse(localStorage.getItem(this.localStorageKey))||[]}_saveData(){try{localStorage.setItem(this.localStorageKey,JSON.stringify(this.movies))}catch(t){console.error("Error saving data:",t)}}addMovie(t){this.movies.findIndex(n=>n.id===t.id)===-1?(this.movies.push(t),this._saveData()):console.log("Movie already added:",t)}removeMovie(t){const s=this.movies.findIndex(n=>n.id===t);s!==-1?(this.movies.splice(s,1),this._saveData()):console.log("Movie not found")}getMovies(){return this.movies}}new w("local-movies");const m=document.querySelector(".backdrop"),D=document.querySelector(".modal-btn-open");function N(e){m.classList.remove("is-closed"),Y(e)}function b(){m.classList.add("is-closed"),m.innerHTML=""}async function Y(e){const t=new u,s=new w("myLibrary"),n=document.querySelector(".backdrop");try{const{title:o,poster_path:a,vote_average:c,vote_count:f,popularity:v,genres:T,overview:y}=await t.getMovieDetails(e),g=T.map(d=>d.name).join(" ");n.innerHTML=`
      <div class="modal-window">
        <button class="modal-btn-close" type="button">
          <svg class="modal-btn-close-icon" width="10.5" height="10.5" fill="#ffffff">
            <use href="../img/icons.svg#icon-close"></use>
          </svg>
        </button>
        <img class="modal-film-poster" src="https://image.tmdb.org/t/p/w500${a}" alt="${o} poster"/>
        <div class="modal-film-infos">
          <h3 class="modal-film-title">${o}</h3>
          <table class="modal-film-stats">
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Vote / Votes</th>
              <td class="modal-film-tab-data">
                <span class="modal-window-accent-vote">${c.toFixed(1)}</span>
                <span class="modal-window-accent-votes">${f}</span>
              </td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Popularity</th>
              <td class="modal-film-tab-data">${v}</td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Genre</th>
              <td class="modal-film-tab-data">${g}</td>
            </tr>
          </table>
          <h3 class="modal-film-desc-about">About</h3>
          <p class="modal-film-desc">${y}</p>
          <button id="library-actions-btn" type="submit">Add to my library</button>
        </div>
      </div>
    `,document.querySelector(".modal-btn-close").addEventListener("click",b),document.addEventListener("keydown",function(d){d.key==="Escape"&&b()}),document.getElementById("library-actions-btn").addEventListener("click",()=>{s.addMovie({id:e,title:o,poster_path:a,vote_average:c,vote_count:f,popularity:v,genreNames:g,overview:y})})}catch(o){console.error("Error fetching movie details:",o)}}D.addEventListener("click",()=>N(573435));const A=document.getElementById("our-team-btn"),r=document.querySelector(".team"),M=document.querySelector(".team-close-btn"),E=document.querySelector("body");A.addEventListener("click",q);function q(e){e.preventDefault(),r.classList.remove("is-closed"),document.body.classList.add("modal-open"),Z()}function k(e){e.preventDefault(),e.code==="Escape"&&h()}function I(e){e.target.closest(".team-window")||h()}function B(e){e.preventDefault(),h()}function Z(){document.addEventListener("keydown",k),r.addEventListener("click",I),M.addEventListener("click",B),E.style.overflow="hidden"}function h(){document.removeEventListener("keydown",k),r.removeEventListener("click",I),M.removeEventListener("click",B),r.classList.add("is-closed"),document.body.classList.remove("modal-open"),E.style.overflow="auto"}const J=new u,U=e=>{const t=document.getElementById("hero-section"),s=document.querySelector(".hero-text-cont");s.innerHTML=`
    <h2 class="title">${e.title}</h2>
    <div class="star-rating">
      ${j(e.vote_average)}
    </div>
    <p class="desc">${e.overview}</p>
    <div class="hero-btn">
      <button class="watch-btn" onclick="watchTrailer(${e.id})">Watch trailer</button> 
      <button class="details-btn" onclick="showDetails(${e.id})">More details</button>
    </div>
  `;const n=`https://image.tmdb.org/t/p/original${e.backdrop_path}`;t.style.backgroundImage=`linear-gradient(270deg, rgba(89, 130, 252, 0) 5%, rgba(0, 0, 0, 1) 65%), url(${n})`,t.style.backgroundPosition="center"},j=e=>{const t=Math.round(e/2);let s="";for(let n=0;n<5;n++)n<t?s+='<img src="./img/star.svg" alt="star">':s+='<img src="./img/star-outline.svg" alt="star-outline">';return s},z=async()=>{try{const e=await J.getTrendingMovies("day");if(e.length>0){const t=e[Math.floor(Math.random()*e.length)];U(t)}else L()}catch(e){console.error("Failed to load trending movies:",e),L()}},L=()=>{const e=document.getElementById("hero-section"),t=document.getElementById("text-cont");e.classList.add("hero-default"),t.classList.remove("hero-text-cont"),t.classList.add("default-text-cont");const s=document.querySelector(".default-text-cont");s.innerHTML=`
    <h2 class="title-default">Let’s Make Your Own Cinema</h2>
    <p class="desc-default">Is a guide to creating a personalized movie theater experience. 
    You'll need a projector, screen, and speakers. 
    Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button class="get-started-btn" onclick="location.href='/catalog.html'">Get started</button>
  `};document.addEventListener("DOMContentLoaded",z);const G=document.querySelectorAll(".header-nav-list"),H=document.querySelectorAll(".mobile-nav-list"),x=window.location.href;G.forEach(e=>{e.href===x?e.classList.add("active"):e.classList.remove("active")});H.forEach(e=>{e.href===x?e.classList.add("active"):e.classList.remove("active")});const S=document.getElementById("menu-btn"),l=document.getElementById("mobile-menu-modal"),i=document.getElementById("mobile-menu-backdrop");S.addEventListener("click",function(){l.classList.add("open"),i.style.display="block"});i.addEventListener("click",function(e){e.target===i&&(l.classList.remove("open"),i.style.display="none")});document.addEventListener("click",function(e){!l.contains(e.target)&&e.target!==S&&(l.classList.remove("open"),i.style.display="none")});export{w as L,u as T,N as o};
//# sourceMappingURL=main-3aed7bac.js.map
