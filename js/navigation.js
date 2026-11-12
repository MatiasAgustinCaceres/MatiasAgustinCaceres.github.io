document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.landing-section');

  if (navLinks.length === 0 || sections.length === 0) return;

  // Función directa para iluminar únicamente el enlace que coincida con el ID
  function highlightNav(id) {
  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);

    if (isActive) {
      // Solo mueve el scroll horizontal del menú, no el de la página
      const menu = link.parentElement;
      menu.scrollTo({
        left: link.offsetLeft - menu.clientWidth / 2 + link.clientWidth / 2,
        behavior: 'smooth'
      });
    }
  });
}

  // Lógica pura de posición de scroll
  function checkScrollPosition() {
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    
    // Si estás arriba de todo, marcar "about"
    if (scrollPos < 100) {
      highlightNav('about');
      return;
    }

    // Revisar cuál sección está cruzando la línea de visión
    let activeId = 'about';
    
    sections.forEach(section => {
      // Tomamos la posición superior de cada sección menos una compensación por el navbar
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < (sectionTop + sectionHeight)) {
        activeId = section.getAttribute('id');
      }
    });

    // Si llegaste al fondo absoluto de la página, forzar "contact"
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollPos >= maxScroll - 30) {
      activeId = 'contact';
    }

    highlightNav(activeId);
  }

  // Escuchar el scroll de la ventana
  window.addEventListener('scroll', checkScrollPosition, { passive: true });

  // Ejecutar inmediatamente al cargar la página para que no arranque vacía
  checkScrollPosition();

  // Los clics SOLO hacen scroll de forma nativa (o suave), quitando el foco para que no interfieran
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Dejamos que el navegador haga su trabajo de anclaje, pero limpiamos el foco
      link.blur();
    });
  });
});