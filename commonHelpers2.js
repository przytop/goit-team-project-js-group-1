import{T as M,o as F,L as x}from"./assets/main-2e368aae.js";import{i as m}from"./assets/vendor-aedd9b60.js";document.addEventListener("DOMContentLoaded",async function(){const e=document.getElementById("weekly-cards"),t=new M,n={"Science Fiction":"Sci-Fi"},s=document.querySelector(".backdrop");function r(){s.classList.remove("is-visible"),s.classList.add("is-closed")}s.addEventListener("click",o=>{o.target===s&&r()});try{const o=await t.getTrendingMovies("week");async function c(){const p=window.innerWidth;let l=2;p<=600&&(l=1),e.innerHTML="";for(const a of o.slice(0,3)){const i=document.createElement("div");i.classList.add("card");const d=a.id,$=`https://image.tmdb.org/t/p/w500${a.poster_path}`,E=a.title,S=a.release_date?new Date(a.release_date).getFullYear():"Unknown",u=Math.round(a.vote_average*10)/10,I=await t.getMovieGenres(),A=a.genre_ids.slice(0,l).map(D=>{const f=I.find(T=>T.id===D),b=f?f.name:"Unknown";return n[b]||b}).join(", "),C=5,v=Math.floor(u/2),y=u%2>=1?1:0,_=C-v-y,B=[...Array(v).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(y).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(_).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("");i.style.backgroundImage=`url(${$})`,i.style.backgroundSize="cover",i.style.backgroundPosition="center",i.dataset.id=d,i.innerHTML=`
          <div class="card-content">
            <h2>${E}</h2>
            <p>${A} | ${S} <span class="stars">${B}</span></p>
          </div>
        `,e.appendChild(i)}document.querySelectorAll(".card").forEach(a=>{a.addEventListener("click",i=>{const d=a.getAttribute("data-id");d&&F(d)})})}c(),window.addEventListener("resize",c)}catch(o){console.error("Error fetching data:",o)}});const w=new M,g=new x("myLibrary");async function U(){try{const e=await w.getUpcomingMovies(),t=new Date,n=e.filter(s=>{const r=new Date(s.release_date);return r.getFullYear()===t.getFullYear()&&r.getMonth()===t.getMonth()});if(n.length===0)h("No upcoming movies this month.");else{const s=n[Math.floor(Math.random()*n.length)];O(s)}}catch(e){console.error("Failed to fetch upcoming movies:",e),h("Failed to fetch upcoming movies. Please try again later")}}function h(e){m.info({title:"Info",message:e})}function O(e){const t=document.getElementById("movie-container"),n=`https://image.tmdb.org/t/p/original/${e.backdrop_path}`,s=new Date(e.release_date).toLocaleDateString(),r=e.genre_ids.map(l=>k[l]).join(", "),o=e.popularity.toFixed(1),c=`
    <div class="upcoming-container">
      <div class="upcoming-img">
        <img class="upcoming-img" src="${n}" alt="${e.title}">
      </div>
      <div class="movie-details">
        <h2 class="movie-title">${e.title}</h2>
          <div class="info-item">
            <div class="">
            <p class="detail-item">Release date:<span class="relase-date">${s}</span></p>
            <p class="detail-item">Vote / Votes:<span class="vote-count">${e.vote_average} / ${e.vote_count}</span></p>
            </div>
            <div  class="">
            <p class="detail-item">Popularity:<span class="popularity-value">${o}</span></p>
            <div class="genre-p"><p class="genre-item">Genre:<div class="genre-div"><span class="genre">${r}</span></div></p>
            </div></div>
          </div>
        <p class="about">ABOUT</p>
        <p class="overview">${e.overview}</p>
        <button id="library-btn" data-id="${e.id}">Add to my library</button>
      </div>
    </div>
  `;t.innerHTML=c,document.getElementById("library-btn").addEventListener("click",()=>z(e)),L(e.id)}function z(e){const t=e.id;g.getMovies().some(s=>s.id===t)?(g.removeMovie(t),m.info({title:"Info",message:"Removed from my library",backgroundColor:"red",messageSize:"13",closeOnEscape:"true",closeOnClick:"true"})):(g.addMovie(e),m.success({title:"Success",message:"Added to my library",backgroundColor:"orange",messageSize:"13",closeOnEscape:"true",closeOnClick:"true"})),L(t)}function L(e){const t=g.getMovies().some(s=>s.id===e),n=document.getElementById("library-btn");t?n.textContent="Remove from my library":n.textContent="Add to my library"}const k={};w.getMovieGenres().then(e=>{e.forEach(t=>{k[t.id]=t.name}),U()});
//# sourceMappingURL=commonHelpers2.js.map
