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
});
