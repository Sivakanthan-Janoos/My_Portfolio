// Header scroll state
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive:true });

  // Mobile menu
  const hamburger = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }));

  // Active nav link on scroll
  const sections = document.querySelectorAll('main section[id]');
  const navA = document.querySelectorAll('.navlinks a');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));

  // Scroll reveal
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Typing effect in hero terminal
  (function typeLine(){
    const el = document.getElementById('typedLine');
    if (!el) return;
    const text = "./run.sh --mission";
    if (reduceMotion) { el.textContent = text; return; }
    let i = 0;
    function tick(){
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(tick, 55);
      }
    }
    setTimeout(tick, 700);
  })();

  // mailto contact form fallback (keeps it simple/no backend)
  document.getElementById('contactForm').addEventListener('submit', function(e){
    // Native mailto submission via action attribute; nothing else to do.
  });
