/* =========================================
   Smith Legal Group — Main JS
   ========================================= */

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
});

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu?.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// Animated counter
function animateCount(el, target, duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const update = () => {
    start += step;
    if (start < target) {
      el.textContent = Math.floor(start).toLocaleString();
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
    }
  };
  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      animateCount(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

// Back to top
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop?.classList.add('visible');
  } else {
    backToTop?.classList.remove('visible');
  }
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Sparkline SVG chart for hero stats card
function drawSparkline(svgEl) {
  if (!svgEl) return;
  const W = svgEl.clientWidth || 200;
  const H = svgEl.clientHeight || 50;
  const points = [12, 28, 18, 40, 22, 34, 45, 30, 42, 38, 50, 35, 48];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const xs = points.map((_, i) => (i / (points.length - 1)) * W);
  const ys = points.map(p => H - ((p - min) / (max - min)) * (H - 8) - 4);
  const path = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
  const fillPath = path + ` L${xs[xs.length-1].toFixed(1)},${H} L0,${H} Z`;

  svgEl.innerHTML = `
    <defs>
      <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#c8102e" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#c8102e" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <path d="${fillPath}" fill="url(#sg)"/>
    <path d="${path}" fill="none" stroke="#c8102e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${xs[xs.length-1].toFixed(1)}" cy="${ys[ys.length-1].toFixed(1)}" r="4" fill="#c8102e"/>
  `;
}

document.querySelectorAll('.sparkline').forEach(svg => {
  setTimeout(() => drawSparkline(svg), 1000);
});

// Smooth page transitions
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.3s ease';
      setTimeout(() => { window.location = href; }, 280);
    });
  }
});

document.body.style.opacity = '0';
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});

// Contact form
const contactForm = document.querySelector('.contact-form form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Message Sent!';
    btn.style.background = '#16a34a';
    contactForm.reset();
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1500);
});
