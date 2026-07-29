/* ==========================================================================
   DAVID KAYODE - PERSONAL PORTFOLIO JAVASCRIPT
   Interactivity, Scroll Observer Animations, Typewriter & Form Feedback
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. TYPEWRITER EFFECT IN HERO SECTION
  initTypewriter();

  // 2. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  initScrollReveal();

  // 3. NAVBAR SCROLL EFFECT & ACTIVE NAVIGATION TRACKING
  initNavbarScroll();

  // 4. SKILL BARS ANIMATION ON SCROLL
  initSkillBars();

  // 5. CONTACT FORM INTERACTIVITY
  initContactForm();

  // 6. BACK TO TOP BUTTON
  initBackToTop();
});

/* --------------------------------------------------------------------------
   1. TYPEWRITER EFFECT
   -------------------------------------------------------------------------- */
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter-text');
  if (!typewriterElement) return;

  const phrases = [
    'Software Engineer',
    'HTML5 & CSS3 Architect',
    'Bootstrap 5 Specialist',
    'Git Workflow Expert',
    'UI/UX Craftsman'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of phrase
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* --------------------------------------------------------------------------
   2. SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   3. NAVBAR SCROLL EFFECT & ACTIVE NAVIGATION TRACKING
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Sticky navbar styling
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link updates
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu close on click
  const navbarCollapse = document.querySelector('.navbar-collapse');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. SKILL BARS ANIMATION
   -------------------------------------------------------------------------- */
function initSkillBars() {
  const skillSection = document.getElementById('skills');
  const progressFills = document.querySelectorAll('.skill-progress-fill');
  if (!skillSection || progressFills.length === 0) return;

  let animated = false;

  const observerOptions = {
    root: null,
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        progressFills.forEach(fill => {
          const targetWidth = fill.getAttribute('data-progress') || '85%';
          fill.style.width = targetWidth;
        });
        animated = true;
      }
    });
  }, observerOptions);

  observer.observe(skillSection);
}

/* --------------------------------------------------------------------------
   5. CONTACT FORM INTERACTIVITY
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Disable button & show spinner state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending Message...`;

    // Simulate async network request
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Show success alert
      if (alertBox) {
        alertBox.className = 'form-message-alert alert alert-success bg-gold text-dark font-weight-bold d-block';
        alertBox.innerHTML = `<i class="fa-solid fa-circle-check me-2"></i> Thank you! Your message has been received. David will get back to you shortly.`;
      }

      // Reset form fields
      contactForm.reset();

      // Hide message after 5 seconds
      setTimeout(() => {
        if (alertBox) alertBox.classList.replace('d-block', 'd-none');
      }, 5000);
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
   6. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
