import"./assets/main-6f9b04ed.js";import"./assets/vendor-4a88922e.js";const c=document.querySelector(".my-library-movie-list"),y=document.querySelector(".my-library-sorry"),r=document.querySelector(".my-library-main-section .my-library-button"),m=document.querySelector(".my-library-main-section"),l=document.querySelector("#genre");let i=0;const d=9;function b(e){const t=document.createElement("li");t.classList.add("my-library-movie-list-item");const s=e.genre_ids.join(", ");return t.innerHTML=`
      <a href="#">
        <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" class="my-library-movie-picture" />
        <div class="my-library-gradient"></div>
        <div class="my-library-movie">
          <span class="my-library-movie-title">${e.title}</span>
          <span class="my-library-movie-genres">${s} | ${e.release_date}</span>
        </div>
      </a>
    `,t}function o(e="",t=!0){const s=JSON.parse(localStorage.getItem("myLibrary"))||[],n=e?s.filter(a=>a.genre.toLowerCase().includes(e.toLowerCase())):s;t&&(i=0,c.innerHTML=""),n.length>0?(m.style.display="block",y.style.display="none",n.slice(i,i+d).forEach(u=>{const p=b(u);c.appendChild(p)}),i+=d,i>=n.length?r.style.display="none":r.style.display="block"):(y.style.display="block",m.style.display="none",r.style.display="none")}r.addEventListener("click",function(){o(l.value,!1)});l.addEventListener("change",function(){const e=l.value;o(e)});o();
//# sourceMappingURL=commonHelpers3.js.map
