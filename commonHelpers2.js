import{T as b,o as C,L as F}from"./assets/main-6f9b04ed.js";import"./assets/vendor-4a88922e.js";document.addEventListener("DOMContentLoaded",async function(){const e=document.getElementById("weekly-cards"),t=new b,s={"Science Fiction":"Sci-Fi"},n=document.querySelector(".backdrop");function r(){n.classList.remove("is-visible"),n.classList.add("is-closed")}n.addEventListener("click",a=>{a.target===n&&r()});try{let g=function(){const m=window.innerWidth;let v=2;m<=600&&(v=1),e.innerHTML="",a.slice(0,3).forEach(async i=>{const o=document.createElement("div");o.classList.add("card");const $=i.id,k=`https://image.tmdb.org/t/p/w500${i.poster_path}`,E=i.title,A=i.release_date?new Date(i.release_date).getFullYear():"Unknown",u=Math.round(i.vote_average*10)/10,I=await t.getMovieGenres(),S=i.genre_ids.slice(0,v).map(p=>{const l=I.find(T=>T.id===p),c=l?l.name:"Unknown";return s[c]||c}).join(", "),_=5,y=Math.floor(u/2),f=u%2>=1?1:0,B=_-y-f,D=[...Array(y).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(f).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(B).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("");o.style.backgroundImage=`url(${k})`,o.style.backgroundSize="cover",o.style.backgroundPosition="center",o.dataset.id=$,o.innerHTML=`
          <div class="card-content">
            <h2>${E}</h2>
            <p>${S} | ${A} <span class="stars">${D}</span></p>
          </div>
        `,document.querySelectorAll(".card").forEach(p=>{p.addEventListener("click",l=>{const c=l.target.getAttribute("data-id");c&&C(c)})}),e.appendChild(o)})};const a=await t.getTrendingMovies("week");g(),window.addEventListener("resize",g)}catch(a){console.error("Error fetching data:",a)}});const M=new b,d=new F("myLibrary");async function U(){try{const e=await M.getUpcomingMovies(),t=new Date,s=e.filter(n=>{const r=new Date(n.release_date);return r.getFullYear()===t.getFullYear()&&r.getMonth()===t.getMonth()});if(s.length===0)h("No upcoming movies this month.");else{const n=s[Math.floor(Math.random()*s.length)];x(n)}}catch(e){console.error("Failed to fetch upcoming movies:",e),h("Failed to fetch upcoming movies. Please try again later")}}function h(e){const t=document.getElementById("movie-container");t.innerHTML=`<p>${e}</p>`}function x(e){const t=document.getElementById("movie-container"),s=`https://image.tmdb.org/t/p/original/${e.backdrop_path}`,n=new Date(e.release_date).toLocaleDateString(),r=e.genre_ids.map(m=>w[m]).join(", "),a=`
    <div class="upcoming-container">
      <div class="upcoming-img">
        <img class="upcoming-img" src="${s}" alt="${e.title}">
      </div>
      <div class="movie-details">
        <h2 class="movie-title">${e.title}</h2>
          <div class="info-item">
            <div class="">
            <p class="detail-item">Release date:<span class="relase-date">${n}</span></p>
            <p class="detail-item">Vote / Votes:<span class="vote-count">${e.vote_average} / ${e.vote_count}</span></p>
            </div>
            <div  class="">
            <p class="detail-item">Popularity:<span class="popularity-value">${e.popularity}</span></p>
            <div class="genre-p"><p class="genre-item">Genre:<div class="genre-div"><span class="genre">${r}</span></div></p>
            </div></div>
          </div>
        <p class="about">ABOUT</p>
        <p class="overview">${e.overview}</p>
        <button id="library-btn" data-id="${e.id}">Add to my library</button>
      </div>
    </div>
  `;t.innerHTML=a,document.getElementById("library-btn").addEventListener("click",()=>G(e)),L(e.id)}function G(e){const t=e.id;d.getMovies().some(n=>n.id===t)?(d.removeMovie(t),alert("Removed from my library")):(d.addMovie(e),alert("Added to my library")),L(t)}function L(e){const t=d.getMovies().some(n=>n.id===e),s=document.getElementById("library-btn");t?s.textContent="Remove from my library":s.textContent="Add to my library"}const w={};M.getMovieGenres().then(e=>{e.forEach(t=>{w[t.id]=t.name}),U()});
//# sourceMappingURL=commonHelpers2.js.map
