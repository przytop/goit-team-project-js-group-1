import{T}from"./assets/main-42c2b2fd.js";import"./assets/vendor-f9df95ff.js";document.addEventListener("DOMContentLoaded",async function(){const o=document.querySelector(".catalog-movie-list"),i=new T,p={"Science Fiction":"Sci-Fi"},t=document.querySelector(".backdrop"),f=t.querySelector(".modal-window");function b(){f.innerHTML=`
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
  `,t.classList.remove("is-closed"),t.classList.add("is-visible")}function g(){t.classList.remove("is-visible"),t.classList.add("is-closed")}t.addEventListener("click",s=>{s.target===t&&g()});try{let n=function(){const h=window.innerWidth;let l=2;h<=600&&(l=1),o.innerHTML="",s.slice(0,9).forEach(async a=>{const e=document.createElement("div");e.classList.add("card");const v=`https://image.tmdb.org/t/p/w500${a.poster_path}`,y=a.title,w=a.release_date?new Date(a.release_date).getFullYear():"Unknown",r=Math.round(a.vote_average*10)/10,L=await i.getMovieGenres(),S=a.genre_ids.slice(0,l).map(A=>{const m=L.find(E=>E.id===A),u=m?m.name:"Unknown";return p[u]||u}).join(", "),q=5,c=Math.floor(r/2),d=r%2>=1?1:0,k=q-c-d,M=[...Array(c).fill('<svg class="star full"><use xlink:href="#icon-star"></use></svg>'),...Array(d).fill('<svg class="star half"><use xlink:href="#icon-star-half"></use></svg>'),...Array(k).fill('<svg class="star empty"><use xlink:href="#icon-star-outline"></use></svg>')].join("");e.style.backgroundImage=`url(${v})`,e.style.backgroundSize="cover",e.style.backgroundPosition="center",e.innerHTML=`
        <div class="card-content">
          <h2>${y}</h2>
          <p>${S} | ${w} <span class="stars">${M}</span></p>
        </div>
      `,e.addEventListener("click",b),o.appendChild(e)})};const s=await i.getTrendingMovies("day");n(),window.addEventListener("resize",n)}catch(s){console.error("Error fetching data:",s)}});document.addEventListener("DOMContentLoaded",function(){document.querySelector(".input-text");const o=document.querySelector(".catalog-sorry-message");document.querySelectorAll(".catalog-movie-list-item"),o.style.display="none"});
//# sourceMappingURL=commonHelpers.js.map
