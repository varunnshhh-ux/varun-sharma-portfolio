/**
 * ============================================================================
 * VARUN SHARMA — PORTFOLIO JAVASCRIPT
 * Vanilla ES6+ Modular Codebase
 * ============================================================================
 */

(function () {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --------------------------------------------------------------------------
     1. Interactive Particle Constellation Canvas (Hero Background)
     -------------------------------------------------------------------------- */
  function initParticleCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 16000), 75);
    const maxDistance = 140;

    let mouse = {
      x: null,
      y: null,
      radius: 160
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 1.8 + 0.8;
        this.color = Math.random() > 0.4 ? 'rgba(0, 242, 254,' : 'rgba(99, 102, 241,';
        this.baseAlpha = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Subtle mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const fx = (dx / dist) * force * 1.2;
            const fy = (dy / dist) * force * 1.2;
            this.x -= fx;
            this.y -= fy;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${this.baseAlpha})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    initParticles();

    // Connect close particles with neural constellation lines
    function connectParticles() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    let animationId;
    let isVisible = true;

    // Pause rendering when tab is inactive to save battery & CPU
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (isVisible) animate();
    });

    function animate() {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      connectParticles();

      animationId = requestAnimationFrame(animate);
    }

    animate();

    // Debounced window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
      }, 200);
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     2. Hero Typewriter / Subtitle Animator
     -------------------------------------------------------------------------- */
  function initTypewriter() {
    const el = document.getElementById('typed-subtitle');
    if (!el) return;

    const phrases = [
      'CSE • DATA SCIENCE • AI',
      'AI AGENTS & AUTOMATION',
      'SOFTWARE DEVELOPMENT',
      'MACHINE LEARNING & DATA'
    ];

    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        el.textContent = currentPhrase.substring(0, charIndex);
      } else {
        charIndex++;
        el.textContent = currentPhrase.substring(0, charIndex);
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at full phrase
        isDeleting = true;
        setTimeout(typeLoop, 2200);
        return;
      } else if (isDeleting && charIndex === 0) {
        // Move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, 400);
        return;
      }

      const speed = isDeleting ? 40 : typingSpeed;
      setTimeout(typeLoop, speed);
    }

    // Start after initial delay
    setTimeout(typeLoop, 1800);
  }

  /* --------------------------------------------------------------------------
     3. Header Glassmorphism & Scroll Progress
     -------------------------------------------------------------------------- */
  function initHeaderAndProgress() {
    const header = document.getElementById('header');
    const progressBar = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    function onScroll() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Update header background on scroll
      if (header) {
        if (scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      // Update scroll progress bar
      if (progressBar && docHeight > 0) {
        const progress = (scrollY / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', Math.round(progress));
      }

      // Back to top visibility
      if (backToTop) {
        if (scrollY > 450) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     4. Scrollspy Active Navigation Links
     -------------------------------------------------------------------------- */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0.1
    });

    sections.forEach(section => observer.observe(section));
  }

  /* --------------------------------------------------------------------------
     5. Mobile Navigation Drawer
     -------------------------------------------------------------------------- */
  function initMobileNav() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const mobileCloseBtn = document.getElementById('mobile-close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-footer a');

    if (!menuToggle || !mobileNav || !mobileBackdrop) return;

    function openMenu() {
      mobileNav.classList.add('open');
      mobileBackdrop.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      mobileNav.classList.remove('open');
      mobileBackdrop.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) closeMenu();
      else openMenu();
    });

    if (mobileCloseBtn) {
      mobileCloseBtn.addEventListener('click', closeMenu);
    }

    mobileBackdrop.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* --------------------------------------------------------------------------
     6. Projects Category Filter
     -------------------------------------------------------------------------- */
  function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 20);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. Dynamic GitHub Repository Integration (with Fallback)
     -------------------------------------------------------------------------- */
  function initGitHubRepos() {
    const reposContainer = document.getElementById('github-repos-list');
    if (!reposContainer) return;

    // Default GitHub username (can be updated to Varun's actual GitHub profile handle)
    const githubUsername = 'varunsharma';

    // Optional API fetch: falls back gracefully if network unavailable or rate-limited
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=3`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
      .then(res => {
        if (!res.ok) throw new Error('GitHub API response not ok');
        return res.json();
      })
      .then(repos => {
        if (Array.isArray(repos) && repos.length > 0) {
          // Render live repository cards
          reposContainer.innerHTML = repos.map((repo, idx) => `
            <div class="glass-card repo-card reveal reveal-delay-${idx + 1}">
              <div class="repo-card-header">
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                  <span>${escapeHTML(repo.name)}</span>
                </a>
                <span class="repo-badge">${repo.private ? 'Private' : 'Public'}</span>
              </div>
              <p class="repo-desc">
                ${repo.description ? escapeHTML(repo.description) : 'Curated code repository & technical exploration.'}
              </p>
              <div class="repo-meta">
                ${repo.language ? `
                  <span class="repo-lang">
                    <span class="repo-lang-dot" style="background: ${getLanguageColor(repo.language)};"></span>
                    <span>${escapeHTML(repo.language)}</span>
                  </span>
                ` : ''}
                <span>★ ${repo.stargazers_count || 0}</span>
                <span>Updated ${formatDate(repo.updated_at)}</span>
              </div>
            </div>
          `).join('');

          // Trigger reveal on newly inserted cards
          initScrollReveals();
        }
      })
      .catch(() => {
        // Retain high quality fallback static cards silently without console spam
      });

    function escapeHTML(str) {
      if (!str) return '';
      return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag));
    }

    function getLanguageColor(lang) {
      const colors = {
        'Python': '#3572A5',
        'JavaScript': '#f1e05a',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'C': '#555555',
        'C++': '#f34b7d',
        'TypeScript': '#2b7489'
      };
      return colors[lang] || '#38bdf8';
    }

    function formatDate(dateStr) {
      if (!dateStr) return 'recently';
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  }

  /* --------------------------------------------------------------------------
     8. Contact Form Client-Side Validation
     -------------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const alertBox = document.getElementById('form-alert');
    const submitBtn = document.getElementById('btn-submit');

    if (!form || !alertBox) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    const groupName = document.getElementById('group-name');
    const groupEmail = document.getElementById('group-email');
    const groupMessage = document.getElementById('group-message');

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function checkFields() {
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        groupName.classList.add('has-error');
        isValid = false;
      } else {
        groupName.classList.remove('has-error');
      }

      // Validate Email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        groupEmail.classList.add('has-error');
        isValid = false;
      } else {
        groupEmail.classList.remove('has-error');
      }

      // Validate Message (at least 10 chars)
      if (messageInput.value.trim().length < 10) {
        groupMessage.classList.add('has-error');
        isValid = false;
      } else {
        groupMessage.classList.remove('has-error');
      }

      return isValid;
    }

    // Real-time error removal on input
    [nameInput, emailInput, messageInput].forEach(input => {
      if (!input) return;
      input.addEventListener('input', () => {
        input.parentElement.classList.remove('has-error');
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!checkFields()) {
        alertBox.className = 'form-alert';
        alertBox.style.display = 'none';
        return;
      }

      // Button loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Friendly demonstration response
        alertBox.className = 'form-alert success';
        alertBox.innerHTML = `
          <strong>Thank you, ${escapeInput(nameInput.value.trim())}!</strong><br>
          Your message has been received in this client-side demo. For immediate inquiries, you can reach Varun directly via email at <a href="mailto:varun.sharma.dev@example.com" style="text-decoration: underline; color: #ffffff;">varun.sharma.dev@example.com</a> or on <a href="https://linkedin.com" target="_blank" style="text-decoration: underline; color: #ffffff;">LinkedIn</a>.
        `;

        form.reset();
      }, 700);
    });

    function escapeInput(str) {
      return str.replace(/[&<>'"]/g, '');
    }
  }

  /* --------------------------------------------------------------------------
     9. Interactive Cursor Glow Follower
     -------------------------------------------------------------------------- */
  function initCursorGlow() {
    const cursor = document.getElementById('cursor-glow');
    if (!cursor || prefersReducedMotion) return;

    // Enable only for devices with hover pointer capability
    if (window.matchMedia('(pointer: fine)').matches) {
      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;
      let curX = mouseX;
      let curY = mouseY;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
      }, { passive: true });

      window.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
      });

      function renderCursor() {
        curX += (mouseX - curX) * 0.12;
        curY += (mouseY - curY) * 0.12;
        cursor.style.left = `${curX}px`;
        cursor.style.top = `${curY}px`;
        requestAnimationFrame(renderCursor);
      }

      renderCursor();
    }
  }

  /* --------------------------------------------------------------------------
     10. Scroll Reveal Animations (IntersectionObserver)
     -------------------------------------------------------------------------- */
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal');

    if (prefersReducedMotion) {
      revealElements.forEach(el => el.classList.add('active'));
      return;
    }

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('active'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* --------------------------------------------------------------------------
     DOM Ready Initialization
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initParticleCanvas();
    initTypewriter();
    initHeaderAndProgress();
    initScrollSpy();
    initMobileNav();
    initProjectFilters();
    initGitHubRepos();
    initContactForm();
    initCursorGlow();
    initScrollReveals();
  });

})();
