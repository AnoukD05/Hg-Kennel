// Nav scroll shadow
const nav = document.getElementById('main-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

// Lightbox for gallery images
const galleryItems = document.querySelectorAll('.gallery-item img');
if (galleryItems.length) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<div class="lightbox-inner"><button class="lightbox-close" type="button" aria-label="Sluit afbeelding">×</button><img src="" alt="Vergrote afbeelding"></div>';
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeButton = lightbox.querySelector('.lightbox-close');

  const closeLightbox = () => lightbox.classList.remove('open');

  galleryItems.forEach((img) => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });

  closeButton.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });
}

// Contact form
function submitForm() {
  const success = document.getElementById('form-success');
  if (success) {
    success.classList.add('show');
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
