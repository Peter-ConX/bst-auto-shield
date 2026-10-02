/**
 * BST AUTO SHIELD - Official Client Scripts
 * Kettering, Northamptonshire, UK
 * Modern, High-Performance, Modular
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Business Data Configuration (Fully Editable)
  // ==========================================================================
  const BUSINESS_CONFIG = {
    name: "BST AUTO SHIELD",
    phone: "+44 7414 768308",
    phoneClean: "+447414768308",
    whatsapp: "+447414768308",
    whatsappUrl: "https://wa.me/447414768308",
    address: "1 Henson Way, Kettering, NN16 8PX, United Kingdom",
    plusCode: "C754+HM Kettering, United Kingdom",
    directionsUrl: "https://maps.google.com/?q=1+Henson+Way,+Kettering,+NN16+8PX",
    hours: [
      { day: "Monday", open: "09:00", close: "21:00", isOpen: true },
      { day: "Tuesday", open: "09:00", close: "21:00", isOpen: true },
      { day: "Wednesday", open: "09:00", close: "21:00", isOpen: true },
      { day: "Thursday", open: "09:00", close: "21:00", isOpen: true },
      { day: "Friday", open: "09:00", close: "21:00", isOpen: true },
      { day: "Saturday", open: "09:00", close: "21:00", isOpen: true },
      { day: "Sunday", open: null, close: null, isOpen: false }
    ]
  };

  // ==========================================================================
  // 2. Real-time Studio Status (Opening Hours Badge)
  // ==========================================================================
  function initBusinessStatus() {
    const statusBadges = document.querySelectorAll('[data-business-status]');
    if (!statusBadges.length) return;

    const now = new Date();
    // Use UK Timezone
    let ukDay, ukHour, ukMin;
    try {
      const ukDateParts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        weekday: 'narrow',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }).formatToParts(now);

      const dayIdx = now.getDay(); // 0 is Sunday
      ukDay = dayIdx;
      ukHour = now.getHours();
      ukMin = now.getMinutes();
    } catch (e) {
      ukDay = now.getDay();
      ukHour = now.getHours();
      ukMin = now.getMinutes();
    }

    const currentTotalMinutes = ukHour * 60 + ukMin;
    // BST Schedule: Mon(1) - Sat(6) 9:00 (540m) to 21:00 (1260m). Sun(0) Closed.
    const isSunday = ukDay === 0;
    const isWithinHours = !isSunday && currentTotalMinutes >= 540 && currentTotalMinutes < 1260;

    statusBadges.forEach(badge => {
      if (isSunday) {
        badge.innerHTML = `
          <span class="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span>
          <span>Closed Sunday • Reopens Mon 9:00 AM</span>
        `;
      } else if (isWithinHours) {
        badge.innerHTML = `
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2 shadow-[0_0_8px_#34d399]"></span>
          <span>Studio Open Now • Until 9:00 PM</span>
        `;
      } else if (currentTotalMinutes < 540) {
        badge.innerHTML = `
          <span class="inline-block w-2 h-2 rounded-full bg-slate-400 mr-2"></span>
          <span>Closed Now • Opens Today at 9:00 AM</span>
        `;
      } else {
        badge.innerHTML = `
          <span class="inline-block w-2 h-2 rounded-full bg-slate-400 mr-2"></span>
          <span>Closed Now • Opens Tomorrow at 9:00 AM</span>
        `;
      }
    });
  }

  // ==========================================================================
  // 3. Sticky Navigation & Scroll Progress
  // ==========================================================================
  function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ==========================================================================
  // 4. Mobile Menu Drawer
  // ==========================================================================
  function initMobileMenu() {
    const openBtn = document.getElementById('mobile-menu-open');
    const closeBtn = document.getElementById('mobile-menu-close');
    const drawer = document.getElementById('mobile-drawer');
    const navLinks = document.querySelectorAll('#mobile-drawer a');

    if (!openBtn || !drawer) return;

    const openMenu = () => {
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
      openBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
      openBtn.setAttribute('aria-expanded', 'false');
    };

    openBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // ==========================================================================
  // 5. Interactive Before / After Comparison Slider
  // ==========================================================================
  function initBeforeAfterSlider() {
    const container = document.getElementById('comparison-container');
    const overlay = document.getElementById('comparison-overlay');
    const overlayImg = document.getElementById('comparison-overlay-img');
    const handle = document.getElementById('comparison-handle');
    const percentBadge = document.getElementById('comparison-percent');

    if (!container || !overlay || !handle || !overlayImg) return;

    let isDragging = false;

    const updateSliderWidth = () => {
      const containerWidth = container.clientWidth;
      overlayImg.style.width = `${containerWidth}px`;
    };

    const setPosition = (percent) => {
      const clamped = Math.max(5, Math.min(95, percent));
      overlay.style.width = `${clamped}%`;
      handle.style.left = `${clamped}%`;
      if (percentBadge) {
        percentBadge.textContent = `${Math.round(clamped)}%`;
      }
    };

    const handleMove = (clientX) => {
      const rect = container.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const percent = (offsetX / rect.width) * 100;
      setPosition(percent);
    };

    // Mouse events
    const onMouseDown = (e) => {
      isDragging = true;
      handle.classList.add('active');
      handleMove(e.clientX);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const onMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        handle.classList.remove('active');
      }
    };

    // Touch events
    const onTouchStart = (e) => {
      isDragging = true;
      handle.classList.add('active');
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onTouchMove = (e) => {
      if (!isDragging) return;
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
      handle.classList.remove('active');
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Keyboard accessibility on handle
    handle.setAttribute('tabindex', '0');
    handle.setAttribute('role', 'slider');
    handle.setAttribute('aria-valuemin', '5');
    handle.setAttribute('aria-valuemax', '95');
    handle.setAttribute('aria-valuenow', '50');
    handle.setAttribute('aria-label', 'Tint comparison slider');

    handle.addEventListener('keydown', (e) => {
      const current = parseFloat(overlay.style.width) || 50;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        setPosition(current - 5);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        setPosition(current + 5);
      }
    });

    window.addEventListener('resize', updateSliderWidth);
    updateSliderWidth();
    setPosition(50);
  }

  // ==========================================================================
  // 6. Gallery Filtering & Lightbox Modal
  // ==========================================================================
  function initGallery() {
    const filterButtons = document.querySelectorAll('[data-gallery-filter]');
    const galleryItems = document.querySelectorAll('[data-gallery-category]');
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalTitle = document.getElementById('lightbox-title');
    const modalDesc = document.getElementById('lightbox-desc');
    const modalClose = document.getElementById('lightbox-close');

    // Filter logic
    if (filterButtons.length && galleryItems.length) {
      filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const filter = btn.getAttribute('data-gallery-filter');

          // Toggle button active classes
          filterButtons.forEach(b => {
            b.classList.remove('bg-cyan-500', 'text-slate-950', 'font-bold', 'border-cyan-400');
            b.classList.add('bg-surface-raised', 'text-slate-300', 'border-white/10');
          });
          btn.classList.add('bg-cyan-500', 'text-slate-950', 'font-bold', 'border-cyan-400');
          btn.classList.remove('bg-surface-raised', 'text-slate-300', 'border-white/10');

          // Filter cards
          galleryItems.forEach(item => {
            const categories = item.getAttribute('data-gallery-category').split(' ');
            if (filter === 'all' || categories.includes(filter)) {
              item.style.display = '';
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
              }, 20);
            } else {
              item.style.opacity = '0';
              item.style.transform = 'scale(0.97)';
              setTimeout(() => {
                item.style.display = 'none';
              }, 200);
            }
          });
        });
      });
    }

    // Lightbox modal logic
    if (modal && modalImg) {
      const openLightbox = (src, title, desc) => {
        modalImg.src = src;
        if (modalTitle) modalTitle.textContent = title || "BST AUTO SHIELD";
        if (modalDesc) modalDesc.textContent = desc || "Kettering Studio";
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      };

      const closeLightbox = () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      };

      galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const img = item.querySelector('img');
          const title = item.getAttribute('data-title') || (img ? img.alt : '');
          const desc = item.getAttribute('data-desc') || '';
          if (img) {
            openLightbox(img.src, title, desc);
          }
        });
      });

      if (modalClose) modalClose.addEventListener('click', closeLightbox);

      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeLightbox();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
          closeLightbox();
        }
      });
    }
  }

  // ==========================================================================
  // 7. Service Selection -> Auto-fill Quote Form
  // ==========================================================================
  function initServiceQuoteButtons() {
    const serviceButtons = document.querySelectorAll('[data-select-service]');
    const serviceSelect = document.getElementById('quote-service');
    const quoteSection = document.getElementById('quote');
    const vehicleInput = document.getElementById('vehicle-make');

    if (!serviceButtons.length || !serviceSelect) return;

    serviceButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetService = btn.getAttribute('data-select-service');
        if (targetService) {
          serviceSelect.value = targetService;
        }

        // Smooth scroll to quote form
        if (quoteSection) {
          quoteSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            if (vehicleInput) vehicleInput.focus();
          }, 600);
        }
      });
    });
  }

  // ==========================================================================
  // 8. Quote Form Validation & Real Submission State
  // ==========================================================================
  function initQuoteForm() {
    const form = document.getElementById('quote-form');
    const formContainer = document.getElementById('quote-form-container');
    const confirmationContainer = document.getElementById('quote-confirmation-container');
    const confirmationDetails = document.getElementById('confirmation-details');
    const resetBtn = document.getElementById('reset-quote-form');

    if (!form || !formContainer || !confirmationContainer) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Gather values
      const name = document.getElementById('client-name')?.value.trim();
      const phone = document.getElementById('client-phone')?.value.trim();
      const email = document.getElementById('client-email')?.value.trim() || 'Not provided';
      const vehicleMake = document.getElementById('vehicle-make')?.value.trim();
      const vehicleModel = document.getElementById('vehicle-model')?.value.trim();
      const vehicleYear = document.getElementById('vehicle-year')?.value.trim();
      const service = document.getElementById('quote-service')?.value;
      const contactMethod = document.querySelector('input[name="contact_method"]:checked')?.value || 'WhatsApp';
      const notes = document.getElementById('quote-notes')?.value.trim() || 'No additional notes specified';

      if (!name || !phone || !vehicleMake || !vehicleModel || !vehicleYear || !service) {
        alert('Please fill in all required vehicle details and your contact telephone.');
        return;
      }

      // Populate confirmation card
      if (confirmationDetails) {
        confirmationDetails.innerHTML = `
          <div class="space-y-2 text-sm text-slate-300">
            <p><span class="text-slate-400 font-mono uppercase text-xs">Customer:</span> <strong class="text-white">${escapeHtml(name)}</strong></p>
            <p><span class="text-slate-400 font-mono uppercase text-xs">Phone:</span> <strong class="text-cyan-400">${escapeHtml(phone)}</strong></p>
            <p><span class="text-slate-400 font-mono uppercase text-xs">Vehicle:</span> <strong class="text-white">${escapeHtml(vehicleYear)} ${escapeHtml(vehicleMake)} ${escapeHtml(vehicleModel)}</strong></p>
            <p><span class="text-slate-400 font-mono uppercase text-xs">Service Requested:</span> <strong class="text-cyan-400">${escapeHtml(service)}</strong></p>
            <p><span class="text-slate-400 font-mono uppercase text-xs">Preferred Contact:</span> ${escapeHtml(contactMethod)}</p>
            <p><span class="text-slate-400 font-mono uppercase text-xs">Notes / Shade:</span> ${escapeHtml(notes)}</p>
          </div>
        `;
      }

      // Transition smoothly
      formContainer.classList.add('hidden');
      confirmationContainer.classList.remove('hidden');
      confirmationContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        confirmationContainer.classList.add('hidden');
        formContainer.classList.remove('hidden');
      });
    }
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }

  // ==========================================================================
  // Initialize on DOM Ready
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initBusinessStatus();
    initHeaderScroll();
    initMobileMenu();
    initBeforeAfterSlider();
    initGallery();
    initServiceQuoteButtons();
    initQuoteForm();
  });

})();
