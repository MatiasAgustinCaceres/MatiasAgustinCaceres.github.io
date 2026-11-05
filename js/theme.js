document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const html = document.documentElement;

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    
    // Al cambiar dinámicamente de tema, refresca Lucide para asegurarse de renderizar los iconos correctamente si fuese necesario
    if (window.lucide) {
      lucide.createIcons();
    }
  });
});