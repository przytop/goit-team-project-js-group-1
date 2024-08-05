import{a as R,t as V}from"./vendor-f9df95ff.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(a){if(a.ep)return;a.ep=!0;const n=o(a);fetch(a.href,n)}})();const Q=document.querySelector(".theme-switcher"),_=document.documentElement;function K(){const e=_.getAttribute("data-theme")==="dark"?"light":"dark";_.setAttribute("data-theme",e),localStorage.setItem("theme",e)}Q.addEventListener("click",K);class b{constructor(){this.axios=R.create({baseURL:"https://api.themoviedb.org/3",headers:{accept:"application/json",Authorization:`Bearer ${{}.VITE_API_KEY}`,Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZhNTk0Y2Q2ZWRlZDUxZGFlZTA0ODU0NjY1MjdkYiIsIm5iZiI6MTcyMjAzNzc3Mi41NzIxMDMsInN1YiI6IjY2YTE3MjQ1ZTE1OTc2ZWJmYWI4YmYzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G9xrsM-y8LQuvYrOh8SZI1olRXGF_yNK39ZipUP4QbY"}})}async _fetch(t,o={}){try{return(await this.axios.get(t,{params:o})).data}catch(s){throw console.error(`Failed to fetch ${t}: ${s.message}`),s}}async getTrendingMovies(t){if(!["day","week"].includes(t))throw new Error("Invalid time_window. Must be 'day' or 'week'");return(await this._fetch(`/trending/movie/${t}`)).results}async getUpcomingMovies(){return(await this._fetch("/movie/upcoming")).results}async searchMovie(t,o=1){return(await this._fetch("/search/movie",{query:t,page:o})).results}async getMovieDetails(t){return await this._fetch(`/movie/${t}`)}async getMovieVideos(t){return(await this._fetch(`/movie/${t}/videos`)).results}async getMovieGenres(){return(await this._fetch("/genre/movie/list")).genres}async getCountriesList(){return await this._fetch("/configuration/countries")}}new b;document.addEventListener("DOMContentLoaded",async function(){const e=document.getElementById("weekly-cards"),t=new b,o={"Science Fiction":"Sci-Fi"},s=document.querySelector(".backdrop"),a=s.querySelector(".modal-window"),n=a.querySelector(".modal-btn-close");function l(){a.innerHTML=`
      <button class="modal-btn-close" type="button">
        <svg class="modal-btn-close-icon" width="10.5" height="10.5" fill="#ffffff">
          <use href=""></use>
        </svg>
      </button>

      <img class="modal-film-poster" src="https://via.placeholder.com/248x315" alt="Film Poster">

      <div class="modal-film-infos">
          <h3 class="modal-film-title">Sample Film Title</h3>
          <table class="modal-film-stats">
              <tr class="modal-film-tab-row">
                  <th class="modal-film-tab-header">Vote / Votes</th>
                  <td class="modal-film-tab-data">
                      <span class="modal-window-accent-vote">8.5</span>
                      /
                      <span class="modal-window-accent-votes">2000</span></td>
              </tr>
              <tr class="modal-film-tab-row">
                  <th class="modal-film-tab-header">Popularity</th>
                  <td class="modal-film-tab-data">89.2</td>
              </tr>
              <tr class="modal-film-tab-row">
                  <th class="modal-film-tab-header">Genre</th>
                  <td class="modal-film-tab-data">Action, Drama</td>
              </tr>
          </table>

          <h3 class="modal-film-desc-about">About</h3>
          <p class="modal-film-desc">Sample description  ~~ Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo commodi
                iure eius repellendus perspiciatis. Ducimus sit temporibus provident architecto! Adipisci labore
                accusantium maiores, laborum voluptates odit illum odio nam id. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Rem fugiat ea, eos provident, illo veritatis quos id laborum a, enim ullam. Provident
                atque id quam, aspernatur nemo necessitatibus saepe consequatur. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Consequuntur asperiores cumque, debitis atque ab maiores beatae voluptatum aperiam
                error nulla? Nostrum aperiam magni aut magnam ipsam maiores quaerat placeat omnis</p>
          <button id="library-actions-btn" type="submit">Add to my library</button>
      </div>
    `,s.classList.remove("is-closed"),s.classList.add("is-visible")}function d(){s.classList.remove("is-visible"),s.classList.add("is-closed")}n.addEventListener("click",d),s.addEventListener("click",c=>{c.target===s&&d()});try{let m=function(){const k=window.innerWidth;let u=2;k<=600&&(u=1),e.innerHTML="",c.slice(0,3).forEach(async r=>{const i=document.createElement("div");i.classList.add("card");const E=`https://image.tmdb.org/t/p/w500${r.poster_path}`,S=r.title,I=r.release_date?new Date(r.release_date).getFullYear():"Unknown",p=Math.round(r.vote_average*10)/10,q=await t.getMovieGenres(),$=r.genre_ids.slice(0,u).map(B=>{const f=q.find(A=>A.id===B),v=f?f.name:"Unknown";return o[v]||v}).join(", "),x=5,g=Math.floor(p/2),h=p%2>=1?1:0,T=x-g-h,C=[...Array(g).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(h).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(T).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("");i.style.backgroundImage=`url(${E})`,i.style.backgroundSize="cover",i.style.backgroundPosition="center",i.innerHTML=`
          <div class="card-content">
            <h2>${S}</h2>
            <p>${$} | ${I} <span class="stars">${C}</span></p>
          </div>
        `,i.addEventListener("click",l),e.appendChild(i)})};const c=await t.getTrendingMovies("week");m(),window.addEventListener("resize",m)}catch(c){console.error("Error fetching data:",c)}});window.addEventListener("scroll",V(function(){const e=document.getElementById("scrollUpBtn");window.scrollY>50?e.style.display="block":e.style.display="none"},100));document.getElementById("scrollUpBtn").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});class U{constructor(t){this.localStorageKey=t,this.movies=JSON.parse(localStorage.getItem(this.localStorageKey))||[]}_saveData(){try{localStorage.setItem(this.localStorageKey,JSON.stringify(this.movies))}catch(t){console.error("Error saving data:",t)}}addMovie(t){this.movies.findIndex(s=>s.id===t.id)===-1?(this.movies.push(t),this._saveData()):console.log("Movie already added:",t)}removeMovie(t){const o=this.movies.findIndex(s=>s.id===t);o!==-1?(this.movies.splice(o,1),this._saveData()):console.log("Movie not found")}getMovies(){return this.movies}}new U("local-movies");document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".modal-btn-open"),t=document.querySelector(".modal-btn-close"),o=document.querySelector(".backdrop");e&&t&&o?(e.addEventListener("click",()=>{o.classList.remove("is-closed")}),t.addEventListener("click",()=>{o.classList.add("is-closed")}),document.addEventListener("keydown",function(s){s.key==="Escape"&&o.classList.add("is-closed")})):console.error("One or more elements are missing. Check the selectors and the HTML structure.")});const X=document.getElementById("our-team-btn"),w=document.querySelector(".team"),F=document.querySelector(".team-close-btn"),Y=document.querySelector("body");X.addEventListener("click",ee);function ee(e){e.preventDefault(),w.classList.remove("is-hidden"),document.body.classList.add("modal-open"),te()}function P(e){e.preventDefault(),e.code==="Escape"&&D()}function G(e){e.target.closest(".team-window")||D()}function H(e){e.preventDefault(),D()}function te(){document.addEventListener("keydown",P),w.addEventListener("click",G),F.addEventListener("click",H),Y.style.overflow="hidden"}function D(){document.removeEventListener("keydown",P),w.removeEventListener("click",G),F.removeEventListener("click",H),w.classList.add("is-hidden"),document.body.classList.remove("modal-open"),Y.style.overflow="auto"}const se=new b,oe=e=>{const t=document.getElementById("hero-section"),o=document.querySelector(".hero-text-cont");o.innerHTML=`
    <h2 class="title">${e.title}</h2>
    <div class="star-rating">
      ${ae(e.vote_average)}
    </div>
    <p class="desc">${e.overview}</p>
    <div class="hero-btn">
      <button class="watch-btn" onclick="watchTrailer(${e.id})">Watch trailer</button> 
      <button class="details-btn" onclick="showDetails(${e.id})">More details</button>
    </div>
  `;const s=`https://image.tmdb.org/t/p/w500${e.backdrop_path}`;t.style.backgroundImage=`linear-gradient(270deg, rgba(89, 130, 252, 0) 5%, rgba(0, 0, 0, 1) 65%), url(${s})`,t.style.backgroundPosition="center"},ae=e=>{const t=Math.round(e/2);let o="";for(let s=0;s<5;s++)s<t?o+='<img src="./img/star.svg" alt="star">':o+='<img src="./img/star-outline.svg" alt="star-outline">';return o},ne=async()=>{try{const e=await se.getTrendingMovies("day");if(e.length>0){const t=e[Math.floor(Math.random()*e.length)];oe(t)}else O()}catch(e){console.error("Failed to load trending movies:",e),O()}},O=()=>{const e=document.getElementById("hero-section"),t=document.getElementById("text-cont");e.classList.add("hero-default"),t.classList.remove("hero-text-cont"),t.classList.add("default-text-cont");const o=document.querySelector(".default-text-cont");o.innerHTML=`
    <h2 class="title-default">Let’s Make Your Own Cinema</h2>
    <p class="desc-default">Is a guide to creating a personalized movie theater experience. 
    You'll need a projector, screen, and speakers. 
    Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button class="get-started-btn" onclick="location.href='/catalog.html'">Get started</button>
  `};document.addEventListener("DOMContentLoaded",ne);const j=new b,L=new U("myLibrary");async function ie(){try{const e=await j.getUpcomingMovies(),t=new Date,o=e.filter(s=>{const a=new Date(s.release_date);return a.getFullYear()===t.getFullYear()&&a.getMonth()===t.getMonth()});if(o.length===0)N("No upcoming movies this month.");else{const s=o[Math.floor(Math.random()*o.length)];re(s)}}catch(e){console.error("Failed to fetch upcoming movies:",e),N("Failed to fetch upcoming movies. Please try again later")}}function N(e){const t=document.getElementById("movie-container");t.innerHTML=`<p>${e}</p>`}function re(e){const t=document.getElementById("movie-container"),o=`https://image.tmdb.org/t/p/original/${e.backdrop_path}`,s=new Date(e.release_date).toLocaleDateString(),a=e.genre_ids.map(d=>z[d]).join(", "),n=`
    <div class="upcoming-container">
      <div class="upcoming-img">
        <img class="upcoming-img" src="${o}" alt="${e.title}">
      </div>
      <div class="movie-details">
        <h2 class="movie-title">${e.title}</h2>
          <div class="info-item">
            <div class="">
            <p class="detail-item">Release date:<span class="relase-date">${s}</span></p>
            <p class="detail-item">Vote / Votes:<span class="vote-count">${e.vote_count}</span></p>
            </div>
            <div  class="">
            <p class="detail-item">Popularity:<span class="popularity-value">${e.popularity}</span></p>
            <div class="genre-p"><p class="genre-item">Genre:<div class="genre-div"><span class="genre">${a}</span></div></p>
            </div></div>
          </div>
        <p class="about">ABOUT</p>
        <p class="overview">${e.overview}</p>
        <button id="library-btn" data-id="${e.id}">Add to my library</button>
      </div>
    </div>
  `;t.innerHTML=n,document.getElementById("library-btn").addEventListener("click",()=>ce(e)),W(e.id)}function ce(e){const t=e.id;L.getMovies().some(s=>s.id===t)?(L.removeMovie(t),alert("Removed from my library")):(L.addMovie(e),alert("Added to my library")),W(t)}function W(e){const t=L.getMovies().some(s=>s.id===e),o=document.getElementById("library-btn");t?o.textContent="Remove from my library":o.textContent="Add to my library"}const z={};j.getMovieGenres().then(e=>{e.forEach(t=>{z[t.id]=t.name}),ie()});document.addEventListener("DOMContentLoaded",async function(){const e=document.querySelector(".catalog-movie-list"),t=new b,o={"Science Fiction":"Sci-Fi"},s=document.querySelector(".backdrop"),a=s.querySelector(".modal-window"),n=a.querySelector(".modal-btn-close");function l(){a.innerHTML=`
    <button class="modal-btn-close" type="button">
      <svg class="modal-btn-close-icon" width="10.5" height="10.5" fill="#ffffff">
        <use href=""></use>
      </svg>
    </button>

    <img class="modal-film-poster" src="https://via.placeholder.com/248x315" alt="Film Poster">

    <div class="modal-film-infos">
        <h3 class="modal-film-title">Sample Film Title</h3>
        <table class="modal-film-stats">
            <tr class="modal-film-tab-row">
                <th class="modal-film-tab-header">Vote / Votes</th>
                <td class="modal-film-tab-data">
                    <span class="modal-window-accent-vote">8.5</span>
                    /
                    <span class="modal-window-accent-votes">2000</span></td>
            </tr>
            <tr class="modal-film-tab-row">
                <th class="modal-film-tab-header">Popularity</th>
                <td class="modal-film-tab-data">89.2</td>
            </tr>
            <tr class="modal-film-tab-row">
                <th class="modal-film-tab-header">Genre</th>
                <td class="modal-film-tab-data">Action, Drama</td>
            </tr>
        </table>

        <h3 class="modal-film-desc-about">About</h3>
        <p class="modal-film-desc">Sample description  ~~ Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo commodi
              iure eius repellendus perspiciatis. Ducimus sit temporibus provident architecto! Adipisci labore
              accusantium maiores, laborum voluptates odit illum odio nam id. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Rem fugiat ea, eos provident, illo veritatis quos id laborum a, enim ullam. Provident
              atque id quam, aspernatur nemo necessitatibus saepe consequatur. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Consequuntur asperiores cumque, debitis atque ab maiores beatae voluptatum aperiam
              error nulla? Nostrum aperiam magni aut magnam ipsam maiores quaerat placeat omnis</p>
        <button id="library-actions-btn" type="submit">Add to my library</button>
    </div>
  `,s.classList.remove("is-closed"),s.classList.add("is-visible")}function d(){s.classList.remove("is-visible"),s.classList.add("is-closed")}n.addEventListener("click",d),s.addEventListener("click",c=>{c.target===s&&d()});try{let m=function(){const k=window.innerWidth;let u=2;k<=600&&(u=1),e.innerHTML="",c.slice(0,9).forEach(async r=>{const i=document.createElement("div");i.classList.add("card");const E=`https://image.tmdb.org/t/p/w500${r.poster_path}`,S=r.title,I=r.release_date?new Date(r.release_date).getFullYear():"Unknown",p=Math.round(r.vote_average*10)/10,q=await t.getMovieGenres(),$=r.genre_ids.slice(0,u).map(B=>{const f=q.find(A=>A.id===B),v=f?f.name:"Unknown";return o[v]||v}).join(", "),x=5,g=Math.floor(p/2),h=p%2>=1?1:0,T=x-g-h,C=[...Array(g).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(h).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(T).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("");i.style.backgroundImage=`url(${E})`,i.style.backgroundSize="cover",i.style.backgroundPosition="center",i.innerHTML=`
        <div class="card-content">
          <h2>${S}</h2>
          <p>${$} | ${I} <span class="stars">${C}</span></p>
        </div>
      `,i.addEventListener("click",l),e.appendChild(i)})};const c=await t.getTrendingMovies("day");m(),window.addEventListener("resize",m)}catch(c){console.error("Error fetching data:",c)}});tmdb.getTrendingMovies("week").then(e=>(console.log(e),e));document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".input-text"),t=document.querySelector(".catalog-sorry-message"),o=document.querySelectorAll(".catalog-movie-list-item");t.style.display="none",e.addEventListener("input",function(){const s=e.value.toLowerCase();let a=!1;o.forEach(n=>{n.querySelector(".catalog-movie-title").textContent.toLowerCase().includes(s)?(n.style.display="",a=!0):n.style.display="none"}),a?t.style.display="none":t.style.display="block"})});const le=document.querySelectorAll(".header-nav-list"),de=document.querySelectorAll(".mobile-nav-list"),Z=window.location.href;le.forEach(e=>{e.href===Z?e.classList.add("active"):e.classList.remove("active")});de.forEach(e=>{e.href===Z?e.classList.add("active"):e.classList.remove("active")});const J=document.getElementById("menu-btn"),M=document.getElementById("mobile-menu-modal"),y=document.getElementById("mobile-menu-backdrop");J.addEventListener("click",function(){M.classList.add("open"),y.style.display="block"});y.addEventListener("click",function(e){e.target===y&&(M.classList.remove("open"),y.style.display="none")});document.addEventListener("click",function(e){!M.contains(e.target)&&e.target!==J&&(M.classList.remove("open"),y.style.display="none")});
//# sourceMappingURL=main-df4d5f4f.js.map
