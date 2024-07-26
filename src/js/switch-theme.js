const switcher = document.querySelector('.theme-switcher');
const body = document.body;

function switchTheme() {
  const currentTheme = body.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  body.setAttribute('data-theme', newTheme);

  // Save the user's preference
  localStorage.setItem('theme', newTheme);
}

switcher.addEventListener('click', switchTheme);

// Apply the saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);
});
