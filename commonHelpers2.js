import{T as y,L as C}from"./assets/main-0dae7c59.js";import"./assets/vendor-f9df95ff.js";document.addEventListener("DOMContentLoaded",async function(){const e=document.getElementById("weekly-cards"),t=new y,s={"Science Fiction":"Sci-Fi"},a=document.querySelector(".backdrop"),n=a.querySelector(".modal-window");function c(){n.innerHTML=`
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
    `,a.classList.remove("is-closed"),a.classList.add("is-visible")}function d(){a.classList.remove("is-visible"),a.classList.add("is-closed")}a.addEventListener("click",i=>{i.target===a&&d()});try{let m=function(){const $=window.innerWidth;let u=2;$<=600&&(u=1),e.innerHTML="",i.slice(0,3).forEach(async r=>{const o=document.createElement("div");o.classList.add("card");const k=`https://image.tmdb.org/t/p/w500${r.poster_path}`,E=r.title,A=r.release_date?new Date(r.release_date).getFullYear():"Unknown",p=Math.round(r.vote_average*10)/10,S=await t.getMovieGenres(),D=r.genre_ids.slice(0,u).map(B=>{const b=S.find(I=>I.id===B),f=b?b.name:"Unknown";return s[f]||f}).join(", "),T=5,g=Math.floor(p/2),v=p%2>=1?1:0,_=T-g-v,q=[...Array(g).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(v).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(_).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("");o.style.backgroundImage=`url(${k})`,o.style.backgroundSize="cover",o.style.backgroundPosition="center",o.innerHTML=`
          <div class="card-content">
            <h2>${E}</h2>
            <p>${D} | ${A} <span class="stars">${q}</span></p>
          </div>
        `,o.addEventListener("click",c),e.appendChild(o)})};const i=await t.getTrendingMovies("week");m(),window.addEventListener("resize",m)}catch(i){console.error("Error fetching data:",i)}});const w=new y,l=new C("myLibrary");async function F(){try{const e=await w.getUpcomingMovies(),t=new Date,s=e.filter(a=>{const n=new Date(a.release_date);return n.getFullYear()===t.getFullYear()&&n.getMonth()===t.getMonth()});if(s.length===0)h("No upcoming movies this month.");else{const a=s[Math.floor(Math.random()*s.length)];x(a)}}catch(e){console.error("Failed to fetch upcoming movies:",e),h("Failed to fetch upcoming movies. Please try again later")}}function h(e){const t=document.getElementById("movie-container");t.innerHTML=`<p>${e}</p>`}function x(e){const t=document.getElementById("movie-container"),s=`https://image.tmdb.org/t/p/original/${e.backdrop_path}`,a=new Date(e.release_date).toLocaleDateString(),n=e.genre_ids.map(i=>L[i]).join(", "),c=`
    <div class="upcoming-container">
      <div class="upcoming-img">
        <img class="upcoming-img" src="${s}" alt="${e.title}">
      </div>
      <div class="movie-details">
        <h2 class="movie-title">${e.title}</h2>
          <div class="info-item">
            <div class="">
            <p class="detail-item">Release date:<span class="relase-date">${a}</span></p>
            <p class="detail-item">Vote / Votes:<span class="vote-count">${e.vote_average} / ${e.vote_count}</span></p>
            </div>
            <div  class="">
            <p class="detail-item">Popularity:<span class="popularity-value">${e.popularity}</span></p>
            <div class="genre-p"><p class="genre-item">Genre:<div class="genre-div"><span class="genre">${n}</span></div></p>
            </div></div>
          </div>
        <p class="about">ABOUT</p>
        <p class="overview">${e.overview}</p>
        <button id="library-btn" data-id="${e.id}">Add to my library</button>
      </div>
    </div>
  `;t.innerHTML=c,document.getElementById("library-btn").addEventListener("click",()=>U(e)),M(e.id)}function U(e){const t=e.id;l.getMovies().some(a=>a.id===t)?(l.removeMovie(t),alert("Removed from my library")):(l.addMovie(e),alert("Added to my library")),M(t)}function M(e){const t=l.getMovies().some(a=>a.id===e),s=document.getElementById("library-btn");t?s.textContent="Remove from my library":s.textContent="Add to my library"}const L={};w.getMovieGenres().then(e=>{e.forEach(t=>{L[t.id]=t.name}),F()});
//# sourceMappingURL=commonHelpers2.js.map
