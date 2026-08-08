// ===== STATE =====
let state = {
  lang: localStorage.getItem('bjarmkirja-lang') || 'ru',
  search: '',
  category: 'all',
  route: window.location.hash || '#/',
  scrollY: 0
};

const t = (key) => DB.translations[state.lang][key] || key;
const getVal = (field) => {
  if (typeof field === 'string') return field;
  return field[state.lang] || field.ru || field.en || '';
};

// ===== FILTER =====
function filterItems(items) {
  return items.filter(item => {
    const matchesSearch = !state.search || 
      getVal(item.title).toLowerCase().includes(state.search.toLowerCase()) ||
      getVal(item.author).toLowerCase().includes(state.search.toLowerCase()) ||
      getVal(item.description).toLowerCase().includes(state.search.toLowerCase());
    const matchesCategory = state.category === 'all' || item.category === state.category;
    return matchesSearch && matchesCategory;
  });
}

// ===== ROUTER =====
function router() {
  const hash = window.location.hash || '#/';
  state.route = hash;
  const app = document.getElementById('app');
  const searchBar = document.getElementById('search-bar');

  if (hash === '#/' || hash === '') {
    searchBar.style.display = 'block';
    app.innerHTML = renderHome();
  } else if (hash.startsWith('#/catalog/books')) {
    searchBar.style.display = 'block';
    app.innerHTML = renderCatalog('books');
  } else if (hash.startsWith('#/catalog/articles')) {
    searchBar.style.display = 'block';
    app.innerHTML = renderCatalog('articles');
  } else if (hash.startsWith('#/book/')) {
    const id = hash.replace('#/book/', '');
    searchBar.style.display = 'none';
    app.innerHTML = renderDetail('book', id);
  } else if (hash.startsWith('#/article/')) {
    const id = hash.replace('#/article/', '');
    searchBar.style.display = 'none';
    app.innerHTML = renderDetail('article', id);
  } else if (hash.startsWith('#/image/')) {
    const id = hash.replace('#/image/', '');
    searchBar.style.display = 'none';
    app.innerHTML = renderDetail('image', id);
  } else {
    searchBar.style.display = 'block';
    app.innerHTML = renderHome();
  }

  updateNavActive();
}

// ===== UPDATE NAV =====
function updateNavActive() {
  const hash = window.location.hash || '#/';
  document.querySelectorAll('.header-nav .nav-btn').forEach(btn => {
    const href = btn.getAttribute('href');
    btn.classList.toggle('active', hash === href || hash.startsWith(href + '/'));
  });
}

// ===== UPDATE NAV TEXTS =====
function updateNavTexts() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && DB.translations[state.lang][key]) {
      el.textContent = DB.translations[state.lang][key];
    }
  });
}

// ===== RENDER SEARCH BAR =====
function renderSearchBar() {
  const container = document.getElementById('search-bar');
  if (!container) return;
  container.innerHTML = `
    <div class="search-bar">
      <div class="search-inner">
        <div class="search-input-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" class="search-input" placeholder="${t('search')}..." 
            value="${state.search}" oninput="onSearch(this.value)">
        </div>
        <select class="category-select" onchange="onCategory(this.value)">
          ${DB.categories.map(c => 
            `<option value="${c.id}" ${state.category === c.id ? 'selected' : ''}>
              ${c.icon} ${c.id === 'all' ? t('all') : t(c.id)}
            </option>`
          ).join('')}
        </select>
      </div>
    </div>
  `;
}

// ===== RENDER HOME =====
function renderHome() {
  const featuredItems = [
    ...DB.books.filter(b => b.featured),
    ...DB.articles.filter(a => a.featured),
    ...DB.images.filter(i => i.featured)
  ];
  const allImages = filterItems(DB.images);

  return `
    <main class="main">
      ${featuredItems.length > 0 ? `
      <section class="section">
        <div class="section-header">
          <h2 class="section-title"><span class="icon">★</span> ${t('featured')}</h2>
        </div>
        <div class="grid compact">
          ${featuredItems.map(item => renderCard(item)).join('')}
        </div>
      </section>
      ` : ''}

      <section class="section">
        <div class="section-header">
          <h2 class="section-title"><span class="icon">✻</span> ${t('gallery')}</h2>
        </div>
        <div class="grid gallery">
          ${allImages.map(item => renderGalleryCard(item)).join('')}
        </div>
        ${allImages.length === 0 ? renderEmpty() : ''}
      </section>
    </main>
  `;
}

// ===== RENDER CATALOG =====
function renderCatalog(type) {
  const items = type === 'books' ? filterItems(DB.books) : filterItems(DB.articles);
  const title = type === 'books' ? t('catalogBooks') : t('catalogArticles');
  const icon = type === 'books' ? '◈' : '◉';

  return `
    <main class="main">
      <section class="section">
        <div class="section-header">
          <h2 class="section-title"><span class="icon">${icon}</span> ${title}</h2>
          <span class="section-more">${items.length} ${type === 'books' ? t('books').toLowerCase() : t('articles').toLowerCase()}</span>
        </div>
        <div class="grid ${type === 'articles' ? 'articles' : ''}">
          ${items.map(item => type === 'books' ? renderCard(item) : renderArticleCard(item)).join('')}
        </div>
        ${items.length === 0 ? renderEmpty() : ''}
      </section>
    </main>
  `;
}

// ===== CARDS =====
function renderCard(item) {
  const title = getVal(item.title);
  const author = getVal(item.author);
  const desc = getVal(item.description);
  const typeLabel = item.type === 'book' ? t('books') : item.type === 'article' ? t('articles') : t('gallery');
  const langs = item.contentLang ? item.contentLang.map(l => l.toUpperCase()).join(' · ') : '';

  return `
    <div class="card" onclick="goTo('${item.type}', '${item.id}')">
      <div class="card-cover">
        ${item.cover ? `<img src="${item.cover}" alt="${title}" loading="lazy">` : `<div class="card-cover-placeholder">📖</div>`}
        <span class="card-type-badge">${typeLabel}</span>
      </div>
      <div class="card-body">
        <div class="card-title">${title}</div>
        <div class="card-meta">${author} · ${t(item.category)}${langs ? ' · ' + langs : ''}</div>
        <div class="card-desc">${desc}</div>
        <div class="card-footer">
          <span class="card-btn primary">${item.type === 'book' ? t('read') : t('view')}</span>
        </div>
      </div>
    </div>
  `;
}

function renderArticleCard(item) {
  const title = getVal(item.title);
  const author = getVal(item.author);
  const desc = getVal(item.description);

  return `
    <div class="article-card" onclick="goTo('article', '${item.id}')">
      ${item.cover ? `
      <div class="article-card-img">
        <img src="${item.cover}" alt="${title}" loading="lazy">
      </div>` : ''}
      <div class="article-card-body">
        <div class="article-card-title">${title}</div>
        <div class="article-card-meta">${author} · ${t(item.category)}</div>
        <div class="article-card-desc">${desc}</div>
      </div>
    </div>
  `;
}

function renderGalleryCard(item) {
  const title = getVal(item.title);
  const author = getVal(item.author);

  return `
    <div class="gallery-card" onclick="goTo('image', '${item.id}')">
      <div class="gallery-card-img">
        <img src="${item.file}" alt="${title}" loading="lazy" 
          onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=font-size:40px;opacity:0.15>🖼️</div>'">
      </div>
      <div class="gallery-card-info">
        <div class="gallery-card-title">${title}</div>
        <div class="gallery-card-meta">${author}</div>
      </div>
    </div>
  `;
}

function renderEmpty() {
  return `
    <div class="empty">
      <div class="empty-icon">◈</div>
      <div class="empty-title">${t('noResults')}</div>
      <div class="empty-text">${t('selectCategory')}</div>
    </div>
  `;
}

// ===== MARKDOWN RENDERER =====
function renderMarkdown(text) {
  text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const blocks = text.split(/\n\n+/);
  let html = '';
  let inList = false;
  let listType = '';

  for (let block of blocks) {
    block = block.trim();
    if (!block) continue;

    if (inList && !block.match(/^[-*\d]\.\s/)) {
      html += listType === 'ul' ? '</ul>' : '</ol>';
      inList = false;
    }

    if (block.match(/^#{1,6}\s/)) {
      const level = block.match(/^(#{1,6})\s/)[1].length;
      const content = block.replace(/^#{1,6}\s/, '');
      html += `<h${level}>${inlineFormat(content)}</h${level}>`;
      continue;
    }

    if (block.match(/^>\s/)) {
      const content = block.replace(/^>\s?/gm, '');
      html += `<blockquote>${inlineFormat(content)}</blockquote>`;
      continue;
    }

    if (block.match(/^[-*]\s/m)) {
      if (!inList || listType !== 'ul') {
        if (inList) html += listType === 'ul' ? '</ul>' : '</ol>';
        html += '<ul>';
        inList = true;
        listType = 'ul';
      }
      const lines = block.split('\n');
      for (const line of lines) {
        const m = line.match(/^[-*]\s(.+)$/);
        if (m) html += `<li>${inlineFormat(m[1])}</li>`;
      }
      continue;
    }

    if (block.match(/^\d+\.\s/m)) {
      if (!inList || listType !== 'ol') {
        if (inList) html += listType === 'ul' ? '</ul>' : '</ol>';
        html += '<ol>';
        inList = true;
        listType = 'ol';
      }
      const lines = block.split('\n');
      for (const line of lines) {
        const m = line.match(/^\d+\.\s(.+)$/);
        if (m) html += `<li>${inlineFormat(m[1])}</li>`;
      }
      continue;
    }

    html += `<p>${inlineFormat(block)}</p>`;
  }

  if (inList) html += listType === 'ul' ? '</ul>' : '</ol>';

  return `<div class="markdown-body">${html}</div>`;
}

function inlineFormat(text) {
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  text = text.replace(/\n/g, '<br>');
  return text;
}

// ===== DETAIL PAGE =====
function renderDetail(type, id) {
  const collection = type === 'book' ? DB.books : type === 'article' ? DB.articles : DB.images;
  const item = collection.find(i => i.id === id);
  if (!item) return renderHome();

  const title = getVal(item.title);
  const author = getVal(item.author);
  const desc = getVal(item.description);
  const isImage = type === 'image';
  const isBook = type === 'book';
  const isMk = item.file && item.file.toLowerCase().endsWith('.mk');

  let fileButtons = '';
  let viewerContent = '';
  let actionButtons = '';

  if (isBook && item.files) {
    const langs = Object.keys(item.files);
    const defaultLang = item.files[state.lang] ? state.lang : langs[0];

    if (langs.length > 1) {
      fileButtons = `
        <div class="version-selector">
          <span class="version-label">${t('selectVersion')}</span>
          <div class="version-btns">
            ${langs.map(l => `
              <button class="version-btn ${l === defaultLang ? 'active' : ''}" 
                onclick="selectVersion('${item.id}', '${l}')">${l.toUpperCase()}</button>
            `).join('')}
          </div>
        </div>
      `;
    }

    const defaultFile = item.files[defaultLang];
    viewerContent = `<iframe src="${defaultFile}" id="book-viewer" title="${title}"></iframe>`;

    // AI badge только для EN версии
    const aiBadge = (item.isAITranslated && defaultLang === 'en') ? `<div class="ai-badge">${t('aiTranslated')}</div>` : '';

    actionButtons = `
      <div class="detail-actions" id="detail-actions">
        ${langs.map(l => `
          <a href="${item.files[l]}" target="_blank" class="detail-btn primary lang-action-${l}" 
            style="${l !== defaultLang ? 'display:none;' : ''}">
            ${t('openInBrowser')} (${l.toUpperCase()})
          </a>
          <a href="${item.files[l]}" download class="detail-btn secondary lang-action-${l}" 
            style="${l !== defaultLang ? 'display:none;' : ''}">
            ${t('download')} (${l.toUpperCase()})
          </a>
        `).join('')}
      </div>
      ${aiBadge}
    `;
  } else if (isImage) {
    viewerContent = `<img src="${item.file}" alt="${title}" style="max-width:100%; border-radius:8px;">`;
    // Нет кнопки скачать для картинок
    actionButtons = '';
  } else if (isMk) {
    viewerContent = `<div id="mk-content" style="min-height:400px;"><p style="color:var(--text-muted);text-align:center;padding:40px;">Загрузка...</p></div>`;
    setTimeout(() => loadMarkdown(item.file, 'mk-content'), 10);
    actionButtons = `
      <div class="detail-actions">
        <a href="${item.file}" download class="detail-btn secondary">${t('download')} .mk</a>
      </div>
    `;
  } else {
    viewerContent = `<iframe src="${item.file}" title="${title}"></iframe>`;
    actionButtons = `
      <div class="detail-actions">
        <a href="${item.file}" target="_blank" class="detail-btn primary">${t('openInBrowser')}</a>
        <a href="${item.file}" download class="detail-btn secondary">${t('download')}</a>
      </div>
    `;
  }

  return `
    <main class="main detail-page">
      <a href="#/" class="detail-back">${t('back')}</a>

      <div class="detail-header">
        <span class="detail-type">${t(type === 'book' ? 'books' : type === 'article' ? 'articles' : 'gallery')}</span>
        <h1 class="detail-title">${title}</h1>
        <div class="detail-meta">
          <span>✎ ${author}</span>
          <span>◈ ${t(item.category)}</span>
          ${item.contentLang ? `<span>🌐 ${item.contentLang.map(l => l.toUpperCase()).join(', ')}</span>` : ''}
        </div>
        <p class="detail-desc">${desc}</p>
        ${fileButtons}
        ${actionButtons}
      </div>

      <div class="content-viewer" id="content-viewer">
        ${viewerContent}
      </div>
    </main>
  `;
}

// Load markdown file
function loadMarkdown(url, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  fetch(url)
    .then(r => r.text())
    .then(text => {
      container.innerHTML = renderMarkdown(text);
    })
    .catch(err => {
      container.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:40px;">
        Не удалось загрузить файл.<br>Для локального просмотра откройте сайт через сервер (GitHub Pages и т.д.)<br><br>
        <a href="${url}" download class="detail-btn primary">Скачать файл</a>
      </p>`;
    });
}

// ===== SELECT VERSION =====
function selectVersion(bookId, lang) {
  const book = DB.books.find(b => b.id === bookId);
  if (!book || !book.files[lang]) return;

  const viewer = document.getElementById('book-viewer');
  if (viewer) viewer.src = book.files[lang];

  document.querySelectorAll('.version-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.toLowerCase() === lang);
  });

  document.querySelectorAll('[class*="lang-action-"]').forEach(btn => {
    const btnLang = btn.className.match(/lang-action-([a-z]+)/)?.[1];
    btn.style.display = btnLang === lang ? 'inline-flex' : 'none';
  });

  // Показать/скрыть плашку ИИ
  const aiBadge = document.querySelector('.ai-badge');
  if (aiBadge) {
    aiBadge.style.display = (book.isAITranslated && lang === 'en') ? 'inline-flex' : 'none';
  }
}

// ===== ACTIONS =====
function goTo(type, id) {
  window.location.hash = `#/${type}/${id}`;
}

function onSearch(value) {
  state.search = value;
  const app = document.getElementById('app');
  if (state.route === '#/' || state.route === '' || state.route.startsWith('#/catalog/')) {
    router();
  }
}

function onCategory(value) {
  state.category = value;
  const app = document.getElementById('app');
  if (state.route === '#/' || state.route === '' || state.route.startsWith('#/catalog/')) {
    router();
  }
}

function setLang(lang) {
  // Сохраняем позицию скролла
  const scrollY = window.scrollY;

  state.lang = lang;
  localStorage.setItem('bjarmkirja-lang', lang);
  updateLangButtons();
  updateNavTexts();
  renderSearchBar();
  router();
  updateHeaderText();

  // Восстанавливаем позицию скролла
  setTimeout(() => window.scrollTo(0, scrollY), 0);
}

function updateLangButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === state.lang);
  });
}

function updateHeaderText() {
  const tagline = document.querySelector('.logo-tagline');
  if (tagline) tagline.textContent = t('tagline');
}

// ===== INIT =====
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
  updateLangButtons();
  updateNavTexts();
  renderSearchBar();
  router();
});
