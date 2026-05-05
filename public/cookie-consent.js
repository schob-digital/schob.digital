(function() {
  const COOKIE_NAME = 'schob_cookie_consent';
  const COOKIE_DAYS = 180;

  const COOKIE_TEXT = {
    de: {
      bannerTitle: 'Wir verwenden Cookies',
      bannerText: 'Wir verwenden Cookies, um die Nutzerfreundlichkeit unserer Website zu verbessern. Einige davon sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern.',
      btnNecessary: 'Nur notwendige',
      btnSettings: 'Einstellungen',
      btnAcceptAll: 'Alle akzeptieren',
      modalTitle: 'Cookie-Einstellungen',
      modalText: 'Hier können Sie auswählen, welche Cookies Sie zulassen möchten. Sie können Ihre Einstellungen jederzeit ändern.',
      catNecessary: 'Notwendige Cookies',
      catNecessaryDesc: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht deaktiviert werden.',
      catAnalytics: 'Google Analytics',
      catAnalyticsDesc: 'Diese Cookies helfen uns, das Nutzungsverhalten zu analysieren und unsere Website zu verbessern.',
      detailsText: 'Details anzeigen',
      btnSave: 'Auswahl speichern'
    }
  };

  function getLang() {
    const lang = document.documentElement.lang || 'de';
    return COOKIE_TEXT[lang] ? lang : 'de';
  }

  function getConsent() {
    const value = document.cookie.split('; ').find(row => row.startsWith(COOKIE_NAME + '='));
    if (value) {
      try {
        return JSON.parse(decodeURIComponent(value.split('=')[1]));
      } catch (e) {
        return null;
      }
    }
    return null;
  }

  function setConsent(analytics) {
    const consent = {
      necessary: true,
      analytics: analytics,
      updatedAt: new Date().toISOString()
    };
    const expires = new Date(Date.now() + COOKIE_DAYS * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))}; expires=${expires}; path=/; SameSite=Lax`;
    
    applyConsent(consent);
  }

  function applyConsent(consent) {
    if (consent.analytics) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }
  }

  function enableAnalytics() {
    const gaId = document.body.getAttribute('data-ga-measurement-id');
    if (!gaId) return;

    window[`ga-disable-${gaId}`] = false;

    if (!window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;

      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        gtag('js', new Date());
        gtag('config', gaId, { anonymize_ip: true });
      };
    }
  }

  function disableAnalytics() {
    const gaId = document.body.getAttribute('data-ga-measurement-id');
    if (gaId) {
      window[`ga-disable-${gaId}`] = true;
    }

    const cookies = document.cookie.split('; ');
    const domains = [window.location.hostname, '.' + window.location.hostname, window.location.hostname.replace(/^www\./, ''), '.' + window.location.hostname.replace(/^www\./, '')];

    cookies.forEach(c => {
      const name = c.split('=')[0].trim();
      if (name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name.startsWith('_gat')) {
        domains.forEach(domain => {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
        });
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
  }

  function createCookieUi() {
    const lang = getLang();
    const t = COOKIE_TEXT[lang];

    // Banner
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.hidden = true;
    banner.innerHTML = `
      <h2>${t.bannerTitle}</h2>
      <p>${t.bannerText}</p>
      <div class="cookie-banner-actions">
        <button class="cookie-btn" data-cookie-action="necessary">${t.btnNecessary}</button>
        <button class="cookie-btn" data-cookie-action="settings">${t.btnSettings}</button>
        <button class="cookie-btn primary" data-cookie-action="all">${t.btnAcceptAll}</button>
      </div>
    `;

    // Modal
    const modal = document.createElement('div');
    modal.id = 'cookie-modal';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="cookie-modal-content">
        <div class="cookie-modal-header">
          <h2>${t.modalTitle}</h2>
          <button class="cookie-modal-close" data-cookie-action="close-modal">&times;</button>
        </div>
        <div class="cookie-modal-body">
          <p>${t.modalText}</p>
          
          <div class="cookie-category">
            <div class="cookie-category-header">
              <div class="cookie-category-info">
                <h3>${t.catNecessary}</h3>
                <p>${t.catNecessaryDesc}</p>
              </div>
              <label class="cookie-toggle">
                <input type="checkbox" checked disabled>
                <span class="cookie-slider"></span>
              </label>
            </div>
            <details class="cookie-details">
              <summary>${t.detailsText}</summary>
              <ul>
                <li><strong>${COOKIE_NAME}</strong>: Speichert die Cookie-Einwilligung (180 Tage)</li>
              </ul>
            </details>
          </div>

          <div class="cookie-category">
            <div class="cookie-category-header">
              <div class="cookie-category-info">
                <h3>${t.catAnalytics}</h3>
                <p>${t.catAnalyticsDesc}</p>
              </div>
              <label class="cookie-toggle">
                <input type="checkbox" id="cookie-analytics-toggle">
                <span class="cookie-slider"></span>
              </label>
            </div>
            <details class="cookie-details">
              <summary>${t.detailsText}</summary>
              <ul>
                <li><strong>_ga</strong>: Registriert eine eindeutige ID (2 Jahre)</li>
                <li><strong>_ga_*</strong>: Behält den Sitzungsstatus bei (2 Jahre)</li>
              </ul>
            </details>
          </div>

        </div>
        <div class="cookie-modal-footer">
          <button class="cookie-btn primary" data-cookie-action="save">${t.btnSave}</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);
    document.body.appendChild(modal);

    // Event Delegation
    document.addEventListener('click', (e) => {
      // Buttons that trigger actions
      const btn = e.target.closest('[data-cookie-action]');
      if (btn) {
        const action = btn.getAttribute('data-cookie-action');
        if (action === 'necessary') {
          setConsent(false);
          closeAllUi();
        } else if (action === 'all') {
          setConsent(true);
          closeAllUi();
        } else if (action === 'settings') {
          openModal();
        } else if (action === 'close-modal') {
          closeModal();
        } else if (action === 'save') {
          const analyticsToggle = document.getElementById('cookie-analytics-toggle');
          setConsent(analyticsToggle.checked);
          closeAllUi();
        }
      }

      // Buttons that open settings
      const openBtn = e.target.closest('[data-open-cookie-settings]');
      if (openBtn) {
        e.preventDefault();
        openModal();
      }
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) {
        closeModal();
      }
    });
  }

  function openModal() {
    const modal = document.getElementById('cookie-modal');
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.hidden = true;
    if (modal) {
      modal.hidden = false;
      document.body.classList.add('cookie-modal-open');
      
      // Update toggle to match saved state
      const consent = getConsent();
      const analyticsToggle = document.getElementById('cookie-analytics-toggle');
      if (analyticsToggle) {
        analyticsToggle.checked = consent ? consent.analytics : false;
      }
    }
  }

  function closeModal() {
    const modal = document.getElementById('cookie-modal');
    if (modal) {
      modal.hidden = true;
      document.body.classList.remove('cookie-modal-open');
      
      const consent = getConsent();
      if (!consent) {
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.hidden = false;
      }
    }
  }

  function closeAllUi() {
    const banner = document.getElementById('cookie-banner');
    const modal = document.getElementById('cookie-modal');
    if (banner) banner.hidden = true;
    if (modal) modal.hidden = true;
    document.body.classList.remove('cookie-modal-open');
  }

  function init() {
    const consent = getConsent();
    if (!consent) {
      // Show banner if no consent
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          createCookieUi();
          document.getElementById('cookie-banner').hidden = false;
        });
      } else {
        createCookieUi();
        document.getElementById('cookie-banner').hidden = false;
      }
    } else {
      // Apply consent immediately, inject UI later
      applyConsent(consent);
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createCookieUi);
      } else {
        createCookieUi();
      }
    }
  }

  init();
})();
