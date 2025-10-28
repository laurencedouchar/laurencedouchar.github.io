// --- Navigation douce vers les sections ---
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --- Gestion du menu actif ---
const navLinks = Array.from(document.querySelectorAll('nav a'));
navLinks.forEach(a =>
  a.addEventListener('click', () => {
    navLinks.forEach(x => x.classList.remove('active'));
    a.classList.add('active');
  })
);

// --- Carousel ---
const slidesEl = document.getElementById('slides');
const slides = Array.from(slidesEl.children);
const dotsEl = document.getElementById('dots');
let current = 0;

function renderDots() {
  dotsEl.innerHTML = '';
  slides.forEach((s, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === current ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });
}

function goTo(i) {
  current = (i + slides.length) % slides.length;
  slidesEl.style.transform = `translateX(-${current * 100}%)`;
  renderDots();
}

document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

let autoplay = setInterval(() => goTo(current + 1), 5000);

const carouselEl = document.getElementById('carousel');
carouselEl.addEventListener('mouseenter', () => clearInterval(autoplay));
carouselEl.addEventListener('mouseleave', () => {
  autoplay = setInterval(() => goTo(current + 1), 5000);
});

renderDots();

// --- Gestion du formulaire de contact ---
function handleFormSubmit(e) {
  e.preventDefault();

  const name = e.target.name.value.trim();
  const email = e.target.email.value.trim();
  const city = e.target.city.value.trim();
  const message = e.target.message.value.trim();

  if (!name || !email || !city || !message) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  const subject = encodeURIComponent(`Contact depuis le site — ${name}`);
  const body = encodeURIComponent(
    `Nom : ${name}\nEmail : ${email}\nVille : ${city}\n\nMessage :\n${message}`
  );

  // ✅ Redirection vers le client mail
  window.location.href = `mailto:laurence.neuropsy@gmail.com?subject=${subject}&body=${body}`;
}
