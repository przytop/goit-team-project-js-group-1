import"./assets/main-0dae7c59.js";import"./assets/vendor-f9df95ff.js";const n=document.querySelector(".my-library-movie-list"),o=document.querySelector(".my-library-sorry"),y=document.querySelector(".my-library-main-section .my-library-button"),l=document.querySelector(".my-library-main-section"),a=document.querySelector("#genre");function m(e){const t=document.createElement("li");return t.classList.add("my-library-movie-list-item"),t.innerHTML=`
      <a href="#">
        <img src="https://image.tmdb.org/t/p/w500${e.poster_path}" class="my-library-movie-picture" />
        <div class="my-library-gradient"></div>
        <div class="my-library-movie">
          <span class="my-library-movie-title">${e.title}</span>
          <span class="my-library-movie-genres">${e.genre_ids} | ${e.release_date}</span>
        </div>
      </a>
    `,t}function i(e=""){n.innerHTML="";const t=JSON.parse(localStorage.getItem("myLibrary"))||[],s=e?t.filter(r=>r.genre.toLowerCase().includes(e.toLowerCase())):t;s.length>0?(l.style.display="block",o.style.display="none",s.forEach(r=>{const c=m(r);n.appendChild(c)})):(o.style.display="block",l.style.display="none")}y.addEventListener("click",function(){i()});a.addEventListener("change",function(){const e=a.value;i(e)});i();
//# sourceMappingURL=commonHelpers3.js.map
