const themeToggle =
  document.getElementById('theme-toggle');

const savedTheme =
  localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
}

function updateThemeIcon() {

  const isDark =
    document.body.classList.contains('dark-theme');

  themeToggle.innerHTML = isDark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {

  document.body.classList.toggle('dark-theme');

  const isDark =
    document.body.classList.contains('dark-theme');

  localStorage.setItem(
    'theme',
    isDark ? 'dark' : 'light'
  );

  updateThemeIcon();
});