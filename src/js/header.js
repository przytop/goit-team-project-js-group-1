const navLinks = document.querySelectorAll('.header-nav-list');
const mobNavLinks = document.querySelectorAll('.mobile-nav-list');
const currentUrl = window.location.href;

navLinks.forEach(link => {
  if (link.href === currentUrl) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

mobNavLinks.forEach(link => {
  if (link.href === currentUrl) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

const menuButton = document.getElementById('menu-btn');
const modal = document.getElementById('mobile-menu-modal');
const backdrop = document.getElementById('mobile-menu-backdrop');

menuButton.addEventListener('click', function () {
  modal.classList.add('open');
  backdrop.style.display = 'block';
});

backdrop.addEventListener('click', function (event) {
  if (event.target === backdrop) {
    modal.classList.remove('open');
    backdrop.style.display = 'none';
  }
});

document.addEventListener('click', function (event) {
  if (!modal.contains(event.target) && event.target !== menuButton) {
    modal.classList.remove('open');
    backdrop.style.display = 'none';
  }
});
