import{o as v,T as h}from"./assets/main-b2f42c1d.js";import"./assets/vendor-11c217db.js";const p=document.querySelector(".my-library-movie-list"),b=document.querySelector(".my-library-sorry"),d=document.querySelector(".my-library-main-section .my-library-button"),f=document.querySelector(".my-library-main-section"),i=document.querySelector("#genre"),c=document.querySelector("#my-library-button-search");let a=0;const g=9,y=new Map;async function S(){try{(await new h().getMovieGenres()).forEach(t=>{t.id&&t.name&&y.set(t.id,t.name)}),L()}catch(e){console.error("Error fetching genres:",e)}}function L(){if(!i.querySelector('option[value=""]')){const e=document.createElement("option");e.value="",e.textContent="Genre",e.disabled=!0,e.selected=!0,i.appendChild(e)}y.forEach((e,n)=>{const t=document.createElement("option");t.value=e.toLowerCase(),t.textContent=e,i.appendChild(t)})}function k(e){const n=document.createElement("li");n.classList.add("my-library-movie-list-item");const t=(e.genre_ids||[]).map(s=>y.get(s)||"Unknown").join(", "),l=e.id,o=new Date(e.release_date).getFullYear();n.dataset.id=l;const r=`https://image.tmdb.org/t/p/w500${e.poster_path}`;return n.style.backgroundImage=`url(${r})`,n.style.backgroundSize="cover",n.style.backgroundPosition="center",n.innerHTML=`
    <div class="my-library-gradient"></div>
    <div class="my-library-movie">
      <span class="my-library-movie-title">${e.title}</span>
      <span class="my-library-movie-genres">${t} | ${o}</span>
    </div>
  `,n}function m(e="",n=!0){const t=JSON.parse(localStorage.getItem("myLibrary"))||[];n&&(a=0);const l=e?t.filter(o=>(o.genre_ids||[]).some(s=>y.get(s).toLowerCase()===e.toLowerCase())):t;n&&(p.innerHTML=""),l.length>0?(f.style.display="block",b.style.display="none",document.querySelector(".genre-form").style.display="block",l.slice(a,a+g).forEach(r=>{const s=k(r);p.appendChild(s)}),a+=g,a>=l.length?d.style.display="none":d.style.display="block",c.style.display="none",c.disabled=!0):(b.style.display="block",f.style.display="none",document.querySelector(".genre-form").style.display="none",d.style.display="none",c.style.display="block",c.disabled=!1),document.querySelectorAll(".my-library-movie-list-item").forEach(o=>{o.addEventListener("click",r=>{const u=r.currentTarget.dataset.id;u&&v(u)})})}d.addEventListener("click",function(){m(i.value,!1)});i.addEventListener("change",function(){const e=i.value;m(e)});async function E(){await S(),m()}E();
//# sourceMappingURL=commonHelpers3.js.map
