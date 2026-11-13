/* Ermi Welding website - main script
   Parts: 1) language  2) menu  3) gallery  4) photo viewer  5) contact form */

// ---------- 1. Language (English / Amharic) ----------
// Every piece of text has data-en and data-am attributes in index.html.
let lang = 'en';

try {
  const saved = localStorage.getItem('ermi-lang');
  if (saved === 'en' || saved === 'am') lang = saved;
} catch (err) {
  // localStorage can be blocked in private mode. Not a problem, we stay on English.
}

function applyLanguage() {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-en]').forEach(function (el) {
    const text = el.getAttribute('data-' + lang);
    if (text) el.textContent = text;
  });

  document.querySelectorAll('[data-ph-en]').forEach(function (el) {
    el.placeholder = el.getAttribute('data-ph-' + lang);
  });

  // The button shows the language you can switch TO
  document.getElementById('lang-btn').textContent = (lang === 'en') ? 'አማርኛ' : 'English';
}

document.getElementById('lang-btn').addEventListener('click', function () {
  lang = (lang === 'en') ? 'am' : 'en';
  try { localStorage.setItem('ermi-lang', lang); } catch (err) {}
  applyLanguage();
});


// ---------- 2. Mobile menu ----------
const menuBtn = document.getElementById('menu-btn');
const mainNav = document.getElementById('main-nav');

menuBtn.addEventListener('click', function () {
  const isOpen = mainNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen);
});

// close the menu after tapping a link
mainNav.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') {
    mainNav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});


// ---------- 3. Gallery ----------
// The photos come from the PHOTOS list in js/images.js
const PAGE_SIZE = 9;       // how many photos to show at a time
let activeFilter = 'all';
let shownCount = PAGE_SIZE;

const grid = document.getElementById('gallery-grid');
const moreBtn = document.getElementById('more-btn');

// Give every photo a number inside its category ("Gate door 3")
// and an id we can look up later.
const counters = {};
PHOTOS.forEach(function (photo, i) {
  counters[photo.category] = (counters[photo.category] || 0) + 1;
  photo.number = counters[photo.category];
  photo.id = i;
});

// For the "All" tab, mix the categories so it isn't 9 gates in a row.
function mixedOrder() {
  const byCategory = {};
  PHOTOS.forEach(function (p) {
    if (!byCategory[p.category]) byCategory[p.category] = [];
    byCategory[p.category].push(p);
  });
  const lists = Object.values(byCategory);
  const mixed = [];
  const longest = Math.max.apply(null, lists.map(function (l) { return l.length; }));
  for (let i = 0; i < longest; i++) {
    lists.forEach(function (l) { if (l[i]) mixed.push(l[i]); });
  }
  return mixed;
}

function photosToShow() {
  if (activeFilter === 'all') return mixedOrder();
  return PHOTOS.filter(function (p) { return p.category === activeFilter; });
}

function makeCard(photo) {
  const names = CATEGORIES[photo.category].single;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'photo';
  button.dataset.id = photo.id;

  const img = document.createElement('img');
  img.src = photo.file;
  img.alt = photo.alt;
  img.loading = 'lazy';
  // Keep the photo's own shape, but not too tall or too wide
  if (photo.w && photo.h) {
    img.style.aspectRatio = Math.min(Math.max(photo.w / photo.h, 0.75), 1.5);
  }

  const caption = document.createElement('span');
  caption.className = 'photo-caption';
  caption.setAttribute('data-en', names.en + ' ' + photo.number);
  caption.setAttribute('data-am', names.am + ' ' + photo.number);
  caption.textContent = names[lang] + ' ' + photo.number;

  button.appendChild(img);
  button.appendChild(caption);
  return button;
}

function renderGallery() {
  const list = photosToShow();
  grid.innerHTML = '';
  list.slice(0, shownCount).forEach(function (photo) {
    grid.appendChild(makeCard(photo));
  });
  moreBtn.parentElement.hidden = shownCount >= list.length;
}

function setFilter(name) {
  activeFilter = name;
  shownCount = PAGE_SIZE;

  document.querySelectorAll('#gallery-filters button').forEach(function (b) {
    b.classList.toggle('active', b.dataset.filter === name);
  });
  renderGallery();
}

document.getElementById('gallery-filters').addEventListener('click', function (e) {
  const btn = e.target.closest('button[data-filter]');
  if (btn) setFilter(btn.dataset.filter);
});

// The service cards at the top jump to the gallery with that category selected
document.querySelectorAll('[data-goto]').forEach(function (card) {
  card.addEventListener('click', function () {
    setFilter(card.dataset.goto);
  });
});

moreBtn.addEventListener('click', function () {
  shownCount += PAGE_SIZE;
  renderGallery();
});


// ---------- 4. Photo viewer ----------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

grid.addEventListener('click', function (e) {
  const card = e.target.closest('.photo');
  if (!card) return;

  const photo = PHOTOS[card.dataset.id];
  lightboxImg.src = photo.file;
  lightboxImg.alt = photo.alt;
  lightboxCaption.textContent = CATEGORIES[photo.category].single[lang] + ' ' + photo.number;
  lightbox.showModal();
});

document.getElementById('lightbox-close').addEventListener('click', function () {
  lightbox.close();
});

// click on the dark area around the photo also closes it
lightbox.addEventListener('click', function (e) {
  if (e.target === lightbox) lightbox.close();
});


// ---------- 5. Contact form (sent through Formspree) ----------
const form = document.getElementById('inquiry-form');
const submitBtn = document.getElementById('submit-btn');
const toast = document.getElementById('toast');

const messages = {
  ok: {
    en: ['Message sent', 'Thank you. We will contact you soon.'],
    am: ['ተልኳል', 'እናመሰግናለን። በቅርብ ጊዜ እናገኝዎታለን።']
  },
  fail: {
    en: ['Message not sent', 'Something went wrong. Please call us or message us on Telegram.'],
    am: ['አልተላከም', 'ችግር ተፈጥሯል። እባክዎ ይደውሉልን ወይም በቴሌግራም ያነጋግሩን።']
  }
};

function showToast(kind) {
  const text = messages[kind][lang];
  document.getElementById('toast-title').textContent = text[0];
  document.getElementById('toast-text').textContent = text[1];
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 5000);
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = (lang === 'am') ? 'በመላክ ላይ...' : 'Sending...';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      showToast('ok');
    } else {
      showToast('fail');
    }
  } catch (err) {
    showToast('fail');
  }

  submitBtn.disabled = false;
  submitBtn.textContent = submitBtn.getAttribute('data-' + lang);
});


// ---------- Start ----------
document.getElementById('year').textContent = new Date().getFullYear();
renderGallery();
applyLanguage();
