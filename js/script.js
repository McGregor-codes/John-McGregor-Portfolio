/* ==========================================================================
   McGregor-Codes Portfolio — Site script
   No dependencies. Progressive enhancement only.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHeroEntrance();
  initScrollReveal();
  initScrollSpy();
  initProjectPreviews();
  initBackToTop();
  initContactLinks();
  initIdCard();
  initYear();
});

/* ---------------------------------------------------------
   Navigation: scroll state + mobile toggle
--------------------------------------------------------- */
function initNav(){
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  const closeBtn = document.querySelector('[data-nav-close]');
  const scrim = document.querySelector('[data-nav-scrim]');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && links) {
    const setOpen = (open) => {
      links.classList.toggle('is-open', open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      scrim?.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', () => setOpen(!links.classList.contains('is-open')));
    closeBtn?.addEventListener('click', () => setOpen(false));
    scrim?.addEventListener('click', () => setOpen(false));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  }
}

/* ---------------------------------------------------------
   Hero: single orchestrated entrance on load
--------------------------------------------------------- */
function initHeroEntrance(){
  const hero = document.querySelector('.hero');
  if (!hero) return;
  requestAnimationFrame(() => {
    setTimeout(() => hero.classList.add('is-ready'), 80);
  });
}

/* ---------------------------------------------------------
   Scroll reveal for sections/cards
--------------------------------------------------------- */
function initScrollReveal(){
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => io.observe(el));
}

/* ---------------------------------------------------------
   Scrollspy: highlight active nav link
--------------------------------------------------------- */
function initScrollSpy(){
  const sections = document.querySelectorAll('main section[id]');
  const links = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !links.length) return;

  const map = new Map();
  links.forEach(link => map.set(link.getAttribute('href').slice(1), link));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = map.get(entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => io.observe(section));
}

/* ---------------------------------------------------------
   Project cards: play the muted preview clip on hover/focus
--------------------------------------------------------- */
function initProjectPreviews(){
  document.querySelectorAll('.project-media').forEach(media => {
    const video = media.querySelector('video');
    if (!video) return;

    const play = () => {
      media.classList.add('is-playing');
      video.currentTime = 0;
      video.play().catch(() => {});
    };
    const stop = () => {
      media.classList.remove('is-playing');
      video.pause();
    };

    media.addEventListener('mouseenter', play);
    media.addEventListener('mouseleave', stop);
    media.addEventListener('focusin', play);
    media.addEventListener('focusout', stop);
    media.addEventListener('touchstart', play, { passive: true });
  });
}

/* ---------------------------------------------------------
   Back-to-top button
--------------------------------------------------------- */
function initBackToTop(){
  const btn = document.querySelector('.to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 700);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------
   Contact: build the WhatsApp deep link from data attribute
--------------------------------------------------------- */
function initContactLinks(){
  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    const raw = el.getAttribute('data-whatsapp').replace(/[^\d]/g, '');
    const message = encodeURIComponent("Hi John, I found your portfolio and I'd like to talk about a project.");
    el.href = `https://wa.me/${raw}?text=${message}`;
  });
}

/* ---------------------------------------------------------
   Footer year
--------------------------------------------------------- */
function initYear(){
  const el = document.querySelector('[data-year]');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
   "Show Card" digital business card + vCard download
--------------------------------------------------------- */
function initIdCard(){
  const btn = document.getElementById('showCardBtn');
  const card = document.getElementById('idCard');
  const closeBtn = card?.querySelector('.id-card-close');
  const saveBtn = document.getElementById('saveContactBtn');
  if (!btn || !card) return;

  const setOpen = (open) => {
    card.classList.toggle('is-open', open);
    btn.textContent = open ? 'Hide Card' : 'Show Card';
    btn.setAttribute('aria-expanded', String(open));
  };

  btn.addEventListener('click', () => setOpen(!card.classList.contains('is-open')));
  closeBtn?.addEventListener('click', () => setOpen(false));
  saveBtn?.addEventListener('click', downloadVCard);
}

function downloadVCard(){
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:John McGregor',
    'ORG:McGregor-Codes',
    'TITLE:Frontend Developer & UI/UX Designer',
    'TEL;TYPE=CELL:+2348161249729',
    'EMAIL:mcgregorjohn53@gmail.com',
    'URL:https://github.com/McGregor-Codes',
    'ADR;TYPE=WORK:;;;Port Harcourt;Rivers State;;Nigeria',
    'END:VCARD'
  ];
  const blob = new Blob([lines.join('\r\n')], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'John-McGregor.vcf';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
