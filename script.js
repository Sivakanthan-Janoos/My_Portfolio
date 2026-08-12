  // ---- nav scroll state ----
  const navEl = document.getElementById('nav');
  const onScroll = () => {
    navEl.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // ---- mobile menu ----
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const toggleMenu = (open) => {
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggleMenu(!mobileMenu.classList.contains('open')));
  document.querySelectorAll('[data-nav-mobile]').forEach(a => {
    a.addEventListener('click', () => toggleMenu(false));
  });

  // ---- scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold:0.12, rootMargin:'0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));

  // ---- active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#nav-links a[data-nav]');
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = document.querySelector(`#nav-links a[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting){
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin:'-45% 0px -50% 0px', threshold:0 });
  sections.forEach(s => navObs.observe(s));

  // ---- animated counters ----
  const counters = document.querySelectorAll('.counter');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const dur = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countObs.unobserve(el);
    });
  }, { threshold:0.4 });
  counters.forEach(c => countObs.observe(c));

  // ---- animated skill progress bars ----
  const skillBars = document.querySelectorAll('.skill-bar-item');
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const item = entry.target;
      const target = parseInt(item.dataset.progress, 10);
      const fill = item.querySelector('.skill-bar-fill');
      const pctEl = item.querySelector('.skill-bar-pct');
      const dur = 1400;
      const start = performance.now();

      requestAnimationFrame(() => { fill.style.width = target + '%'; });

      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        pctEl.textContent = Math.round(eased * target) + '%';
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);

      setTimeout(() => item.classList.add('filled'), 40);
      barObs.unobserve(item);
    });
  }, { threshold:0.4 });
  skillBars.forEach(b => barObs.observe(b));

  // ---- portrait tag typewriter ----
  const twEl = document.getElementById('typewriter');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (twEl && !reduceMotion){
    const lines = [
      ' software_engineer.dev',
      ' const role = "Full-Stack Dev";',
      ' while (learning) { grow(); }',
      ' git commit -m "build ideas"'
    ];
    let li = 0, ci = 0, deleting = false;
    const tick = () => {
      const full = lines[li];
      if (!deleting){
        ci++;
        twEl.textContent = full.slice(0, ci);
        if (ci === full.length){ deleting = true; setTimeout(tick, 1500); return; }
      } else {
        ci--;
        twEl.textContent = full.slice(0, ci);
        if (ci === 0){ deleting = false; li = (li + 1) % lines.length; }
      }
      setTimeout(tick, deleting ? 30 : 55);
    };
    tick();
  } else if (twEl){
    twEl.textContent = ' software_engineer.dev';
  }
