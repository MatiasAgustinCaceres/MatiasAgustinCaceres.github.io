document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.landing-section');
  let isScrolling = false;
  let scrollTimeout;

  function setActiveLink(id) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  // Al hacer clic en el menú, marcamos inmediatamente el enlace activo
  // y bloqueamos temporalmente los detectores automáticos durante el desplazamiento.
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      isScrolling = true;
      const targetId = link.getAttribute('href').substring(1);
      setActiveLink(targetId);

      clearTimeout(scrollTimeout);
      // Reactiva el observer automático después de que termine el scroll (800ms)
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 800);
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -40% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    if (isScrolling) return; // Si estamos desplazándonos por un clic, ignorar

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        setActiveLink(id);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Detección del final absoluto de la página
  window.addEventListener('scroll', () => {
    if (isScrolling) return;

    const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 15;
    if (isAtBottom) {
      setActiveLink('contact');
    }
  });
});