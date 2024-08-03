import{a as G,t as z}from"./vendor-f9df95ff.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const W=document.querySelector(".theme-switcher"),M=document.documentElement;function R(){const e=M.getAttribute("data-theme")==="dark"?"light":"dark";M.setAttribute("data-theme",e),localStorage.setItem("theme",e)}W.addEventListener("click",R);class m{constructor(){this.axios=G.create({baseURL:"https://api.themoviedb.org/3",headers:{accept:"application/json",Authorization:`Bearer ${{}.VITE_API_KEY}`,Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZhNTk0Y2Q2ZWRlZDUxZGFlZTA0ODU0NjY1MjdkYiIsIm5iZiI6MTcyMjAzNzc3Mi41NzIxMDMsInN1YiI6IjY2YTE3MjQ1ZTE1OTc2ZWJmYWI4YmYzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G9xrsM-y8LQuvYrOh8SZI1olRXGF_yNK39ZipUP4QbY"}})}async _fetch(t,s={}){try{return(await this.axios.get(t,{params:s})).data}catch(o){throw console.error(`Failed to fetch ${t}: ${o.message}`),o}}async getTrendingMovies(t){if(!["day","week"].includes(t))throw new Error("Invalid time_window. Must be 'day' or 'week'");return(await this._fetch(`/trending/movie/${t}`)).results}async getUpcomingMovies(){return(await this._fetch("/movie/upcoming")).results}async searchMovie(t,s=1){return(await this._fetch("/search/movie",{query:t,page:s})).results}async getMovieDetails(t,s){const o=await this._fetch(`/movie/${t}`);if(!o[s])throw new Error(`Not found ${s} for ID ${t}`);return o[s]}async getMovieVideos(t){return(await this._fetch(`/movie/${t}/videos`)).results}async getMovieGenres(){return(await this._fetch("/genre/movie/list")).genres}async getCountriesList(){return await this._fetch("/configuration/countries")}}new m;document.addEventListener("DOMContentLoaded",async function(){const e=document.getElementById("weekly-cards"),t=new m,s={"Science Fiction":"Sci-Fi"},o=document.querySelector(".backdrop"),n=o.querySelector(".modal-window"),i=n.querySelector(".modal-btn-close");function a(){n.innerHTML=`
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
    `,o.classList.remove("is-closed"),o.classList.add("is-visible")}function u(){o.classList.remove("is-visible"),o.classList.add("is-closed")}i.addEventListener("click",u),o.addEventListener("click",l=>{l.target===o&&u()});try{let h=function(){const O=window.innerWidth;let g=2;O<=600&&(g=1),e.innerHTML="",l.slice(0,3).forEach(async c=>{const r=document.createElement("div");r.classList.add("card");const T=`https://image.tmdb.org/t/p/w500${c.poster_path}`,N=c.title,_=c.release_date?new Date(c.release_date).getFullYear():"Unknown",v=Math.round(c.vote_average*10)/10,U=await t.getMovieGenres(),Y=c.genre_ids.slice(0,g).map(P=>{const w=U.find(j=>j.id===P),E=w?w.name:"Unknown";return s[E]||E}).join(", "),J=5,b=Math.floor(v/2),L=v%2>=1?1:0,F=J-b-L,Z=[...Array(b).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(L).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(F).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("");r.style.backgroundImage=`url(${T})`,r.style.backgroundSize="cover",r.style.backgroundPosition="center",r.innerHTML=`
          <div class="card-content">
            <h2>${N}</h2>
            <p>${Y} | ${_} <span class="stars">${Z}</span></p>
          </div>
        `,r.addEventListener("click",a),e.appendChild(r)})};const l=await t.getTrendingMovies("week");h(),window.addEventListener("resize",h)}catch(l){console.error("Error fetching data:",l)}});window.addEventListener("scroll",z(function(){const e=document.getElementById("scrollUpBtn");window.scrollY>50?e.style.display="block":e.style.display="none"},100));document.getElementById("scrollUpBtn").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});class Q{constructor(t){this.localStorageKey=t,this.movies=JSON.parse(localStorage.getItem(this.localStorageKey))||[]}_saveData(){try{localStorage.setItem(this.localStorageKey,JSON.stringify(this.movies))}catch(t){console.error("Error saving data:",t)}}addMovie(t){this.movies.findIndex(o=>o.id===t.id)===-1?(this.movies.push(t),this._saveData()):console.log("Movie already added:",t)}removeMovie(t){const s=this.movies.findIndex(o=>o.id===t);s!==-1?(this.movies.splice(s,1),this._saveData()):console.log("Movie not found")}getMovies(){return this.movies}}new Q("local-movies");document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".modal-btn-open"),t=document.querySelector(".modal-btn-close"),s=document.querySelector(".backdrop");e&&t&&s?(e.addEventListener("click",()=>{s.classList.remove("is-closed")}),t.addEventListener("click",()=>{s.classList.add("is-closed")}),document.addEventListener("keydown",function(o){o.key==="Escape"&&s.classList.add("is-closed")})):console.error("One or more elements are missing. Check the selectors and the HTML structure.")});const V=document.getElementById("our-team-btn"),p=document.querySelector(".team"),S=document.querySelector(".team-close-btn"),I=document.querySelector("body");V.addEventListener("click",H);function H(e){e.preventDefault(),p.classList.remove("is-hidden"),document.body.classList.add("modal-open"),K()}function B(e){e.preventDefault(),e.code==="Escape"&&y()}function q(e){e.target.closest(".team-window")||y()}function $(e){e.preventDefault(),y()}function K(){document.addEventListener("keydown",B),p.addEventListener("click",q),S.addEventListener("click",$),I.style.overflow="hidden"}function y(){document.removeEventListener("keydown",B),p.removeEventListener("click",q),S.removeEventListener("click",$),p.classList.add("is-hidden"),document.body.classList.remove("modal-open"),I.style.overflow="auto"}new m;const A=new m;async function X(){try{const e=await A.getUpcomingMovies(),t=new Date,s=e.filter(o=>{const n=new Date(o.release_date);return n.getFullYear()===t.getFullYear()&&n.getMonth()===t.getMonth()});if(s.length===0)k("No upcoming movies this month.");else{const o=s[Math.floor(Math.random()*s.length)];ee(o)}}catch(e){console.error("Failed to fetch upcoming movies:",e),k("Failed to fetch upcoming movies. Please try again later")}}function k(e){const t=document.getElementById("movie-container");t.innerHTML=`<p>${e}</p>`}function ee(e){const t=document.getElementById("movie-container"),s=`https://image.tmdb.org/t/p/original/${e.backdrop_path}`,o=new Date(e.release_date).toLocaleDateString(),n=e.genre_ids.map(u=>x[u]).join(", "),i=`
    <div class="upcoming-container" >
      <div class="upcoming-img">
        <img class="upcoming-img" src="${s}" alt="${e.title}"></div>
        <div class="movie-details">
            <h2 class="movie-title">${e.title}</h2>
            <p class="detail-item">Release date: <span class="relase-date">${o}</span></p>
            <p class="detail-item">Vote / Votes: <span class="vote-count">${e.vote_count}</span></p>
            <p class="detail-item">Popularity: <span class="popularity-value">${e.popularity}</span></p>
            <p class="genres-item">Genre: <span class="genres">${n}</span></p>
            <p class="about">ABOUT</p>
            <p class="overview">${e.overview}</p>
            <button  id="library-btn" data-id="${e.id}">Add to my library</button>
        </div>
    </div>
    `;t.innerHTML=i,document.getElementById("library-btn").addEventListener("click",()=>te(e.id))}function te(e){const t=JSON.parse(localStorage.getItem("myLibrary"))||[],s=t.indexOf(e);s>-1?(t.splice(s,1),alert("Removed from my library")):(t.push(e),alert("Added to my library")),localStorage.setItem("myLibrary",JSON.stringify(t)),se(e)}function se(e){const t=JSON.parse(localStorage.getItem("myLibrary"))||[],s=document.getElementById("library-btn");t.includes(e)?s.textContent="Remove from my library":s.textContent="Add to my library"}const x={};A.getMovieGenres().then(e=>{e.forEach(t=>{x[t.id]=t.name}),X()});const oe=new m;ne("week");const ne=oe.getTrendingMovies("week").then(e=>(console.log(e),e));document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".input-text"),t=document.querySelector(".catalog-sorry-message"),s=document.querySelectorAll(".catalog-movie-list-item");t.style.display="none",e.addEventListener("input",function(){const o=e.value.toLowerCase();let n=!1;s.forEach(i=>{i.querySelector(".catalog-movie-title").textContent.toLowerCase().includes(o)?(i.style.display="",n=!0):i.style.display="none"}),n?t.style.display="none":t.style.display="block"})});const ie=document.querySelectorAll(".header-nav-list"),ae=document.querySelectorAll(".mobile-nav-list"),C=window.location.href;ie.forEach(e=>{e.href===C?e.classList.add("active"):e.classList.remove("active")});ae.forEach(e=>{e.href===C?e.classList.add("active"):e.classList.remove("active")});const D=document.getElementById("menu-btn"),f=document.getElementById("mobile-menu-modal"),d=document.getElementById("mobile-menu-backdrop");D.addEventListener("click",function(){f.classList.add("open"),d.style.display="block"});d.addEventListener("click",function(e){e.target===d&&(f.classList.remove("open"),d.style.display="none")});document.addEventListener("click",function(e){!f.contains(e.target)&&e.target!==D&&(f.classList.remove("open"),d.style.display="none")});
//# sourceMappingURL=main-914e2734.js.map
