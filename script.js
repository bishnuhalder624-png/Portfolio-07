// Mobile menu
const menuBtn = document.getElementById('menu-btn');
const navbar = document.getElementById('navbar');
menuBtn.addEventListener('click', () => navbar.classList.toggle('open'));
navbar.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navbar.classList.remove('open')));

// Active link on scroll
const sections = document.querySelectorAll('main section');
const links = navbar.querySelectorAll('a');
function setActive() {
  const y = window.scrollY + 140;
  let current = sections[0].id;
  sections.forEach(s => { if (y >= s.offsetTop) current = s.id; });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', setActive, { passive: true });
setActive();

// Typing effect (edit the roles below)
const roles = ['Sofware Developer.', 'Web Developer.', 'Freelancer.'];
const typingEl = document.getElementById('typing');
let r = 0, c = 0, deleting = false;
function type() {
  const word = roles[r];
  typingEl.textContent = word.slice(0, c);
  if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 1500); }
  if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; return setTimeout(type, 400); }
  c += deleting ? -1 : 1;
  setTimeout(type, deleting ? 50 : 100);
}
type();

// Contact form validation
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll('[required]').forEach(f => {
    const bad = !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
    f.classList.toggle('invalid', bad);
    if (bad) ok = false;
  });
  if (!ok) {
    status.className = 'form-status err';
    status.textContent = 'Please fill in all required fields with valid details.';
    return;
  }
  // To really send messages, connect a service such as Formspree or EmailJS here.
  status.className = 'form-status ok';
  status.textContent = 'Message ready to send. Connect a form service to receive it.';
  form.reset();
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();