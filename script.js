/**
 * MUCHAMAD NUR FAZRI — PERSONAL PORTFOLIO & BRANDING
 * Vanilla JavaScript (Interactive features, scroll animations, drawer menu, modal dialog)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DYNAMIC FOOTER YEAR
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. STICKY NAVBAR SCROLL STATE
  const navbarWrapper = document.getElementById('navbar');
  const handleScrollNavbar = () => {
    if (window.scrollY > 40) {
      navbarWrapper?.classList.add('scrolled');
    } else {
      navbarWrapper?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScrollNavbar, { passive: true });
  handleScrollNavbar();

  // 3. MOBILE DRAWER NAVIGATION
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const drawerCloseBtn = document.getElementById('drawer-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const drawerActionBtn = document.querySelector('.drawer-action-btn');

  const openDrawer = () => {
    mobileDrawer?.classList.add('open');
    mobileOverlay?.classList.add('active');
    hamburgerBtn?.setAttribute('aria-expanded', 'true');
    mobileDrawer?.setAttribute('aria-hidden', 'false');
    mobileOverlay?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer?.classList.remove('open');
    mobileOverlay?.classList.remove('active');
    hamburgerBtn?.setAttribute('aria-expanded', 'false');
    mobileDrawer?.setAttribute('aria-hidden', 'true');
    mobileOverlay?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  hamburgerBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  mobileOverlay?.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
  drawerActionBtn?.addEventListener('click', closeDrawer);

  // Close drawer on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer?.classList.contains('open')) {
        closeDrawer();
      }
      closeProjectModal();
    }
  });

  // 4. ACTIVE LINK HIGHLIGHTING ON SCROLL
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');

  const updateActiveLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    if (scrollY < 100) {
      desktopNavLinks.forEach((link) => link.classList.remove('active'));
    }
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // 5. INTERSECTION OBSERVER FOR SCROLL REVEAL
  const revealElements = document.querySelectorAll('.reveal-fade');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }

  // 6. TOAST NOTIFICATION UTILITY
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  const showToast = (message) => {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // 7. COPY EMAIL TO CLIPBOARD
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyEmailText = document.getElementById('copy-email-text');

  copyEmailBtn?.addEventListener('click', async () => {
    const emailToCopy = copyEmailBtn.getAttribute('data-email') || 'muchamadnur.fazri@example.com';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = emailToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      if (copyEmailText) {
        const originalText = copyEmailText.textContent;
        copyEmailText.textContent = 'Email Tersalin!';
        setTimeout(() => {
          copyEmailText.textContent = originalText;
        }, 2500);
      }

      showToast(`Alamat email ${emailToCopy} berhasil disalin!`);
    } catch (err) {
      console.error('Gagal menyalin:', err);
      showToast('Gagal menyalin otomatis. Silakan salin manual.');
    }
  });

  // 8. PROJECT MODAL INTERACTION
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalOkBtn = document.getElementById('modal-ok-btn');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalTags = document.getElementById('modal-tags');
  const modalStatusText = document.getElementById('modal-status-text');

  const projectData = {
    'modal-project-1': {
      category: 'MANAJEMEN STRATEGIS',
      title: 'Business Case Study',
      status: 'Contoh Proyek Terstruktur (Placeholder Siap Pakai)',
      desc: 'Simulasi analisis model bisnis dan efisiensi operasional UMKM. Proyek ini membedah alur rantai pasok (supply chain), analisis kekuatan dan kelemahan bisnis menggunakan metode SWOT terperinci, serta merumuskan rekomendasi strategi pertumbuhan berkelanjutan yang relevan dengan kebutuhan bisnis masa kini.',
      tags: ['Analisis SWOT', 'Riset Pasar', 'Manajemen Operasional', 'Strategi Bisnis', 'Efisiensi Biaya'],
    },
    'modal-project-2': {
      category: 'INFRASTRUKTUR TEKNOLOGI',
      title: 'Networking Exploration',
      status: 'Dokumentasi Eksplorasi Mandiri',
      desc: 'Dokumentasi simulasi jaringan lokal sederhana yang dirancang untuk menguji konfigurasi topologi bintang, pemahaman skema subnetting IPv4/IPv6, serta mekanisme packet switching. Memperlihatkan ketertarikan mendalam pada infrastruktur perangkat keras dan konektivitas data.',
      tags: ['Local Area Network', 'IP Addressing', 'Subnetting', 'Device Troubleshooting', 'Hardware Setup'],
    },
    'modal-project-3': {
      category: 'KEPEMIMPINAN & KOLABORASI',
      title: 'Teamwork & Organization',
      status: 'Studi Kasus Kolaborasi Tim & Dinamika Kelompok',
      desc: 'Penerapan filosofi sportivitas dan disiplin lapangan futsal ke dalam dinamika kerja organisasi. Mengulas bagaimana koordinasi cepat di bawah tekanan, pembagian peran kerja yang adil, serta komunikasi yang transparan dapat meningkatkan produktivitas serta kekompakan kelompok.',
      tags: ['Team Leadership', 'Time Management', 'Sports Mindset', 'Komunikasi Efektif', 'Resolusi Masalah'],
    },
  };

  const openProjectModal = (projectId) => {
    const data = projectData[projectId];
    if (!data || !projectModal) return;

    if (modalCategory) modalCategory.textContent = data.category;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalStatusText) modalStatusText.textContent = data.status;
    if (modalDescription) modalDescription.textContent = data.desc;

    if (modalTags) {
      modalTags.innerHTML = '';
      data.tags.forEach((tagText) => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'tag';
        tagSpan.textContent = tagText;
        modalTags.appendChild(tagSpan);
      });
    }

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    if (!mobileDrawer?.classList.contains('open')) {
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('.open-project-modal').forEach((button) => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      if (modalId) openProjectModal(modalId);
    });
  });

  modalCloseBtn?.addEventListener('click', closeProjectModal);
  modalOkBtn?.addEventListener('click', closeProjectModal);

  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  // 9. CLIENT-SIDE QUICK CONTACT FORM (MAILTO GENERATOR)
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('sender-name')?.value.trim();
    const subject = document.getElementById('sender-subject')?.value;
    const message = document.getElementById('sender-message')?.value.trim();

    if (!name || !message) {
      showToast('Harap lengkapi nama dan pesan Anda.');
      return;
    }

    const recipient = 'muchamadnur.fazri@example.com';
    const emailSubject = encodeURIComponent(`[${subject}] Pesan dari ${name} via Website Portofolio`);
    const emailBody = encodeURIComponent(
      `Halo Muchamad Nur Fazri,\n\nNama saya: ${name}\nTopik: ${subject}\n\nPesan:\n${message}\n\n---\nDikirim melalui formulir landing page https://muchamadnurf-tech.github.io/`
    );

    const mailtoUrl = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
    showToast('Membuka aplikasi email Anda...');
    window.location.href = mailtoUrl;
  });

  // ==========================================================================
  // 10. DYNAMIC AUTOMATIC BACKGROUND ENGINE (ASTRONOMY & NETWORKING PARTICLES)
  // ==========================================================================
  function initDynamicBackground() {
    const canvas = document.getElementById('bg-particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = motionQuery.matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let animationFrameId = null;
    let isRunning = false;

    // Glow Orb Elements for subtle parallax
    const orbOrange = document.getElementById('glow-orb-orange');
    const orbLime = document.getElementById('glow-orb-lime');
    const orbAccent = document.getElementById('glow-orb-accent');
    const orbBr = document.getElementById('glow-orb-br');

    // Mouse Tracking (Subtle interactive steering)
    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
      radius: 120
    };

    // Color Palette Tokens
    const colorOrange = 'rgba(255, 99, 61, ';
    const colorLime = 'rgba(213, 255, 63, ';
    const colorWhite = 'rgba(244, 241, 233, ';

    function getParticleCount() {
      const w = window.innerWidth;
      if (w < 640) return 20;
      if (w < 1024) return 32;
      return 46;
    }

    class Particle {
      constructor(initial = true) {
        this.reset(initial);
      }

      reset(initial = false) {
        this.x = initial ? Math.random() * width : (Math.random() < 0.5 ? -10 : width + 10);
        this.y = initial ? Math.random() * height : Math.random() * height;

        // Velocity: Very gentle, continuous drift
        const speed = 0.22 + Math.random() * 0.38;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        // Type distribution: 55% dot, 22% cross, 15% diamond, 8% ring
        const rand = Math.random();
        if (rand < 0.55) {
          this.type = 'dot';
          this.size = 1.2 + Math.random() * 1.6;
        } else if (rand < 0.77) {
          this.type = 'cross';
          this.size = 4 + Math.random() * 3;
        } else if (rand < 0.92) {
          this.type = 'diamond';
          this.size = 3.5 + Math.random() * 2.5;
        } else {
          this.type = 'ring';
          this.size = 3.5 + Math.random() * 2.5;
        }

        // Color distribution
        const colRand = Math.random();
        if (colRand < 0.45) {
          this.color = colorOrange;
        } else if (colRand < 0.8) {
          this.color = colorLime;
        } else {
          this.color = colorWhite;
        }

        this.baseAlpha = 0.2 + Math.random() * 0.3;
        this.alpha = this.baseAlpha;
        this.pulseSpeed = 0.015 + Math.random() * 0.02;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.012;
        this.parallaxFactor = 0.04 + Math.random() * 0.08;
      }

      update(time) {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotSpeed;

        // Subtle alpha pulsation
        this.alpha = this.baseAlpha + Math.sin(time * this.pulseSpeed + this.pulsePhase) * 0.12;

        // Gentle mouse interaction (steer softly away)
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const rSq = mouse.radius * mouse.radius;

          if (distSq < rSq && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / mouse.radius) * 0.35;
            this.x += (dx / dist) * force;
            this.y += (dy / dist) * force;
          }
        }

        // Wrap around boundaries seamlessly
        const pad = 24;
        if (this.x < -pad) this.x = width + pad;
        if (this.x > width + pad) this.x = -pad;
        if (this.y < -pad) this.y = height + pad;
        if (this.y > height + pad) this.y = -pad;
      }

      draw(scrollYOffset) {
        // Compute parallax vertical position
        const yOffset = (scrollYOffset * this.parallaxFactor) % (height + 40);
        let drawY = this.y - yOffset;
        if (drawY < -20) drawY += height + 40;
        if (drawY > height + 20) drawY -= height + 40;

        ctx.save();
        ctx.translate(this.x, drawY);
        ctx.rotate(this.rotation);

        const currentAlpha = Math.max(0.05, Math.min(0.65, this.alpha));
        ctx.fillStyle = this.color + currentAlpha + ')';
        ctx.strokeStyle = this.color + currentAlpha + ')';

        switch (this.type) {
          case 'dot':
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
            break;

          case 'cross':
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(-this.size, 0);
            ctx.lineTo(this.size, 0);
            ctx.moveTo(0, -this.size);
            ctx.lineTo(0, this.size);
            ctx.stroke();
            break;

          case 'diamond':
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, -this.size);
            ctx.lineTo(this.size * 0.75, 0);
            ctx.lineTo(0, this.size);
            ctx.lineTo(-this.size * 0.75, 0);
            ctx.closePath();
            ctx.stroke();
            break;

          case 'ring':
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.stroke();
            break;
        }

        ctx.restore();
      }
    }

    function createParticles() {
      const count = getParticleCount();
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(true));
      }
    }

    // Network connection lines between nodes (representing connectivity & circuits)
    function drawConnections(scrollYOffset) {
      const maxDist = width < 768 ? 85 : 120;
      const maxDistSq = maxDist * maxDist;
      const len = particles.length;

      for (let i = 0; i < len; i++) {
        const p1 = particles[i];
        const yOffset1 = (scrollYOffset * p1.parallaxFactor) % (height + 40);
        let y1 = p1.y - yOffset1;
        if (y1 < -20) y1 += height + 40;
        if (y1 > height + 20) y1 -= height + 40;

        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const yOffset2 = (scrollYOffset * p2.parallaxFactor) % (height + 40);
          let y2 = p2.y - yOffset2;
          if (y2 < -20) y2 += height + 40;
          if (y2 > height + 20) y2 -= height + 40;

          const dx = p1.x - p2.x;
          const dy = y1 - y2;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.15;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(213, 255, 63, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(p1.x, y1);
            ctx.lineTo(p2.x, y2);
            ctx.stroke();
          }
        }
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      createParticles();

      if (prefersReducedMotion) {
        drawStatic();
      }
    }

    let scrollY = window.pageYOffset || 0;
    let ticking = false;

    function handleScroll() {
      scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          applyScrollParallax(scrollY);
          ticking = false;
        });
        ticking = true;
      }
    }

    function applyScrollParallax(sY) {
      if (prefersReducedMotion) return;
      const factorOrange = sY * 0.05;
      const factorLime = -sY * 0.04;
      const factorAccent = sY * 0.025;
      const factorBr = -sY * 0.035;

      if (orbOrange) orbOrange.style.transform = `translate3d(0, ${factorOrange}px, 0)`;
      if (orbLime) orbLime.style.transform = `translate3d(0, ${factorLime}px, 0)`;
      if (orbAccent) orbAccent.style.transform = `translate3d(0, ${factorAccent}px, 0)`;
      if (orbBr) orbBr.style.transform = `translate3d(0, ${factorBr}px, 0)`;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    function animate(timestamp) {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      const time = timestamp * 0.001;
      const len = particles.length;
      for (let i = 0; i < len; i++) {
        particles[i].update(time);
        particles[i].draw(scrollY);
      }

      drawConnections(scrollY);

      animationFrameId = window.requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (prefersReducedMotion) {
        drawStatic();
        return;
      }
      if (!isRunning) {
        isRunning = true;
        animationFrameId = window.requestAnimationFrame(animate);
      }
    }

    function stopAnimation() {
      isRunning = false;
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    function drawStatic() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw(0);
      }
      drawConnections(0);
    }

    // Motion query listener
    motionQuery.addEventListener('change', (e) => {
      prefersReducedMotion = e.matches;
      if (prefersReducedMotion) {
        stopAnimation();
        drawStatic();
      } else {
        startAnimation();
      }
    });

    // Mouse Tracking
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    });

    // Auto-pause when tab is hidden to save 100% CPU/battery
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    });

    // Resize listener with debounce
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }, { passive: true });

    // Initial setup & start
    resize();
    startAnimation();
  }

  // Initialize Dynamic Background Engine
  initDynamicBackground();
});
