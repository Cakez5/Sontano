const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#primary-navigation');
const navLinkItems = Array.from(document.querySelectorAll('#primary-navigation a'));

function closeMenu() {
  if (!navToggle || !navLinks) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
  navLinks.classList.remove('is-open');
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    navToggle.setAttribute('aria-label', isExpanded ? 'Open menu' : 'Close menu');
    navLinks.classList.toggle('is-open', !isExpanded);
  });

  navLinkItems.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

const track = document.querySelector('.carousel-track');
const cards = Array.from(document.querySelectorAll('.gallery-card'));
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');

let index = 0;
let autoSlideTimer;

function getVisibleCount() {
  if (window.innerWidth < 560) return 1;
  if (window.innerWidth < 900) return 2;
  return 3;
}

function getMaxIndex() {
  return Math.max(0, cards.length - getVisibleCount());
}

function updateCarousel() {
  if (!track || cards.length === 0 || !prevButton || !nextButton) return;

  const maxIndex = getMaxIndex();
  index = Math.min(index, maxIndex);

  const cardGap = 16;
  const cardWidth = cards[0].getBoundingClientRect().width + cardGap;
  track.style.transform = `translateX(-${index * cardWidth}px)`;

  prevButton.disabled = index === 0;
  nextButton.disabled = index >= maxIndex;
  prevButton.style.opacity = index === 0 ? '0.45' : '1';
  nextButton.style.opacity = index >= maxIndex ? '0.45' : '1';
}

function goToNextSlide() {
  const maxIndex = getMaxIndex();
  index = index >= maxIndex ? 0 : index + 1;
  updateCarousel();
}

function resetAutoSlide() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(goToNextSlide, 5000);
}

if (prevButton && nextButton && track && cards.length > 0) {
  prevButton.addEventListener('click', () => {
    if (index > 0) {
      index -= 1;
      updateCarousel();
      resetAutoSlide();
    }
  });

  nextButton.addEventListener('click', () => {
    const maxIndex = getMaxIndex();
    if (index < maxIndex) {
      index += 1;
      updateCarousel();
      resetAutoSlide();
    }
  });

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
  resetAutoSlide();
}
