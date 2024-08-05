import{a as w,t as E}from"./vendor-f9df95ff.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=o(n);fetch(n.href,r)}})();const k=document.querySelector(".theme-switcher"),u=document.documentElement;function M(){const e=u.getAttribute("data-theme")==="dark"?"light":"dark";u.setAttribute("data-theme",e),localStorage.setItem("theme",e)}k.addEventListener("click",M);class h{constructor(){this.axios=w.create({baseURL:"https://api.themoviedb.org/3",headers:{accept:"application/json",Authorization:`Bearer ${{}.VITE_API_KEY}`,Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZhNTk0Y2Q2ZWRlZDUxZGFlZTA0ODU0NjY1MjdkYiIsIm5iZiI6MTcyMjAzNzc3Mi41NzIxMDMsInN1YiI6IjY2YTE3MjQ1ZTE1OTc2ZWJmYWI4YmYzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.G9xrsM-y8LQuvYrOh8SZI1olRXGF_yNK39ZipUP4QbY"}})}async _fetch(t,o={}){try{return(await this.axios.get(t,{params:o})).data}catch(s){throw console.error(`Failed to fetch ${t}: ${s.message}`),s}}async getTrendingMovies(t){if(!["day","week"].includes(t))throw new Error("Invalid time_window. Must be 'day' or 'week'");return(await this._fetch(`/trending/movie/${t}`)).results}async getUpcomingMovies(){return(await this._fetch("/movie/upcoming")).results}async searchMovie(t,o=1){return(await this._fetch("/search/movie",{query:t,page:o})).results}async getMovieDetails(t){return await this._fetch(`/movie/${t}`)}async getMovieVideos(t){return(await this._fetch(`/movie/${t}/videos`)).results}async getMovieGenres(){return(await this._fetch("/genre/movie/list")).genres}async getCountriesList(){return await this._fetch("/configuration/countries")}}new h;window.addEventListener("scroll",E(function(){const e=document.getElementById("scrollUpBtn");window.scrollY>50?e.style.display="block":e.style.display="none"},100));document.getElementById("scrollUpBtn").addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"})});class I{constructor(t){this.localStorageKey=t,this.movies=JSON.parse(localStorage.getItem(this.localStorageKey))||[]}_saveData(){try{localStorage.setItem(this.localStorageKey,JSON.stringify(this.movies))}catch(t){console.error("Error saving data:",t)}}addMovie(t){this.movies.findIndex(s=>s.id===t.id)===-1?(this.movies.push(t),this._saveData()):console.log("Movie already added:",t)}removeMovie(t){const o=this.movies.findIndex(s=>s.id===t);o!==-1?(this.movies.splice(o,1),this._saveData()):console.log("Movie not found")}getMovies(){return this.movies}}new I("local-movies");document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".modal-btn-open"),t=document.querySelector(".modal-btn-close"),o=document.querySelector(".backdrop");e&&t&&o?(e.addEventListener("click",()=>{o.classList.remove("is-closed")}),t.addEventListener("click",()=>{o.classList.add("is-closed")}),document.addEventListener("keydown",function(s){s.key==="Escape"&&o.classList.add("is-closed")})):console.error("One or more elements are missing. Check the selectors and the HTML structure.")});const x=document.getElementById("our-team-btn"),i=document.querySelector(".team"),f=document.querySelector(".team-close-btn"),v=document.querySelector("body");x.addEventListener("click",S);function S(e){e.preventDefault(),i.classList.remove("is-hidden"),document.body.classList.add("modal-open"),B()}function y(e){e.preventDefault(),e.code==="Escape"&&d()}function g(e){e.target.closest(".team-window")||d()}function p(e){e.preventDefault(),d()}function B(){document.addEventListener("keydown",y),i.addEventListener("click",g),f.addEventListener("click",p),v.style.overflow="hidden"}function d(){document.removeEventListener("keydown",y),i.removeEventListener("click",g),f.removeEventListener("click",p),i.classList.add("is-hidden"),document.body.classList.remove("modal-open"),v.style.overflow="auto"}const T=new h,O=e=>{const t=document.getElementById("hero-section"),o=document.querySelector(".hero-text-cont");o.innerHTML=`
    <h2 class="title">${e.title}</h2>
    <div class="star-rating">
      ${C(e.vote_average)}
    </div>
    <p class="desc">${e.overview}</p>
    <div class="hero-btn">
      <button class="watch-btn" onclick="watchTrailer(${e.id})">Watch trailer</button> 
      <button class="details-btn" onclick="showDetails(${e.id})">More details</button>
    </div>
  `;const s=`https://image.tmdb.org/t/p/w500${e.backdrop_path}`;t.style.backgroundImage=`linear-gradient(270deg, rgba(89, 130, 252, 0) 5%, rgba(0, 0, 0, 1) 65%), url(${s})`,t.style.backgroundPosition="center"},C=e=>{const t=Math.round(e/2);let o="";for(let s=0;s<5;s++)s<t?o+='<img src="./img/star.svg" alt="star">':o+='<img src="./img/star-outline.svg" alt="star-outline">';return o},_=async()=>{try{const e=await T.getTrendingMovies("day");if(e.length>0){const t=e[Math.floor(Math.random()*e.length)];O(t)}else m()}catch(e){console.error("Failed to load trending movies:",e),m()}},m=()=>{const e=document.getElementById("hero-section"),t=document.getElementById("text-cont");e.classList.add("hero-default"),t.classList.remove("hero-text-cont"),t.classList.add("default-text-cont");const o=document.querySelector(".default-text-cont");o.innerHTML=`
    <h2 class="title-default">Let’s Make Your Own Cinema</h2>
    <p class="desc-default">Is a guide to creating a personalized movie theater experience. 
    You'll need a projector, screen, and speakers. 
    Decorate your space, choose your films, and stock up on snacks for the full experience.</p>
    <button class="get-started-btn" onclick="location.href='/catalog.html'">Get started</button>
  `};document.addEventListener("DOMContentLoaded",_);const D=document.querySelectorAll(".header-nav-list"),Y=document.querySelectorAll(".mobile-nav-list"),L=window.location.href;D.forEach(e=>{e.href===L?e.classList.add("active"):e.classList.remove("active")});Y.forEach(e=>{e.href===L?e.classList.add("active"):e.classList.remove("active")});const b=document.getElementById("menu-btn"),a=document.getElementById("mobile-menu-modal"),c=document.getElementById("mobile-menu-backdrop");b.addEventListener("click",function(){a.classList.add("open"),c.style.display="block"});c.addEventListener("click",function(e){e.target===c&&(a.classList.remove("open"),c.style.display="none")});document.addEventListener("click",function(e){!a.contains(e.target)&&e.target!==b&&(a.classList.remove("open"),c.style.display="none")});export{I as L,h as T};
//# sourceMappingURL=main-a72fe81b.js.map
