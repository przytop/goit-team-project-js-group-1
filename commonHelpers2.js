import{T as M,o as F,L as x}from"./assets/main-a9b30514.js";import{i as u}from"./assets/vendor-aedd9b60.js";document.addEventListener("DOMContentLoaded",async function(){const e=document.getElementById("weekly-cards"),t=new M,n={"Science Fiction":"Sci-Fi"},s=document.querySelector(".backdrop");function r(){s.classList.remove("is-visible"),s.classList.add("is-closed")}s.addEventListener("click",a=>{a.target===s&&r()});try{let l=function(){const v=window.innerWidth;let d=2;v<=600&&(d=1),e.innerHTML="",a.slice(0,3).forEach(async i=>{const o=document.createElement("div");o.classList.add("card");const $=i.id,E=`https://image.tmdb.org/t/p/w500${i.poster_path}`,S=i.title,I=i.release_date?new Date(i.release_date).getFullYear():"Unknown",y=Math.round(i.vote_average*10)/10,A=await t.getMovieGenres(),C=i.genre_ids.slice(0,d).map(p=>{const g=A.find(T=>T.id===p),c=g?g.name:"Unknown";return n[c]||c}).join(", "),_=5,f=Math.floor(y/2),b=y%2>=1?1:0,B=_-f-b,D=[...Array(f).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(b).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(B).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("");o.style.backgroundImage=`url(${E})`,o.style.backgroundSize="cover",o.style.backgroundPosition="center",o.dataset.id=$,o.innerHTML=`
          <div class="card-content">
            <h2>${S}</h2>
            <p>${C} | ${I} <span class="stars">${D}</span></p>
          </div>
        `,document.querySelectorAll(".card").forEach(p=>{p.addEventListener("click",g=>{const c=g.target.getAttribute("data-id");c&&F(c)})}),e.appendChild(o)})};const a=await t.getTrendingMovies("week");l(),window.addEventListener("resize",l)}catch(a){console.error("Error fetching data:",a)}});const w=new M,m=new x("myLibrary");async function U(){try{const e=await w.getUpcomingMovies(),t=new Date,n=e.filter(s=>{const r=new Date(s.release_date);return r.getFullYear()===t.getFullYear()&&r.getMonth()===t.getMonth()});if(n.length===0)h("No upcoming movies this month.");else{const s=n[Math.floor(Math.random()*n.length)];O(s)}}catch(e){console.error("Failed to fetch upcoming movies:",e),h("Failed to fetch upcoming movies. Please try again later")}}function h(e){u.info({title:"Info",message:e})}function O(e){const t=document.getElementById("movie-container"),n=`https://image.tmdb.org/t/p/original/${e.backdrop_path}`,s=new Date(e.release_date).toLocaleDateString(),r=e.genre_ids.map(d=>k[d]).join(", "),a=e.popularity.toFixed(1),l=`
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
            <p class="detail-item">Popularity:<span class="popularity-value">${a}</span></p>
            <div class="genre-p"><p class="genre-item">Genre:<div class="genre-div"><span class="genre">${r}</span></div></p>
            </div></div>
          </div>
        <p class="about">ABOUT</p>
        <p class="overview">${e.overview}</p>
        <button id="library-btn" data-id="${e.id}">Add to my library</button>
      </div>
    </div>
  `;t.innerHTML=l,document.getElementById("library-btn").addEventListener("click",()=>z(e)),L(e.id)}function z(e){const t=e.id;m.getMovies().some(s=>s.id===t)?(m.removeMovie(t),u.info({title:"Info",message:"Removed from my library",backgroundColor:"red",messageSize:"13",closeOnEscape:"true",closeOnClick:"true"})):(m.addMovie(e),u.success({title:"Success",message:"Added to my library",backgroundColor:"orange",messageSize:"13",closeOnEscape:"true",closeOnClick:"true"})),L(t)}function L(e){const t=m.getMovies().some(s=>s.id===e),n=document.getElementById("library-btn");t?n.textContent="Remove from my library":n.textContent="Add to my library"}const k={};w.getMovieGenres().then(e=>{e.forEach(t=>{k[t.id]=t.name}),U()});
//# sourceMappingURL=commonHelpers2.js.map
