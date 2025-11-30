/**
 * Hervik Dugnad Landing Page - Main JavaScript
 * Handles: language switching, smooth scrolling, mobile menu, sticky header, FAQ accordion, contact form
 */

// ========================================
// 0. LANGUAGE SWITCHING
// ========================================
let currentLang = localStorage.getItem('language') || 'no';
// Optional translations object (loaded from JSON) for key-based i18n
let translations = {};

// Set initial language on page load
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;

  // Update all elements with data-no and data-en attributes
  document.querySelectorAll('[data-no][data-en]').forEach(element => {
    const text = element.getAttribute(`data-${lang}`);
    if (text) {
      element.textContent = text;
    }
  });

  // Update form placeholders
  document.querySelectorAll('[data-no-placeholder][data-en-placeholder]').forEach(input => {
    const placeholder = input.getAttribute(`data-${lang}-placeholder`);
    if (placeholder) {
      input.placeholder = placeholder;
    }
  });

  // Update active state on language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Apply key-based translations if translations.json was loaded
  try {
    document.querySelectorAll('[data-i18n-key]').forEach(el => {
      const key = el.getAttribute('data-i18n-key');
      const value = getTranslationByKey(key, lang);
      if (value) el.textContent = value;
    });

    document.querySelectorAll('img[data-i18n-alt-key]').forEach(img => {
      const key = img.getAttribute('data-i18n-alt-key');
      const value = getTranslationByKey(key, lang);
      if (value) img.alt = value;
    });
  } catch (e) {
    // ignore errors — fallback to data-no/data-en handled above
  }

  console.log(`🌐 Language changed to: ${lang === 'no' ? 'Norwegian' : 'English'}`);
}

// Helper: look up translation by dotted key, e.g. 'products.1.title'
function getTranslationByKey(key, lang) {
  if (!translations || !key) return null;
  const parts = key.split('.');
  let node = translations;
  for (let p of parts) {
    if (node[p] === undefined) return null;
    node = node[p];
  }
  return (node && node[lang]) ? node[lang] : null;
}

// Language button click handlers
document.addEventListener('DOMContentLoaded', () => {
  // Try to load key-based translations first, then apply language
  fetch('locales/translations.json')
    .then(resp => resp.json())
    .then(data => {
      translations = data || {};
      setLanguage(currentLang);
    })
    .catch(err => {
      // If translations fail to load, fallback to data-no/data-en attributes
      console.warn('Could not load translations.json:', err);
      setLanguage(currentLang);
    });

  // Add click handlers to language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
    });
  });
});

// ========================================
// 1. SMOOTH SCROLL NAVIGATION
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Close mobile menu if open
      const nav = document.querySelector('.nav');
      const menuToggle = document.querySelector('.menu-toggle');
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.classList.remove('open');
      }

      // Smooth scroll to target
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// 2. STICKY HEADER - ADD CLASS ON SCROLL
// ========================================
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const header = document.getElementById('header');

  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScrollY = window.scrollY;
});

// ========================================
// 3. MOBILE MENU TOGGLE
// ========================================
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.classList.toggle('open');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      menuToggle.classList.remove('open');
    }
  });
}

// ========================================
// 4. FAQ ACCORDION
// ========================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    const isOpen = faqItem.classList.contains('open');

    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('open');
    });

    // Toggle current item
    if (!isOpen) {
      faqItem.classList.add('open');
    }
  });
});

// ========================================
// 5. CONTACT FORM - MAILTO HANDLER
// ========================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Create mailto link with pre-filled content
    const subject = encodeURIComponent('Kontakt fra landing page');
    const body = encodeURIComponent(
      `Navn: ${name}\nE-post: ${email}\n\nMelding:\n${message}`
    );

    const mailtoLink = `mailto:post@speiderdugnad.no?subject=${subject}&body=${body}`;

    // Open default email client
    window.location.href = mailtoLink;

    // Optional: Show success message
    showFormMessage('E-postklient åpnes... Send meldingen derfra.', 'success');

    // Reset form after a delay
    setTimeout(() => {
      contactForm.reset();
    }, 1000);
  });
}

// ========================================
// 6. FORM MESSAGE HELPER
// ========================================
function showFormMessage(message, type = 'success') {
  // Remove existing message if any
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message element
  const messageEl = document.createElement('div');
  messageEl.className = `form-message form-message-${type}`;
  messageEl.textContent = message;
  messageEl.style.cssText = `
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 8px;
    text-align: center;
    font-weight: 500;
    background: ${type === 'success' ? '#e8f5e9' : '#ffebee'};
    color: ${type === 'success' ? '#2c5f2d' : '#d32f2f'};
  `;

  // Insert after form
  contactForm.parentNode.insertBefore(messageEl, contactForm.nextSibling);

  // Remove message after 5 seconds
  setTimeout(() => {
    messageEl.style.transition = 'opacity 0.3s ease';
    messageEl.style.opacity = '0';
    setTimeout(() => messageEl.remove(), 300);
  }, 5000);
}

// ========================================
// 7. LAZY LOAD IMAGES (Performance)
// ========================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  // Observe all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// 8. INITIALIZE ON DOM READY
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Hervik Dugnad landing page loaded successfully!');

  // Add smooth fade-in animation to sections
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
  });
});

// ========================================
// 9. PERFORMANCE - LOG PAGE LOAD TIME
// ========================================
window.addEventListener('load', () => {
  if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
  }
});
