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
const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');
const error = document.getElementById('form-error');

function showFormMessage(type, message) {
  if (type === 'error' && error) {
    error.textContent = message;
    error.classList.add('show');
    if (success) success.classList.remove('show');
  }
  if (type === 'success' && success) {
    success.textContent = '✅ Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.';
    success.classList.add('show');
    if (error) error.classList.remove('show');
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function validateForm() {
  if (!form) return false;

  const fieldMap = {
    voornaam: 'Voornaam',
    achternaam: 'Achternaam',
    email: 'E-mailadres',
    telefoon: 'Telefoonnummer',
    onderwerp: 'Onderwerp',
    bericht: 'Uw bericht',
  };

  const requiredFields = form.querySelectorAll('[required]');
  for (const field of requiredFields) {
    const value = field.type === 'select-one' ? field.value : field.value.trim();
    if (!value) {
      showFormMessage('error', `Vul eerst het veld “${fieldMap[field.name] || field.name}” in.`);
      field.focus();
      return false;
    }
  }

  const emailField = form.querySelector('input[name="email"]');
  if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())) {
    showFormMessage('error', 'Vul een geldig e-mailadres in.');
    emailField.focus();
    return false;
  }

  return true;
}

if (form) {
  if (localStorage.getItem('hgKennelFormSent') === 'true') {
    showFormMessage('success');
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      showFormMessage('error', 'Vul alle verplichte velden in, inclusief onderwerp en een geldig e-mailadres.');
      return;
    }

    try {
      const formData = new FormData(form);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok || result.success !== true) {
        throw new Error(result.message || 'Het verzenden is mislukt.');
      }

      localStorage.setItem('hgKennelFormSent', 'true');
      showFormMessage('success');
      form.reset();
    } catch (submitError) {
      showFormMessage('error', submitError.message || 'Er ging iets mis bij het verzenden.');
    }
  });
}

