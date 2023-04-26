'use strict';

// Important
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOptions = { root: null, threshold: 0.1 };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

///////////////////////////////////////
// Modal window

// const modal = document.querySelector('.modal');
// const overlay = document.querySelector('.overlay');
// const btnCloseModal = document.querySelector('.btn--close-modal');
// const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// const openModal = function () {
//   modal.classList.remove('hidden');
//   overlay.classList.remove('hidden');
// };

// const closeModal = function () {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// };

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
//     closeModal();
//   }
// });

// adding cookie message

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We use cookies to improve performance and analytics <button class="btn btn--close-cookie">Go It!</button>"';

// document.querySelector('.header').append(message);

// Adding smooth scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Adding Tapped Component operations__content--active
const myButtons = document
  .querySelector('.operations__tab-container')
  .querySelectorAll('button');
const content = document.querySelectorAll('.operations__content');

myButtons.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    [...btn.parentElement.children].forEach(sib =>
      sib.classList.remove('operations__tab--active')
    );
    btn.classList.add('operations__tab--active');
    [...content[i].parentElement.children].forEach(sib =>
      sib.classList.remove('operations__content--active')
    );
    content[i].classList.add('operations__content--active');
  });
});

// Menu Fade Animation
const nav = document.querySelector('.nav');
const handelHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
  }
};
nav.addEventListener('mouseover', e => handelHover(e, 0.5));
nav.addEventListener('mouseout', e => handelHover(e, 1));

// Sticky Navigation (Important New way for best performance)
const header = document.querySelector('.header');
const stickyNav = function (entry) {
  const [a] = entry;

  if (!a.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
});
headerObserver.observe(header);

// Reveal Sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, obs) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  obs.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
});

// Lazy Loading Images
const imgTarget = document.querySelectorAll('img[data-src]');
const loadImages = function (entry, obs) {
  const [a] = entry;
  if (!a.isIntersecting) return;
  a.target.src = a.target.dataset.src;
  a.target.classList.remove('lazy-img');
  obs.unobserve(a.target);
};
const imgObserver = new IntersectionObserver(loadImages, {
  root: null,
  rootMargin: '-200px',
  threshold: 0.1,
});
imgTarget.forEach(img => {
  imgObserver.observe(img);
});
// Slider
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currentSlide = 0;
const maxSlideLength = slides.length - 1;

// slider.style.overflow = 'visible';

slides.forEach((s, i) => {
  s.style.transform = `translateX(${100 * i}%)`;
});

btnRight.addEventListener('click', () => {
  if (maxSlideLength === currentSlide) currentSlide = 0;
  else currentSlide++;
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
});

btnLeft.addEventListener('click', () => {
  if (0 === currentSlide) currentSlide = maxSlideLength;
  else currentSlide--;
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
});
