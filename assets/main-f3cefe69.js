import{a as H,t as z}from"./vendor-f9df95ff.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=s(n);fetch(n.href,a)}})();const W=document.querySelector(".theme-switcher"),E=document.documentElement;function R(){const e=E.getAttribute("data-theme")==="dark"?"light":"dark";E.setAttribute("data-theme",e),localStorage.setItem("theme",e)}W.addEventListener("click",R);class m{constructor(){this.axios=H.create({baseURL:"https://api.themoviedb.org/3",headers:{accept:"application/json",Authorization:`Bearer ${{}.VITE_API_KEY}`,Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZhNTk0Y2Q2ZWRlZDUxZGFlZTA0ODU0NjY1MjdkYiIsIm5iZiI6MTcyMjAzNzc3Mi41NzIxMDMsInN1YiI6IjY2YTE3MjQ1ZTE1OTc2ZWJmYWI4YmYzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G9xrsM-y8LQuvYrOh8SZI1olRXGF_yNK39ZipUP4QbY"}})}async _fetch(t,s={}){try{return(await this.axios.get(t,{params:s})).data}catch(o){throw console.error(`Failed to fetch ${t}: ${o.message}`),o}}async getTrendingMovies(t){if(!["day","week"].includes(t))throw new Error("Invalid time_window. Must be 'day' or 'week'");return(await this._fetch(`/trending/movie/${t}`)).results}async getUpcomingMovies(){return(await this._fetch("/movie/upcoming")).results}async searchMovie(t,s=1){return(await this._fetch("/search/movie",{query:t,page:s})).results}async getMovieDetails(t,s){const o=await this._fetch(`/movie/${t}`);if(!o[s])throw new Error(`Not found ${s} for ID ${t}`);return o[s]}async getMovieVideos(t){return(await this._fetch(`/movie/${t}/videos`)).results}async getMovieGenres(){return(await this._fetch("/genre/movie/list")).genres}async getCountriesList(){return await this._fetch("/configuration/countries")}}new m;document.addEventListener("DOMContentLoaded",async function(){const e=document.getElementById("weekly-cards"),t=new m,s={"Science Fiction":"Sci-Fi"},o=document.querySelector(".backdrop"),n=o.querySelector(".modal-window"),a=n.querySelector(".modal-btn-close");function i(){n.innerHTML=`
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
    `,o.classList.remove("is-closed"),o.classList.add("is-visible")}function u(){o.classList.remove("is-visible"),o.classList.add("is-closed")}a.addEventListener("click",u),o.addEventListener("click",l=>{l.target===o&&u()});try{let f=function(){const O=window.innerWidth;let y=2;O<=600&&(y=1),e.innerHTML="",l.slice(0,3).forEach(async c=>{const r=document.createElement("div");r.classList.add("card");const N=`https://image.tmdb.org/t/p/w500${c.poster_path}`,_=c.title,U=c.release_date?new Date(c.release_date).getFullYear():"Unknown",v=Math.round(c.vote_average*10)/10,Y=await t.getMovieGenres(),F=c.genre_ids.slice(0,y).map(j=>{const w=Y.find(G=>G.id===j),M=w?w.name:"Unknown";return s[M]||M}).join(", "),J=5,b=Math.floor(v/2),L=v%2>=1?1:0,P=J-b-L,Z=[...Array(b).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(L).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(P).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("");r.style.backgroundImage=`url(${N})`,r.style.backgroundSize="cover",r.style.backgroundPosition="center",r.innerHTML=`
          <div class="card-content">
            <h2>${_}</h2>
            <p>${F} | ${U} <span class="stars">${Z}</span></p>
          </div>
        `,r.addEventListener("click",i),e.appendChild(r)})};const l=await t.getTrendingMovies("week");f(),window.addEventListener("resize",f)}catch(l){console.error("Error fetching data:",l)}});window.addEventListener("scroll",z(function(){const e=document.getElementById("scrollUpBtn");window.scrollY>50?e.style.display="block":e.style.display="none"},100));document.getElementById("scrollUpBtn").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});class Q{constructor(t){this.localStorageKey=t,this.movies=JSON.parse(localStorage.getItem(this.localStorageKey))||[]}_saveData(){try{localStorage.setItem(this.localStorageKey,JSON.stringify(this.movies))}catch(t){console.error("Error saving data:",t)}}addMovie(t){this.movies.findIndex(o=>o.id===t.id)===-1?(this.movies.push(t),this._saveData()):console.log("Movie already added:",t)}removeMovie(t){const s=this.movies.findIndex(o=>o.id===t);s!==-1?(this.movies.splice(s,1),this._saveData()):console.log("Movie not found")}getMovies(){return this.movies}}new Q("local-movies");document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".modal-btn-open"),t=document.querySelector(".modal-btn-close"),s=document.querySelector(".backdrop");e&&t&&s?(e.addEventListener("click",()=>{s.classList.remove("is-closed")}),t.addEventListener("click",()=>{s.classList.add("is-closed")}),document.addEventListener("keydown",function(o){o.key==="Escape"&&s.classList.add("is-closed")})):console.error("One or more elements are missing. Check the selectors and the HTML structure.")});const V=document.getElementById("our-team-btn"),p=document.querySelector(".team"),I=document.querySelector(".team-close-btn"),x=document.querySelector("body");V.addEventListener("click",K);function K(e){e.preventDefault(),p.classList.remove("is-hidden"),document.body.classList.add("modal-open"),X()}function $(e){e.preventDefault(),e.code==="Escape"&&h()}function B(e){e.target.closest(".team-window")||h()}function T(e){e.preventDefault(),h()}function X(){document.addEventListener("keydown",$),p.addEventListener("click",B),I.addEventListener("click",T),x.style.overflow="hidden"}function h(){document.removeEventListener("keydown",$),p.removeEventListener("click",B),I.removeEventListener("click",T),p.classList.add("is-hidden"),document.body.classList.remove("modal-open"),x.style.overflow="auto"}const ee=new m,te=e=>{const t=document.getElementById("hero-section"),s=document.querySelector(".hero-text-cont");s.innerHTML=`
    <h2 class="title">${e.title}</h2>
    <div class="star-rating">
      ${se(e.vote_average)}
    </div>
    <p class="desc">${e.overview}</p>
    <div class="hero-btn">
      <button class="watch-btn" onclick="watchTrailer(${e.id})">Watch trailer</button> 
      <button class="details-btn" onclick="showDetails(${e.id})">More details</button>
    </div>
  `;const o=`https://image.tmdb.org/t/p/w500${e.backdrop_path}`;t.style.backgroundImage=`linear-gradient(270deg, rgba(89, 130, 252, 0) 5%, rgba(0, 0, 0, 1) 65%), url(${o})`,t.style.backgroundPosition="center"},se=e=>{const t=Math.round(e/2);let s="";for(let o=0;o<5;o++)o<t?s+='<img src="./img/star.svg" alt="star">':s+='<img src="./img/star-outline.svg" alt="star-outline">';return s},oe=async()=>{try{const e=await ee.getTrendingMovies("day");if(e.length>0){const t=e[Math.floor(Math.random()*e.length)];te(t)}else k()}catch(e){console.error("Failed to load trending movies:",e),k()}},k=()=>{const e=document.getElementById("hero-section"),t=document.getElementById("text-cont");e.classList.add("hero-default"),t.classList.remove("hero-text-cont"),t.classList.add("default-text-cont");const s=document.querySelector(".default-text-cont");s.innerHTML=`
    <h2 class="title-default">Let’s Make Your Own Cinema</h2>
    <p class="desc-default">Is a guide to creating a personalized movie theater experience. 
    You'll need a projector, screen, and speakers. 
    Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button class="get-started-btn" onclick="location.href='/catalog.html'">Get started</button>
  `};document.addEventListener("DOMContentLoaded",oe);const C=new m;async function ne(){try{const e=await C.getUpcomingMovies(),t=new Date,s=e.filter(o=>{const n=new Date(o.release_date);return n.getFullYear()===t.getFullYear()&&n.getMonth()===t.getMonth()});if(s.length===0)S("No upcoming movies this month.");else{const o=s[Math.floor(Math.random()*s.length)];ae(o)}}catch(e){console.error("Failed to fetch upcoming movies:",e),S("Failed to fetch upcoming movies. Please try again later")}}function S(e){const t=document.getElementById("movie-container");t.innerHTML=`<p>${e}</p>`}function ae(e){const t=document.getElementById("movie-container"),s=`https://image.tmdb.org/t/p/original/${e.backdrop_path}`,o=new Date(e.release_date).toLocaleDateString(),n=e.genre_ids.map(u=>q[u]).join(", "),a=`
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
    `;t.innerHTML=a,document.getElementById("library-btn").addEventListener("click",()=>ie(e.id))}function ie(e){const t=JSON.parse(localStorage.getItem("myLibrary"))||[],s=t.indexOf(e);s>-1?(t.splice(s,1),alert("Removed from my library")):(t.push(e),alert("Added to my library")),localStorage.setItem("myLibrary",JSON.stringify(t)),re(e)}function re(e){const t=JSON.parse(localStorage.getItem("myLibrary"))||[],s=document.getElementById("library-btn");t.includes(e)?s.textContent="Remove from my library":s.textContent="Add to my library"}const q={};C.getMovieGenres().then(e=>{e.forEach(t=>{q[t.id]=t.name}),ne()});const ce=new m;le("week");const le=ce.getTrendingMovies("week").then(e=>(console.log(e),e));document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".input-text"),t=document.querySelector(".catalog-sorry-message"),s=document.querySelectorAll(".catalog-movie-list-item");t.style.display="none",e.addEventListener("input",function(){const o=e.value.toLowerCase();let n=!1;s.forEach(a=>{a.querySelector(".catalog-movie-title").textContent.toLowerCase().includes(o)?(a.style.display="",n=!0):a.style.display="none"}),n?t.style.display="none":t.style.display="block"})});const de=document.querySelectorAll(".header-nav-list"),me=document.querySelectorAll(".mobile-nav-list"),D=window.location.href;de.forEach(e=>{e.href===D?e.classList.add("active"):e.classList.remove("active")});me.forEach(e=>{e.href===D?e.classList.add("active"):e.classList.remove("active")});const A=document.getElementById("menu-btn"),g=document.getElementById("mobile-menu-modal"),d=document.getElementById("mobile-menu-backdrop");A.addEventListener("click",function(){g.classList.add("open"),d.style.display="block"});d.addEventListener("click",function(e){e.target===d&&(g.classList.remove("open"),d.style.display="none")});document.addEventListener("click",function(e){!g.contains(e.target)&&e.target!==A&&(g.classList.remove("open"),d.style.display="none")});
//# sourceMappingURL=main-f3cefe69.js.map
