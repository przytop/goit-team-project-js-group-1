document.addEventListener("DOMContentLoaded", function() {
    const openBtn = document.querySelector(".modal-btn-open");
    const closeBtn = document.querySelector(".modal-btn-close");
    const backdrop = document.querySelector(".backdrop");

   
    if (openBtn && closeBtn && backdrop) {
        openBtn.addEventListener("click", () => {
            backdrop.classList.remove("is-closed");
        });

        closeBtn.addEventListener("click", () => {
            backdrop.classList.add("is-closed");
        });


    } else {
        console.error("One or more elements are missing. Check the selectors and the HTML structure.");
    }
});
