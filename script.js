const slides = document.querySelectorAll('.slide');
const progressBar = document.getElementById('progress-bar');
const counter = document.getElementById('counter');

let current = 0;

function goTo(index) {
  if (index < 0 || index >= slides.length) return;

  slides[current].classList.remove('active');
  current = index;
  slides[current].classList.add('active');
  
  updateUI();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

function updateUI() {
  progressBar.style.width = ((current + 1) / slides.length * 100) + '%';
  counter.textContent = `${current + 1} / ${slides.length}`;
}

document.addEventListener('keydown', (e) => {
  if (['ArrowRight', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); next(); }
  if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); prev(); }
});

document.addEventListener('click', (e) => {
  if (e.clientX > window.innerWidth / 2) next(); else prev();
});

updateUI();