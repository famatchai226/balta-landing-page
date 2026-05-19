/**
 * i18n.js — Système de traduction automatique basé sur la langue du navigateur
 * Stratégie : détection de la langue → chargement du JSON → injection dans le DOM via data-i18n
 *
 * Utilisation dans le HTML :
 *   <p data-i18n="hero.badge"></p>               → remplace textContent
 *   <p data-i18n-html="hero.desc"></p>           → remplace innerHTML (pour le HTML enrichi)
 *   <meta data-i18n-attr="content" data-i18n="meta.description"> → met à jour un attribut
 */

(async function () {
  /* ── 1. Détection de la langue ── */
  const SUPPORTED = ['fr', 'en'];
  const DEFAULT_LANG = 'fr';

  /**
   * Retourne le code langue à 2 lettres correspondant au navigateur.
   * Cascade : navigator.languages → navigator.language → DEFAULT_LANG
   */
  function detectLang() {
    const candidates = navigator.languages
      ? [...navigator.languages]
      : [navigator.language || DEFAULT_LANG];

    for (const lang of candidates) {
      const code = lang.split('-')[0].toLowerCase();
      if (SUPPORTED.includes(code)) return code;
    }
    return DEFAULT_LANG;
  }

  const lang = detectLang();

  /* ── 2. Chargement du dictionnaire JSON ── */
  let dict;
  try {
    const res = await fetch(`./locales/${lang}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    dict = await res.json();
  } catch (err) {
    console.warn(`[i18n] Failed to load "${lang}.json", falling back to "${DEFAULT_LANG}".`, err);
    try {
      const fallback = await fetch(`./locales/${DEFAULT_LANG}.json`);
      dict = await fallback.json();
    } catch (e) {
      console.error('[i18n] Could not load any locale file. Skipping translations.', e);
      return;
    }
  }

  /* ── 3. Accès aux clés imbriquées (ex: "hero.badge") ── */
  function get(key) {
    return key.split('.').reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : null), dict);
  }

  /* ── 4. Injection dans le DOM ── */

  // 4a. Texte simple : data-i18n="clé"
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const val = get(key);
    if (val !== null) el.textContent = val;
  });

  // 4b. HTML enrichi : data-i18n-html="clé"
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    const val = get(key);
    if (val !== null) el.innerHTML = val;
  });

  // 4c. Attributs HTML : data-i18n-attr="nomAttribut" + data-i18n="clé"
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const attr = el.getAttribute('data-i18n-attr');
    const key = el.getAttribute('data-i18n');
    const val = get(key);
    if (attr && val !== null) el.setAttribute(attr, val);
  });

  /* ── 5. Mise à jour de <html lang=""> et <title> ── */
  document.documentElement.setAttribute('lang', dict.lang || lang);

  const titleEl = document.querySelector('title');
  if (titleEl && dict.meta && dict.meta.title) {
    titleEl.textContent = dict.meta.title;
  }

  const descEl = document.querySelector('meta[name="description"]');
  if (descEl && dict.meta && dict.meta.description) {
    descEl.setAttribute('content', dict.meta.description);
  }
})();
