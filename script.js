const slides = document.querySelectorAll('.slide');
const progressBar = document.getElementById('progress-bar');
const counter = document.getElementById('counter');

let current = 0;

function goFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
}

function playInterviewVideo() {
  const video = document.getElementById('interview-video');
  if (video) {
    video.currentTime = 0;
    video.volume = 1.0;
    video.muted = false;
    video.play().catch(e => console.log("Ошибка автозапуска интервью: ", e));
  }
}

function playVideos(slide) {
  const videos = slide.querySelectorAll('video');
  videos.forEach(video => {
    video.currentTime = 0;
    video.muted = false;
    video.play().catch(e => console.log("Ошибка автозапуска: ", e));
  });
}

function pauseVideos(slide) {
  const videos = slide.querySelectorAll('video');
  videos.forEach(video => { video.pause(); });
}

function goTo(index) {
  if (index < 0 || index >= slides.length) return;
  
  pauseVideos(slides[current]);
  slides[current].classList.remove('active');
  current = index;
  slides[current].classList.add('active');
  
  if (slides[current].id === 'slide-scene') {
    const introVideo = document.getElementById('intro-video');
    if (introVideo) {
      introVideo.currentTime = 0;
      introVideo.muted = false;
      introVideo.play().catch(e => console.log("Ошибка: ", e));
    }
  } else if (slides[current].id === 'slide-interview') {
    playInterviewVideo(); 
  } else {
    playVideos(slides[current]); 
  }
  
  updateUI();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

function updateUI() {
  progressBar.style.width = ((current + 1) / slides.length * 100) + '%';
  counter.textContent = `${current + 1} / ${slides.length}`;
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && document.activeElement.tagName === 'VIDEO') return;
  if (['ArrowRight', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); next(); }
  if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); prev(); }
});

document.addEventListener('click', (e) => {
  if (e.target.tagName === 'VIDEO' || e.target.closest('button')) return;
  if (e.clientX > window.innerWidth / 2) next(); else prev();
});

updateUI();
