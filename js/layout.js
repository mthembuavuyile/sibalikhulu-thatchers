(() => {
  /* ── Templates ─────────────────────────── */
  const NAV_LINKS = [
    { href: 'index.html',    label: 'Home' },
    { href: 'services.html', label: 'Services' },
    { href: 'contact.html',  label: 'Contact' },
  ];

  function buildHeader() {
    const ul = NAV_LINKS.map(l =>
      `<li><a href="${l.href}" class="nav-link">${l.label}</a></li>`
    ).join('');

    return `
      <nav class="navbar">
        <a href="index.html" class="logo">Sibalikhulu <span>Thatchers</span></a>
        <ul class="nav-links" id="navLinks">${ul}</ul>
        <button class="burger" id="burger" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </nav>`;
  }

  function buildFooter() {
    const year = new Date().getFullYear();
    const navItems = NAV_LINKS.map(l =>
      `<li><a href="${l.href}">${l.label}</a></li>`
    ).join('');

    return `
      <div class="footer-inner">
        <div class="footer-col">
          <h4>Sibalikhulu Thatchers</h4>
          <p>Masters of traditional and modern thatching. We bring quality, durability, and character to every outdoor space we touch.</p>
        </div>
        <div class="footer-col">
          <h4>Navigation</h4>
          <ul>${navItems}</ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <p>KwaZulu-Natal, South Africa<br>
             +27 (0) 00 000 0000<br>
             info@sibalikhuluthatchers.co.za</p>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; ${year} Sibalikhulu Thatchers. All Rights Reserved.
      </div>`;
  }

  /* ── Inject ─────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    // Header
    const header = document.createElement('header');
    header.innerHTML = buildHeader();
    document.body.insertBefore(header, document.body.firstChild);

    // Footer
    const footer = document.createElement('footer');
    footer.innerHTML = buildFooter();
    document.body.appendChild(footer);

    /* Active link */
    let page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(a => {
      if (a.getAttribute('href') === page) a.classList.add('active');
    });

    /* Scroll → header shadow */
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    /* Mobile burger */
    const burger   = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');

    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    /* Close on link click */
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });
  });
})();