import throttle from 'lodash.throttle';

window.addEventListener(
  'scroll',
  throttle(function () {
    const scrollUpBtn = document.getElementById('scrollUpBtn');
    if (window.scrollY > 50) {
      scrollUpBtn.style.display = 'block';
    } else {
      scrollUpBtn.style.display = 'none';
    }
  }, 100)
);

document.getElementById('scrollUpBtn').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
