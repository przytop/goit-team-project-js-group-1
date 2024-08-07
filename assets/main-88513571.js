import{a as D,t as N,i as b,M as q}from"./vendor-11c217db.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();const M=document.querySelector(".theme-switcher"),w=document.documentElement;function Y(){const e=w.getAttribute("data-theme")==="dark"?"light":"dark";w.setAttribute("data-theme",e),localStorage.setItem("theme",e),M.classList.toggle("active")}M.addEventListener("click",Y);class f{constructor(){this.axios=D.create({baseURL:"https://api.themoviedb.org/3",headers:{accept:"application/json",Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZhNTk0Y2Q2ZWRlZDUxZGFlZTA0ODU0NjY1MjdkYiIsIm5iZiI6MTcyMjAzNzc3Mi41NzIxMDMsInN1YiI6IjY2YTE3MjQ1ZTE1OTc2ZWJmYWI4YmYzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G9xrsM-y8LQuvYrOh8SZI1olRXGF_yNK39ZipUP4QbY"}})}async _fetch(t,o={}){try{return(await this.axios.get(t,{params:o})).data}catch(s){throw console.error(`Failed to fetch ${t}: ${s.message}`),s}}async getTrendingMovies(t){if(!["day","week"].includes(t))throw new Error("Invalid time_window. Must be 'day' or 'week'");return(await this._fetch(`/trending/movie/${t}`)).results}async getTrendingMoviesTotal(t,o){if(!["day","week"].includes(t))throw new Error("Invalid time_window. Must be 'day' or 'week'");return await this._fetch(`/trending/movie/${t}`,{page:o})}async getUpcomingMovies(){return(await this._fetch("/movie/upcoming")).results}async searchMovie(t,o=1){return(await this._fetch("/search/movie",{query:t,page:o})).results}async searchMovieTotal(t,o=1){return await this._fetch("/search/movie",{query:t,page:o})}async getMovieDetails(t){return await this._fetch(`/movie/${t}`)}async getMovieVideos(t){return(await this._fetch(`/movie/${t}/videos`)).results}async getMovieGenres(){return(await this._fetch("/genre/movie/list")).genres}async getCountriesList(){return await this._fetch("/configuration/countries")}}new f;window.addEventListener("scroll",N(function(){const e=document.getElementById("scrollUpBtn");window.scrollY>50?e.style.display="block":e.style.display="none"},100));document.getElementById("scrollUpBtn").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});class d{constructor(t){this.localStorageKey=t,this.movies=JSON.parse(localStorage.getItem(this.localStorageKey))||[]}_saveData(){try{localStorage.setItem(this.localStorageKey,JSON.stringify(this.movies))}catch(t){console.error("Error saving data:",t)}}addMovie(t){this.movies.findIndex(s=>s.id===t.id)===-1?(this.movies.push(t),this._saveData()):console.log("Movie already added:",t)}removeMovie(t){const o=this.movies.findIndex(s=>s.id===t);o!==-1?(this.movies.splice(o,1),this._saveData()):console.log("Movie not found")}getMovies(){return this.movies}}new d("local-movies");const h=document.querySelector(".backdrop"),Z=document.querySelector(".modal-btn-open");function E(e){h.classList.remove("is-closed"),z(e)}function L(){h.classList.add("is-closed"),h.innerHTML=""}async function z(e){const t=new f;new d("myLibrary");const o=document.querySelector(".backdrop");try{const{title:s,poster_path:n,vote_average:a,vote_count:r,popularity:y,genres:g,overview:p}=await t.getMovieDetails(e),j=g.map(m=>m.name).join(" ");o.innerHTML=`
      <div class="modal-window">
        <button class="modal-btn-close" type="button">
          <svg class="modal-btn-close-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <use href="./img/icons.svg#close"></use>
          </svg>
        </button>
        <img class="modal-film-poster" src="https://image.tmdb.org/t/p/w500${n}" alt="${s} poster"/>
        <div class="modal-film-infos">
          <h3 class="modal-film-title">${s}</h3>
          <table class="modal-film-stats">
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Vote / Votes</th>
              <td class="modal-film-tab-data">
                <span class="modal-window-accent-vote">${a.toFixed(1)}</span>
                /
                <span class="modal-window-accent-votes">${r}</span>
              </td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Popularity</th>
              <td class="modal-film-tab-data">${y}</td>
            </tr>
            <tr class="modal-film-tab-row">
              <th class="modal-film-tab-header">Genre</th>
              <td class="modal-film-tab-data">${j}</td>
            </tr>
          </table>
          <h3 class="modal-film-desc-about">About</h3>
          <p class="modal-film-desc">${p}</p>
          <button id="library-actions-btn" type="submit">Dodaj do mojej biblioteki</button>
        </div>
      </div>
    `,document.querySelector(".modal-btn-close").addEventListener("click",L),document.addEventListener("keydown",function(m){m.key==="Escape"&&L()});const A=document.getElementById("library-actions-btn");I(e),A.addEventListener("click",()=>{J({id:e,title:s,poster_path:n,vote_average:a,vote_count:r,popularity:y,genres:g,overview:p})})}catch(s){console.error("Error fetching movie details:",s)}}function J(e){const t=e.id,o=new d("myLibrary");o.getMovies().some(n=>n.id===t)?(o.removeMovie(t),b.info({title:"Info",message:"Removed from my library",backgroundColor:"red",messageSize:"13",closeOnEscape:!0,closeOnClick:!0})):(o.addMovie(e),b.success({title:"Success ",message:"Added to my library",backgroundColor:"orange",messageSize:"13",closeOnEscape:!0,closeOnClick:!0})),I(t)}function I(e){const o=new d("myLibrary").getMovies().some(n=>n.id===e),s=document.getElementById("library-actions-btn");o?s.textContent="Remove from my library":s.textContent="Add to my library"}Z.addEventListener("click",()=>E(573435));const U=document.getElementById("our-team-btn"),c=document.querySelector(".team"),B=document.querySelector(".team-close-btn"),S=document.querySelector("body");U.addEventListener("click",W);function W(e){e.preventDefault(),c.classList.remove("is-closed"),document.body.classList.add("modal-open"),G()}function x(e){e.preventDefault(),e.code==="Escape"&&v()}function T(e){e.target.closest(".team-window")||v()}function O(e){e.preventDefault(),v()}function G(){document.addEventListener("keydown",x),c.addEventListener("click",T),B.addEventListener("click",O),S.style.overflow="hidden"}function v(){document.removeEventListener("keydown",x),c.removeEventListener("click",T),B.removeEventListener("click",O),c.classList.add("is-closed"),document.body.classList.remove("modal-open"),S.style.overflow="auto"}const C=new f,H=e=>{const t=document.getElementById("hero-section"),o=document.querySelector(".hero-text-cont");o.innerHTML=`
    <h2 class="title">${e.title}</h2>
    <div class="star-rating">
      ${P(e.vote_average)}
    </div>
    <p class="desc">${e.overview}</p>
    <div class="hero-btn">
      <button class="watch-btn" data-video-id="${e.id})">Watch trailer</button> 
      <button class="details-btn">More details</button>
    </div>
  `;const s=`https://image.tmdb.org/t/p/original${e.backdrop_path}`;t.style.backgroundImage=`linear-gradient(270deg, rgba(89, 130, 252, 0) 5%, rgba(0, 0, 0, 1) 70%), url(${s})`,t.style.backgroundPosition="center",document.querySelector(".watch-btn").addEventListener("click",()=>F(e.id)),document.querySelector(".details-btn").addEventListener("click",()=>E(e.id))},P=e=>{const t=Math.round(e*10)/10,o=5,s=Math.floor(t/2),n=t%2>=1?1:0,a=o-s-n;return`<span>${[...Array(s).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(n).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(a).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("")}</span>`},F=async e=>{try{const o=(await C.getMovieVideos(e)).find(s=>s.type==="Trailer");o?new q(".watch-btn",{channel:"youtube",autoplay:1,url:`https://www.youtube.com/watch?v=${o.key}`}).open():window.alert("Trailer not available")}catch(t){console.error("Failed to load movie videos:",t),R()}};let u=!1;const R=()=>{if(u)return;u=!0;const e=document.getElementById("hero-section"),t=document.createElement("div");t.className="modal-oopsie fade-in",t.id="modal-cont",e.appendChild(t);const o=document.getElementById("modal-cont");o.innerHTML=`
        <p>OOPS... <br> We are very sorry! <br> But we couldn’t find the trailer.</p>
        <img class="image-cont">
        <button id="modal-close">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 4.5L4.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.5 4.5L13.5 13.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>`,document.getElementById("modal-close").addEventListener("click",function(){u=!1,t.classList.remove("fade-in"),t.classList.add("fade-out"),setTimeout(()=>{t.remove()},300)})},Q=async()=>{try{const e=await C.getTrendingMovies("day");if(e.length>0){const t=e[Math.floor(Math.random()*e.length)];H(t)}else k()}catch(e){console.error("Failed to load trending movies:",e),k()}},k=()=>{const e=document.getElementById("hero-section"),t=document.getElementById("text-cont");e.classList.add("hero-default"),t.classList.remove("hero-text-cont"),t.classList.add("default-text-cont");const o=document.querySelector(".default-text-cont");o.innerHTML=`
    <h2 class="title-default">Let’s Make Your Own Cinema</h2>
    <p class="desc-default">Is a guide to creating a personalized movie theater experience. 
    You'll need a projector, screen, and speakers. 
    Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button class="get-started-btn" onclick="location.href='/catalog.html'">Get started</button>
  `};document.addEventListener("DOMContentLoaded",Q);const V=document.querySelectorAll(".header-nav-list"),K=document.querySelectorAll(".mobile-nav-list"),$=window.location.href;V.forEach(e=>{e.href===$?e.classList.add("active"):e.classList.remove("active")});K.forEach(e=>{e.href===$?e.classList.add("active"):e.classList.remove("active")});const _=document.getElementById("menu-btn"),l=document.getElementById("mobile-menu-modal"),i=document.getElementById("mobile-menu-backdrop");_.addEventListener("click",function(){l.classList.add("open"),i.style.display="block"});i.addEventListener("click",function(e){e.target===i&&(l.classList.remove("open"),i.style.display="none")});document.addEventListener("click",function(e){!l.contains(e.target)&&e.target!==_&&(l.classList.remove("open"),i.style.display="none")});export{d as L,f as T,E as o};
//# sourceMappingURL=main-88513571.js.map
