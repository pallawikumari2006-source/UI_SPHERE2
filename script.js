/* =========================================================
   GDG Fest 2026 — interactivity
   Edit the CONFIG + DATA blocks to customise the site.
   ========================================================= */
const CONFIG = {
  eventDate: new Date('2026-11-20T09:00:00'), // countdown target
  rotatingWords: ['Code', 'Cloud', 'AI', 'Web', 'Mobile'],
};

const SCHEDULE = [
  [ // Day 1
    { t: '09:00', title: 'Opening Ceremony', desc: 'Welcome, community stats & what to expect.', c: '#1a9150' },
    { t: '10:00', title: 'Keynote: The Future of AI', desc: 'Building with Gemini and on-device models.', c: '#ea4335' },
    { t: '12:30', title: 'Lunch & Networking', desc: 'Meet fellow developers over food.', c: '#fbbc04' },
    { t: '14:00', title: 'Workshop: Firebase in 90 Minutes', desc: 'Auth, Firestore and hosting from scratch.', c: '#34a853' },
    { t: '17:00', title: 'Lightning Talks', desc: 'Five-minute talks from community members.', c: '#1a9150' },
  ],
  [ // Day 2
    { t: '09:30', title: 'Hack Sprint Kickoff', desc: 'Problem statements revealed, teams form.', c: '#ea4335' },
    { t: '11:00', title: 'Workshop: Flutter UI Magic', desc: 'Animated, beautiful apps with one codebase.', c: '#1a9150' },
    { t: '14:00', title: 'Workshop: Cloud Run & Containers', desc: 'Deploy a scalable API in minutes.', c: '#34a853' },
    { t: '16:30', title: 'Mentor Office Hours', desc: 'Get unblocked by industry mentors.', c: '#fbbc04' },
  ],
  [ // Day 3
    { t: '10:00', title: 'Hack Sprint Final Demos', desc: 'Teams pitch to the judging panel.', c: '#fbbc04' },
    { t: '13:00', title: 'Panel: Careers in Tech', desc: 'Advice from GDEs and engineers.', c: '#1a9150' },
    { t: '15:00', title: 'Awards & Closing', desc: 'Prizes, swag and a community photo.', c: '#ea4335' },
  ],
];

const TRACKS = [
  { cat: 'ai', name: 'Build with Gemini', lvl: 'Beginner', hrs: 3, seats: 82, desc: 'Prompting, function calling and shipping your first AI feature.' },
  { cat: 'ai', name: 'TensorFlow & On-device ML', lvl: 'Intermediate', hrs: 4, seats: 64, desc: 'Train, convert and run models directly on mobile and web.' },
  { cat: 'cloud', name: 'Google Cloud Essentials', lvl: 'Beginner', hrs: 3, seats: 90, desc: 'Compute, storage and IAM, a practical tour of core services.' },
  { cat: 'cloud', name: 'Serverless with Cloud Run', lvl: 'Intermediate', hrs: 2, seats: 55, desc: 'Containerise an API and deploy it with autoscaling.' },
  { cat: 'web', name: 'Modern Web with Angular', lvl: 'Intermediate', hrs: 3, seats: 70, desc: 'Signals, standalone components and fast, accessible UIs.' },
  { cat: 'web', name: 'Progressive Web Apps', lvl: 'Beginner', hrs: 2, seats: 48, desc: 'Offline support, installability and push notifications.' },
  { cat: 'mobile', name: 'Flutter from Zero', lvl: 'Beginner', hrs: 4, seats: 95, desc: 'Create a polished cross-platform app in a single day.' },
  { cat: 'mobile', name: 'Kotlin & Jetpack Compose', lvl: 'Intermediate', hrs: 3, seats: 60, desc: 'Declarative Android UIs with modern architecture.' },
];
const CAT_LABEL = { ai: 'AI / ML', cloud: 'CLOUD', web: 'WEB', mobile: 'MOBILE' };

const SPEAKERS = [
  { n: 'Aanya Rao', r: 'Google Developer Expert · AI', c: '#1a9150', b: 'Builds production LLM apps and teaches thousands of developers.' },
  { n: 'Kabir Mehta', r: 'Cloud Architect', c: '#ea4335', b: 'Designs large-scale serverless systems on Google Cloud.' },
  { n: 'Isha Verma', r: 'Flutter Lead', c: '#fbbc04', b: 'Ships beautiful cross-platform apps and open-source widgets.' },
  { n: 'Rohan Das', r: 'Web Performance Engineer', c: '#34a853', b: 'Obsessed with Core Web Vitals and accessible interfaces.' },
];

const FAQS = [
  ['Is there any registration fee?', 'No! Registration is completely free for verified students, researchers and developers, courtesy of our sponsors.'],
  ['Who is eligible to participate?', 'Anyone passionate about technology. Beginners are welcome: every workshop has a starter-friendly path.'],
  ['What is the maximum team size for the Hack Sprint?', 'Teams can have 2 to 4 members. Don\'t have a team? Join our team-matching channel on Discord.'],
  ['Will participation certificates be issued?', 'Yes. Every attendee gets a digital certificate, and winners receive special recognition.'],
  ['What should I bring to the workshops?', 'A laptop, charger, student ID and curiosity. We\'ll share the setup checklist by email before the event.'],
];

/* ---------- helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast.id); toast.id = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ---------- theme ---------- */
const root = document.documentElement;
const themeBtn = $('#themeBtn');
function setTheme(t) { root.dataset.theme = t; themeBtn.textContent = t === 'dark' ? '☀' : '☾'; store.set('gdg-theme', t); }
setTheme(store.get('gdg-theme', 'dark'));
themeBtn.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

/* ---------- countdown ---------- */
const units = Object.fromEntries($$('[data-unit]').map(e => [e.dataset.unit, e]));
function updateCountdown() {
  let diff = Math.max(0, CONFIG.eventDate - Date.now());
  const vals = { d: Math.floor(diff / 864e5), h: Math.floor(diff / 36e5) % 24, m: Math.floor(diff / 6e4) % 60, s: Math.floor(diff / 1e3) % 60 };
  for (const k in vals) {
    const txt = String(vals[k]).padStart(2, '0');
    if (units[k].textContent !== txt) {
      units[k].textContent = txt;
      units[k].classList.remove('tick'); void units[k].offsetWidth; units[k].classList.add('tick');
    }
  }
}
updateCountdown(); setInterval(updateCountdown, 1000);

/* ---------- rotating word ---------- */
let wi = 0; const rot = $('#rotator');
setInterval(() => {
  rot.classList.add('out');
  setTimeout(() => { wi = (wi + 1) % CONFIG.rotatingWords.length; rot.textContent = CONFIG.rotatingWords[wi]; rot.classList.remove('out'); }, 300);
}, 2200);

/* ---------- schedule ---------- */
let day = 0;
const saved = new Set(store.get('gdg-plan', []));
function renderSchedule() {
  const list = $('#timeline');
  list.innerHTML = SCHEDULE[day].map((s, i) => {
    const id = `${day}-${i}`;
    return `<li class="slot ${saved.has(id) ? 'saved' : ''}" data-id="${id}" style="--c:${s.c};animation-delay:${i * 80}ms">
      <div><time>${s.t}</time><h4>${s.title}</h4><p>${s.desc}</p></div><span class="star">⭐</span></li>`;
  }).join('');
  $('#planInfo').innerHTML = `Your plan: <b>${saved.size}</b> session${saved.size === 1 ? '' : 's'} saved`;
}
$('#dayTabs').addEventListener('click', e => {
  const b = e.target.closest('.tab'); if (!b) return;
  day = +b.dataset.day;
  $$('.tab').forEach(t => t.classList.toggle('active', t === b));
  renderSchedule();
});
$('#timeline').addEventListener('click', e => {
  const li = e.target.closest('.slot'); if (!li) return;
  const id = li.dataset.id;
  if (saved.has(id)) { saved.delete(id); toast('Removed from your plan'); } else { saved.add(id); toast('⭐ Added to your plan'); }
  store.set('gdg-plan', [...saved]);
  li.classList.toggle('saved');
  $('#planInfo').innerHTML = `Your plan: <b>${saved.size}</b> session${saved.size === 1 ? '' : 's'} saved`;
});
renderSchedule();

/* ---------- tracks ---------- */
let filter = 'all', query = '';
function renderTracks() {
  const items = TRACKS.filter(t => (filter === 'all' || t.cat === filter) && (t.name + t.desc).toLowerCase().includes(query));
  $('#trackGrid').innerHTML = items.map((t, i) => `
    <article class="card tilt track" style="animation-delay:${i * 60}ms">
      <span class="tag">${CAT_LABEL[t.cat]}</span><span class="tag" style="background:rgba(251,188,4,.14);color:var(--yellow)">${t.lvl}</span>
      <h3>${t.name}</h3><p>${t.desc}</p>
      <div class="meta"><span>⏱ ${t.hrs} hrs</span><span>${t.seats}% seats filled</span></div>
      <div class="bar"><i data-w="${t.seats}"></i></div>
    </article>`).join('');
  $('#trackEmpty').hidden = items.length > 0;
  requestAnimationFrame(() => requestAnimationFrame(() => $$('.bar i').forEach(b => b.style.width = b.dataset.w + '%')));
  bindTilt();
}
$('#filters').addEventListener('click', e => {
  const b = e.target.closest('.filter'); if (!b) return;
  filter = b.dataset.filter;
  $$('.filter').forEach(f => f.classList.toggle('active', f === b));
  renderTracks();
});
$('#trackSearch').addEventListener('input', e => { query = e.target.value.trim().toLowerCase(); renderTracks(); });

/* ---------- speakers ---------- */
$('#speakerGrid').innerHTML = SPEAKERS.map(s => `
  <div class="speaker reveal" style="--c:${s.c}" tabindex="0">
    <div class="inner">
      <div class="face"><div class="avatar">${s.n.split(' ').map(w => w[0]).join('')}</div><h3>${s.n}</h3><small>${s.r}</small></div>
      <div class="face back"><h3>${s.n}</h3><small>${s.r}</small><p style="margin-top:12px;font-size:.9rem">${s.b}</p></div>
    </div>
  </div>`).join('');
$('#speakerGrid').addEventListener('click', e => e.target.closest('.speaker')?.classList.toggle('flip'));

/* ---------- FAQ accordion ---------- */
$('#faqList').innerHTML = FAQS.map(([q, a]) => `
  <div class="qa reveal"><button aria-expanded="false">${q}<span>⌄</span></button><div class="ans"><p>${a}</p></div></div>`).join('');
$('#faqList').addEventListener('click', e => {
  const btn = e.target.closest('button'); if (!btn) return;
  const item = btn.parentElement, open = !item.classList.contains('open');
  $$('.qa').forEach(q => { q.classList.remove('open'); $('.ans', q).style.maxHeight = null; $('button', q).setAttribute('aria-expanded', 'false'); });
  if (open) { item.classList.add('open'); const a = $('.ans', item); a.style.maxHeight = a.scrollHeight + 'px'; btn.setAttribute('aria-expanded', 'true'); }
});

/* ---------- 3D tilt on cards ---------- */
function bindTilt() {
  $$('.tilt:not([data-tilt])').forEach(card => {
    card.dataset.tilt = 1;
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `perspective(700px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}
renderTracks();

/* ---------- reveal + counters + nav highlight ---------- */
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  en.target.classList.add('in'); io.unobserve(en.target);
  if (en.target.classList.contains('stats')) countUp();
}), { threshold: .15 });
$$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 90 + 'ms'; io.observe(el); });
function countUp() {
  $$('[data-count]').forEach(el => {
    const end = +el.dataset.count, t0 = performance.now(), dur = 1600;
    (function step(now) {
      const p = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  });
}
const sections = $$('main section[id]'), navLinks = $$('.links a');
const spy = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

/* ---------- scroll UI ---------- */
const nav = $('#nav'), progress = $('#progress'), toTop = $('#toTop');
addEventListener('scroll', () => {
  const h = document.documentElement;
  progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
  nav.classList.toggle('scrolled', scrollY > 30);
  toTop.classList.toggle('show', scrollY > 600);
}, { passive: true });
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
$('#burger').addEventListener('click', () => $('#links').classList.toggle('open'));
$('#links').addEventListener('click', e => e.target.tagName === 'A' && $('#links').classList.remove('open'));

/* ---------- cursor glow ---------- */
const glow = $('#cursorGlow');
addEventListener('mousemove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });

/* ---------- button ripple ---------- */
document.addEventListener('click', e => {
  const b = e.target.closest('.btn'); if (!b) return;
  const r = b.getBoundingClientRect(), s = Math.max(r.width, r.height);
  const sp = document.createElement('span'); sp.className = 'ripple';
  sp.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
  b.appendChild(sp); setTimeout(() => sp.remove(), 600);
});

/* ---------- registration modal ---------- */
const modal = $('#modal'), form = $('#regForm');
function openModal() { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); $('#formView').hidden = false; $('#successView').hidden = true; setTimeout(() => $('input', form).focus(), 300); }
function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }
$$('[data-open-register]').forEach(b => b.addEventListener('click', openModal));
$('#closeModal').addEventListener('click', closeModal);
$('#doneBtn').addEventListener('click', closeModal);
modal.addEventListener('click', e => e.target === modal && closeModal());
addEventListener('keydown', e => e.key === 'Escape' && closeModal());
form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  $$('label', form).forEach(l => {
    const f = $('input,select', l), err = $('.err', l);
    let msg = '';
    if (!f.value.trim()) msg = 'This field is required';
    else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) msg = 'Enter a valid email';
    err.textContent = msg; l.classList.toggle('bad', !!msg);
    if (msg) ok = false;
  });
  if (!ok) return toast('Please fix the highlighted fields');
  $('#who').textContent = form.name.value.split(' ')[0];
  $('#formView').hidden = true; $('#successView').hidden = false;
  form.reset(); confetti();
});

/* ---------- confetti ---------- */
function confetti() {
  const colors = ['#1a9150', '#ea4335', '#fbbc04', '#34a853'];
  for (let i = 0; i < 70; i++) {
    const p = document.createElement('i');
    p.style.cssText = `position:fixed;z-index:500;left:50%;top:50%;width:9px;height:9px;border-radius:2px;background:${colors[i % 4]};pointer-events:none`;
    document.body.appendChild(p);
    const a = Math.random() * Math.PI * 2, v = 160 + Math.random() * 280;
    p.animate([
      { transform: 'translate(0,0) rotate(0)', opacity: 1 },
      { transform: `translate(${Math.cos(a) * v}px, ${Math.sin(a) * v + 220}px) rotate(${Math.random() * 720}deg)`, opacity: 0 },
    ], { duration: 1400 + Math.random() * 700, easing: 'cubic-bezier(.2,.7,.4,1)' }).onfinish = () => p.remove();
  }
}

/* ---------- animated particle background ---------- */
(function particles() {
  const cv = $('#bg'), ctx = cv.getContext('2d');
  const cols = ['#1a9150', '#ea4335', '#fbbc04', '#34a853'];
  let w, h, pts = [], mouse = { x: -999, y: -999 };
  function resize() {
    w = cv.width = innerWidth; h = cv.height = innerHeight;
    pts = Array.from({ length: Math.min(70, Math.floor(w / 20)) }, (_, i) => ({
      x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, r: 1.5 + Math.random() * 2, c: cols[i % 4],
    }));
  }
  addEventListener('resize', resize); resize();
  addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  (function loop() {
    ctx.clearRect(0, 0, w, h);
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d = Math.hypot(dx, dy);
      if (d < 120) { p.x += dx / d * 1.5; p.y += dy / d * 1.5; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fillStyle = p.c; ctx.globalAlpha = .8; ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j], dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 120) { ctx.globalAlpha = (1 - dist / 120) * .25; ctx.strokeStyle = p.c; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      }
    });
    requestAnimationFrame(loop);
  })();
})();