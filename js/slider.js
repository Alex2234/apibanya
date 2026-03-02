/* ============================================
   АпиБаня — Slider Component
   CSS scroll-snap based with JS enhancements
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.slider').forEach(initSlider);
});

function initSlider(sliderEl) {
  const track = sliderEl.querySelector('.slider__track');
  const slides = sliderEl.querySelectorAll('.slider__slide');
  const prevBtn = sliderEl.querySelector('.slider__arrow--prev');
  const nextBtn = sliderEl.querySelector('.slider__arrow--next');
  const dotsContainer = sliderEl.querySelector('.slider__dots');
  const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider__dot') : [];

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let touchStartX = null;
  const totalSlides = slides.length;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentIndex = index;

    const slideWidth = slides[0].offsetWidth;
    track.scrollTo({
      left: slideWidth * currentIndex,
      behavior: 'smooth'
    });

    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
    });
  }

  // Arrow buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  // Dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Touch swipe
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }
    touchStartX = null;
  }, { passive: true });

  // Track scroll position to sync dots
  let scrollTimeout;
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const slideWidth = slides[0].offsetWidth;
      const newIndex = Math.round(track.scrollLeft / slideWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
        currentIndex = newIndex;
        updateDots();
      }
    }, 100);
  }, { passive: true });

  // Keyboard navigation
  sliderEl.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
    if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
  });

  // Initialize
  updateDots();
}
