import{o as g}from"./assets/main-a7de3839.js";import"./assets/vendor-aedd9b60.js";const m=document.querySelector(".my-library-movie-list"),u=document.querySelector(".my-library-sorry"),r=document.querySelector(".my-library-main-section .my-library-button"),p=document.querySelector(".my-library-main-section"),c=document.querySelector("#genre");let n=0;const b=9;function v(e){const t=document.createElement("li");t.classList.add("my-library-movie-list-item");const s=e.genre_ids.join(", "),i=e.id;t.dataset.id=i;const o=`https://image.tmdb.org/t/p/w500${e.poster_path}`;return t.style.backgroundImage=`url(${o})`,t.style.backgroundSize="cover",t.style.backgroundPosition="center",t.innerHTML=`
        <div class="my-library-gradient"></div>
        <div class="my-library-movie">
          <span class="my-library-movie-title">${e.title}</span>
          <span class="my-library-movie-genres">${s} | ${e.release_date}</span>
        </div>
    `,document.querySelectorAll(".my-library-movie-list-item").forEach(l=>{l.addEventListener("click",a=>{const d=a.target.getAttribute("data-id");d&&g(d)})}),t}function y(e="",t=!0){const s=JSON.parse(localStorage.getItem("myLibrary"))||[],i=e?s.filter(o=>o.genre.toLowerCase().includes(e.toLowerCase())):s;t&&(n=0,m.innerHTML=""),i.length>0?(p.style.display="block",u.style.display="none",i.slice(n,n+b).forEach(l=>{const a=v(l);m.appendChild(a)}),n+=b,n>=i.length?r.style.display="none":r.style.display="block"):(u.style.display="block",p.style.display="none",r.style.display="none")}r.addEventListener("click",function(){y(c.value,!1)});c.addEventListener("change",function(){const e=c.value;y(e)});y();
//# sourceMappingURL=commonHelpers3.js.map
