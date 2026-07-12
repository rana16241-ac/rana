/* =========================================================
   RANA AWAIS — PORTFOLIO — main.js (vanilla, no dependencies)
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Nav scroll state ---------- */
  var nav = document.querySelector('.nav');
  function onScroll () {
    if (!nav) return;
    if (window.scrollY > 12) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('is-open');
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      toggle.textContent = links.classList.contains('is-open') ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.textContent = '☰';
      });
    });
  }

  /* On mobile, tapping a hover-dropdown trigger (About Me, My Company · NTS)
     first reveals its flyout instead of navigating away immediately
     (progressive disclosure). Applies to every .nav-item-hover on the page. */
  if (window.matchMedia('(max-width: 900px)').matches) {
    document.querySelectorAll('.nav-item-hover').forEach(function (hoverItem) {
      var triggerLink = hoverItem.querySelector(':scope > a');
      if (triggerLink) {
        triggerLink.addEventListener('click', function (e) {
          if (!hoverItem.classList.contains('is-open')) {
            e.preventDefault();
            hoverItem.classList.add('is-open');
          }
        });
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Active nav link by current path ---------- */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[data-page]').forEach(function (a) {
    if (a.getAttribute('data-page') === path) a.classList.add('active');
  });

  /* ---------- Services accordion (services.html) ---------- */
  document.querySelectorAll('[data-toggle-services]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-toggle-services');
      var panel = document.getElementById(targetId);
      if (!panel) return;
      var isOpen = panel.style.display !== 'none' && panel.style.display !== '';
      panel.style.display = isOpen ? 'none' : 'grid';
      btn.textContent = isOpen ? 'View Services' : 'Hide Services';
    });
  });

  /* ---------- Blog filter (blog.html) ---------- */
  var pills = document.querySelectorAll('.filter-pill[data-filter]');
  var blogCards = document.querySelectorAll('.blog-card[data-cat]');
  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      pills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');
      var f = pill.getAttribute('data-filter');
      blogCards.forEach(function (card) {
        var show = f === 'all' || card.getAttribute('data-cat') === f;
        card.style.display = show ? '' : 'none';
      });
    });
  });
  var searchInput = document.querySelector('.blog-search');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var q = searchInput.value.trim().toLowerCase();
      blogCards.forEach(function (card) {
        var text = card.textContent.toLowerCase();
        card.style.display = text.indexOf(q) > -1 ? '' : 'none';
      });
    });
  }

  /* ---------- Newsletter subscribe (mailto capture) ---------- */
  document.querySelectorAll('[data-subscribe]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var list = btn.getAttribute('data-subscribe');
      window.location.href = 'mailto:rranaawais517@gmail.com?subject=' +
        encodeURIComponent('Subscribe: ' + list) +
        '&body=' + encodeURIComponent('Please add me to the "' + list + '" newsletter.');
    });
  });

  /* ---------- Contact form -> WhatsApp / Email ---------- */
  var form = document.getElementById('contact-form');
  if (form) {
    var WHATSAPP_NUMBER = '923052118350'; // international format, no + or leading 0
    var EMAIL = 'rranaawais517@gmail.com';

    function buildMessage () {
      var name = (form.querySelector('#name') || {}).value || '';
      var email = (form.querySelector('#email') || {}).value || '';
      var subject = (form.querySelector('#subject') || {}).value || 'New project inquiry';
      var message = (form.querySelector('#message') || {}).value || '';
      var lines = [
        'Subject: ' + subject,
        'Name: ' + (name || 'N/A'),
        'Email: ' + (email || 'N/A'),
        '',
        message
      ];
      return { subject: subject, text: lines.join('\n') };
    }

    var waBtn = document.getElementById('send-whatsapp');
    var emailBtn = document.getElementById('send-email');

    if (waBtn) {
      waBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var m = buildMessage();
        var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(m.text);
        window.open(url, '_blank');
      });
    }
    if (emailBtn) {
      emailBtn.addEventListener('click', function (e) {
        e.preventDefault();
        var m = buildMessage();
        window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(m.subject) + '&body=' + encodeURIComponent(m.text);
      });
    }
  }

  /* ---------- Service booking modal (services.html) ---------- */
  var bookModal = document.getElementById('book-modal');
  if (bookModal) {
    document.querySelectorAll('[data-open-book]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = btn.getAttribute('data-open-book');
        var groupSelect = document.getElementById('book-group');
        if (groupSelect && group) {
          groupSelect.value = group;
          groupSelect.dispatchEvent(new Event('change'));
        }
        bookModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    });
    var closeBtn = bookModal.querySelector('[data-close-book]');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeBookModal);
    }
    bookModal.addEventListener('click', function (e) {
      if (e.target === bookModal) closeBookModal();
    });
    function closeBookModal () {
      bookModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    var groupSelect = document.getElementById('book-group');
    var serviceSelect = document.getElementById('book-service');
    var serviceMap = {
      'hr': ['Recruitment Strategy', 'Talent Acquisition', 'HR Process Optimization', 'HR Policy Development', 'Organizational Development', 'HR Analytics', 'Employer Branding', 'Workforce Planning', 'Performance Management'],
      'it': ['Website Development', 'Web App Development', 'UI/UX Design', 'SEO Optimization', 'AI Integration', 'CRM Systems', 'API Development', 'SaaS Platforms', 'Cloud Deployment', 'Technical Consulting'],
      'resume': ['Resume Writing', 'Resume Optimization', 'ATS Resume Formatting', 'LinkedIn Profile Optimization', 'LinkedIn Personal Branding', 'Career Positioning', 'Job Application Strategy', 'Interview Preparation', 'Career Coaching']
    };
    function populateServices () {
      if (!groupSelect || !serviceSelect) return;
      var list = serviceMap[groupSelect.value] || [];
      serviceSelect.innerHTML = list.map(function (s) { return '<option>' + s + '</option>'; }).join('');
    }
    if (groupSelect) {
      groupSelect.addEventListener('change', populateServices);
      populateServices();
    }

    var bookForm = document.getElementById('book-form');
    if (bookForm) {
      function bookMessage () {
        var group = groupSelect ? groupSelect.options[groupSelect.selectedIndex].text : '';
        var service = serviceSelect ? serviceSelect.value : '';
        var name = document.getElementById('book-name').value || 'N/A';
        var email = document.getElementById('book-email').value || 'N/A';
        var phone = document.getElementById('book-phone').value || 'N/A';
        var summary = document.getElementById('book-summary').value || '';
        var details = document.getElementById('book-details').value || '';
        var text = [
          'Service booking request',
          'Group: ' + group,
          'Service: ' + service,
          'Name: ' + name,
          'Email: ' + email,
          'Phone: ' + phone,
          summary ? ('Summary: ' + summary) : '',
          details ? ('Details: ' + details) : ''
        ].filter(Boolean).join('\n');
        return text;
      }
      var bookWa = document.getElementById('book-send-whatsapp');
      var bookEmail = document.getElementById('book-send-email');
      if (bookWa) {
        bookWa.addEventListener('click', function (e) {
          e.preventDefault();
          window.open('https://wa.me/923052118350?text=' + encodeURIComponent(bookMessage()), '_blank');
        });
      }
      if (bookEmail) {
        bookEmail.addEventListener('click', function (e) {
          e.preventDefault();
          window.location.href = 'mailto:rranaawais517@gmail.com?subject=' + encodeURIComponent('Service Booking Request') + '&body=' + encodeURIComponent(bookMessage());
        });
      }
    }
  }

  /* ---------- Current year in footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

});
