(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox?.querySelector('img');
  const lightboxCaption = lightbox?.querySelector('figcaption');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  const whatsappModal = document.querySelector('.whatsapp-modal');
  const whatsappClose = whatsappModal?.querySelector('[data-close-whatsapp]');
  let whatsappTrigger = null;

  menuToggle?.addEventListener('click', () => {
    const open = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.main-nav a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav?.classList.remove('is-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  const closeWhatsapp = () => {
    if (!whatsappModal) return;
    whatsappModal.hidden = true;
    document.body.classList.remove('no-scroll');
    whatsappTrigger?.focus();
  };

  document.querySelectorAll('[data-open-whatsapp]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (!whatsappModal) return;
      whatsappTrigger = trigger;
      whatsappModal.hidden = false;
      document.body.classList.add('no-scroll');
      whatsappClose?.focus();
    });
  });

  whatsappClose?.addEventListener('click', closeWhatsapp);
  whatsappModal?.addEventListener('click', (event) => {
    if (event.target === whatsappModal) closeWhatsapp();
  });

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove('no-scroll');
    lightboxImage.removeAttribute('src');
  };

  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      if (!lightbox) return;
      lightboxImage.src = item.dataset.image;
      lightboxImage.alt = item.querySelector('img')?.alt || '';
      lightboxCaption.textContent = item.dataset.caption || '';
      lightbox.hidden = false;
      document.body.classList.add('no-scroll');
      lightboxClose?.focus();
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox && !lightbox.hidden) closeLightbox();
    if (event.key === 'Escape' && whatsappModal && !whatsappModal.hidden) closeWhatsapp();
  });

  const year = document.querySelector('#current-year');
  if (year) year.textContent = new Date().getFullYear();
})();
