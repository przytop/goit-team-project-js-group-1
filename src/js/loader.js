const loader = document.querySelector('.loader');

showLoader();
gallery.innerHTML = '';

function showLoader() {
  loader.classList.add('active');
}

function hideLoader() {
  loader.classList.remove('active');
}
