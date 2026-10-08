(function () {
  var root = document.documentElement;
  var topics = Array.prototype.slice.call(document.querySelectorAll('details.topic'));

  // ---- Language -----------------------------------------------------------
  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  function setLang(lang) {
    lang = lang === 'en' ? 'en' : 'ar';
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = lang === 'ar'
      ? 'المصادقة متعددة العوامل (MFA) — جامعة الكويت'
      : 'Multifactor Authentication (MFA) — Kuwait University';
    var search = document.getElementById('search');
    search.placeholder = search.getAttribute('data-' + lang);
    store('ku-mfa-lang', lang);
    filter();
  }

  var fromUrl = new URLSearchParams(location.search).get('lang');
  setLang(fromUrl || store('ku-mfa-lang') || 'ar');

  document.getElementById('lang').addEventListener('click', function () {
    setLang(root.lang === 'ar' ? 'en' : 'ar');
  });

  // ---- One topic open at a time, address follows the open topic -----------
  topics.forEach(function (topic) {
    topic.addEventListener('toggle', function () {
      if (!topic.open) {
        if (location.hash === '#' + topic.id) history.replaceState(null, '', location.pathname + location.search);
        return;
      }
      topics.forEach(function (other) { if (other !== topic) other.open = false; });
      history.replaceState(null, '', '#' + topic.id);
    });
  });

  // ---- Direct links: page.html#new-phone opens that answer ----------------
  function openFromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    var node = target;
    while (node) {
      if (node.tagName === 'DETAILS') node.open = true;
      node = node.parentElement;
    }
    setTimeout(function () { target.scrollIntoView({ block: 'start' }); }, 60);
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();

  // ---- Copy a direct link to one answer -----------------------------------
  document.querySelectorAll('.share').forEach(function (button) {
    button.addEventListener('click', function () {
      var topic = button.closest('details.topic');
      var url = location.origin + location.pathname + '?lang=' + root.lang + '#' + topic.id;
      var done = function () {
        var label = button.querySelector(root.lang === 'ar' ? '.ar' : '.en');
        var old = label.textContent;
        label.textContent = root.lang === 'ar' ? 'نُسخ الرابط' : 'Link copied';
        setTimeout(function () { label.textContent = old; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done, function () { window.prompt('', url); });
      } else {
        window.prompt('', url);
      }
    });
  });

  // ---- Search -------------------------------------------------------------
  function normalise(text) {
    return (text || '').toLowerCase()
      .replace(/[ً-ْـ]/g, '')
      .replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
  }

  function filter() {
    var search = document.getElementById('search');
    var query = normalise(search.value.trim());
    var shown = 0;
    topics.forEach(function (topic) {
      var text = '';
      topic.querySelectorAll('.' + root.lang).forEach(function (el) { text += ' ' + el.textContent; });
      text += ' ' + (topic.getAttribute('data-keys') || '');
      var match = !query || normalise(text).indexOf(query) !== -1;
      topic.hidden = !match;
      if (match) shown++;
    });
    document.getElementById('no-match').hidden = shown !== 0;
  }
  document.getElementById('search').addEventListener('input', filter);
})();
