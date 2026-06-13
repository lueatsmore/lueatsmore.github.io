/* ═══════════════════════════════════════════════
   LU YOU — Personal Portfolio
   Main JavaScript
   ═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. Scroll-activated navbar ── */
  const nav = document.getElementById('site-nav');

  function updateNav() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── 2. Active nav link highlight ── */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    let current = '';
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('is-active');
      const href = link.getAttribute('href');
      if (href && href === `#${current}`) {
        link.classList.add('is-active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ── 3. Intersection Observer — reveal animations ── */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  /* ── 4. Staggered child reveals ── */
  const staggerParents = document.querySelectorAll(
    '.timeline, .work-grid, .thoughts-grid, .focus-list, .journal-grid'
  );

  if ('IntersectionObserver' in window) {
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll(
              '.timeline-item, .work-card, .thought-card, .focus-item, .journal-item'
            );
            children.forEach((child, i) => {
              child.style.transitionDelay = `${i * 0.1}s`;
              child.classList.add('reveal');
              // Trigger on next frame
              requestAnimationFrame(() => {
                setTimeout(() => child.classList.add('is-visible'), 50);
              });
            });
            staggerObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    staggerParents.forEach(el => staggerObserver.observe(el));
  }

  /* ── 5. Mobile nav burger ── */
  const burger = document.getElementById('nav-burger');
  const mobileMenu = document.getElementById('nav-mobile');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');

      if (isOpen) {
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        burger.setAttribute('aria-expanded', 'false');
        burger.classList.remove('is-active');
      } else {
        mobileMenu.classList.add('is-open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        burger.setAttribute('aria-expanded', 'true');
        burger.classList.add('is-active');
      }
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        burger.setAttribute('aria-expanded', 'false');
        burger.classList.remove('is-active');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target)) {
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        burger.setAttribute('aria-expanded', 'false');
        burger.classList.remove('is-active');
      }
    });
  }

  /* ── 6. Burger animation styles ── */
  const burgerStyle = document.createElement('style');
  burgerStyle.textContent = `
    .nav-burger.is-active span:nth-child(1) {
      transform: translateY(6.5px) rotate(45deg);
    }
    .nav-burger.is-active span:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    .nav-burger.is-active span:nth-child(3) {
      transform: translateY(-6.5px) rotate(-45deg);
    }
    .nav-link.is-active {
      color: var(--color-ink);
    }
    .nav-link.is-active::after {
      transform: scaleX(1);
    }
  `;
  document.head.appendChild(burgerStyle);

  /* ── 7. Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 72;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });
    });
  });

  /* ── 8. Scroll progress indicator ── */
  const progressBar = document.createElement('div');
  progressBar.setAttribute('aria-hidden', 'true');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: var(--color-accent);
    z-index: 200;
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.1s linear;
    pointer-events: none;
  `;
  document.body.prepend(progressBar);

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });

  /* ── 9. Parallax hero name ── */
  const heroName = document.querySelector('.hero-name');

  if (heroName && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        const factor = scrollY * 0.18;
        heroName.style.transform = `translateY(${factor}px)`;
        heroName.style.opacity = `${1 - scrollY / (window.innerHeight * 0.8)}`;
      }
    }, { passive: true });
  }

  /* ── 10. Timeline hover — expand description ── */
  document.querySelectorAll('.timeline-card').forEach(card => {
    card.setAttribute('tabindex', '0');
  });

  /* ── 11. Work card — cursor follower effect ── */
  const workSection = document.querySelector('.work-section');

  if (workSection && window.matchMedia('(hover: hover)').matches) {
    const cursor = document.createElement('div');
    cursor.setAttribute('aria-hidden', 'true');
    cursor.style.cssText = `
      position: fixed;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      pointer-events: none;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.4s cubic-bezier(0.22,1,0.36,1),
                  opacity 0.3s;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.625rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.5);
    `;
    cursor.textContent = 'View';
    document.body.appendChild(cursor);

    workSection.querySelectorAll('.work-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      });

      card.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0)';
      });

      card.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      });
    });
  }

  /* ── 12. Year counter animation (timeline) ── */
  function animateValue(el, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(start + range * eased);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    const yearObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const yearEl = entry.target;
            const year = parseInt(yearEl.textContent, 10);
            if (!isNaN(year)) {
              animateValue(yearEl, year - 3, year, 600);
            }
            yearObserver.unobserve(yearEl);
          }
        });
      },
      { threshold: 0.8 }
    );

    document.querySelectorAll('.timeline-year').forEach(el => yearObserver.observe(el));
  }

  /* ── 13. Timeline card — click scrolls to related Featured Work ── */
  const timelineMap = {
    'Tata Consultancy Services': '#work',
    'CI&T':                      '#work',
    'SAP Labs China':            '#work',
    'Meituan Dianping':          '#timeline',
    'The University of Manchester': '#focus',
  };

  document.querySelectorAll('.timeline-card').forEach(card => {
    const company = card.querySelector('.timeline-company');
    if (!company) return;
    const companyName = company.textContent.trim();
    const target = timelineMap[companyName];
    if (target) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const el = document.querySelector(target);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - (nav ? nav.offsetHeight : 72);
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    }
  });

  /* ── 15. Film strip — drag-to-scroll + auto-scroll + hint ── */
  const filmStrip = document.getElementById('film-strip');
  const dragHint  = document.getElementById('film-drag-hint');

  if (filmStrip) {

    /* ── Drag-to-scroll (mouse) ── */
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    let hasDragged = false;

    filmStrip.addEventListener('mousedown', (e) => {
      isDragging = true;
      hasDragged = false;
      startX = e.pageX - filmStrip.offsetLeft;
      scrollStart = filmStrip.scrollLeft;
      filmStrip.classList.add('is-dragging');
      stopAutoScroll();
    });

    document.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      filmStrip.classList.remove('is-dragging');
      if (!hasDragged) return;
      // restart auto-scroll after a delay
      autoScrollTimeout = setTimeout(startAutoScroll, 3000);
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - filmStrip.offsetLeft;
      const dist = x - startX;
      if (Math.abs(dist) > 4) hasDragged = true;
      filmStrip.scrollLeft = scrollStart - dist;
    });

    /* Prevent click-through after drag */
    filmStrip.querySelectorAll('.film-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (hasDragged) { e.preventDefault(); }
      });
    });

    /* ── Touch swipe (mobile) ── */
    let touchStartX = 0;
    let touchScrollStart = 0;

    filmStrip.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
      touchScrollStart = filmStrip.scrollLeft;
      stopAutoScroll();
    }, { passive: true });

    filmStrip.addEventListener('touchmove', (e) => {
      const dist = touchStartX - e.touches[0].pageX;
      filmStrip.scrollLeft = touchScrollStart + dist;
    }, { passive: true });

    filmStrip.addEventListener('touchend', () => {
      autoScrollTimeout = setTimeout(startAutoScroll, 3000);
    });

    /* ── Auto-scroll ── */
    let autoScrollRAF = null;
    let autoScrollTimeout = null;
    const SCROLL_SPEED = 0.6; // px per frame

    function startAutoScroll() {
      if (autoScrollRAF) return;
      autoScrollRAF = requestAnimationFrame(autoScrollStep);
    }

    function stopAutoScroll() {
      if (autoScrollRAF) {
        cancelAnimationFrame(autoScrollRAF);
        autoScrollRAF = null;
      }
      if (autoScrollTimeout) {
        clearTimeout(autoScrollTimeout);
        autoScrollTimeout = null;
      }
    }

    function autoScrollStep() {
      if (!filmStrip) return;
      const maxScroll = filmStrip.scrollWidth - filmStrip.clientWidth;
      if (filmStrip.scrollLeft >= maxScroll - 2) {
        // smoothly loop back to start
        filmStrip.scrollTo({ left: 0, behavior: 'smooth' });
        autoScrollRAF = null;
        autoScrollTimeout = setTimeout(startAutoScroll, 1200);
        return;
      }
      filmStrip.scrollLeft += SCROLL_SPEED;
      autoScrollRAF = requestAnimationFrame(autoScrollStep);
    }

    /* Pause on hover */
    filmStrip.addEventListener('mouseenter', stopAutoScroll);
    filmStrip.addEventListener('mouseleave', () => {
      autoScrollTimeout = setTimeout(startAutoScroll, 1000);
    });

    /* Hide drag hint once user interacts */
    function hideDragHint() {
      if (dragHint) dragHint.classList.add('is-hidden');
    }
    filmStrip.addEventListener('scroll', hideDragHint, { once: true });

    /* Start after a short delay */
    autoScrollTimeout = setTimeout(startAutoScroll, 1800);

    /* ── Keyboard navigation for accessibility ── */
    filmStrip.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        filmStrip.scrollBy({ left: 280, behavior: 'smooth' });
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        filmStrip.scrollBy({ left: -280, behavior: 'smooth' });
        e.preventDefault();
      }
    });
  }

  /* ── 16. Portrait image — local file ── */
  // Portrait now served from images/portrait.jpg (localised)
  // No dynamic loading needed — src set directly in HTML

  /* ── 14. Init complete ── */
  document.documentElement.classList.add('js-loaded');
  console.log('Lu You Portfolio — loaded ✦');
})();
