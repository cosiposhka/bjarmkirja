// ===== STATE =====
let state = {
  lang: localStorage.getItem('bjarmkirja-lang') || 'ru',
  search: '',
  category: 'all',
  theme: localStorage.getItem('bjarmkirja-theme') || 'light',
  route: window.location.hash || '#/'
};

const t = (key) => DB.translations[state.lang][key] || key;
const getVal = (field) => {
  if (typeof field === 'string') return field;
  return field[state.lang] || field.ru || field.en || '';
};

// ===== THEME =====
function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem('bjarmkirja-theme', state.theme);
}
function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  applyTheme();
}

// ===== SORT BY DATE (newest first) =====
function sortByDate(items) {
  return [...items].sort((a, b) => (b.date || '1900-01-01').localeCompare(a.date || '1900-01-01'));
}
function takeLast(items, n) {
  return sortByDate(items).slice(0, n);
}

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
    app.innerHTML = renderMain();
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
    app.innerHTML = renderMain();
  }

  window.scrollTo(0, 0);
}

// ===== RENDER SEARCH BAR (once) =====
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

// ===== RENDER MAIN CONTENT =====
function renderMain() {
  const allBooks = filterItems(DB.books);
  const allArticles = filterItems(DB.articles);
  const allImages = filterItems(DB.images);

  // Featured — ручной выбор через featured: true
  const featuredItems = [
    ...DB.books.filter(b => b.featured),
    ...DB.articles.filter(a => a.featured),
    ...DB.images.filter(i => i.featured)
  ];

  // Последние 6 книг и статей
  const lastBooks = takeLast(allBooks, 6);
  const lastArticles = takeLast(allArticles, 6);

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
          <h2 class="section-title"><span class="icon">◈</span> ${t('books')}</h2>
          ${allBooks.length > 6 ? `<span class="section-more">${t('lastAdded')}</span>` : ''}
        </div>
        <div class="grid">
          ${lastBooks.map(item => renderCard(item)).join('')}
        </div>
        ${lastBooks.length === 0 ? renderEmpty() : ''}
      </section>

      <section class="section">
        <div class="section-header">
          <h2 class="section-title"><span class="icon">◉</span> ${t('articles')}</h2>
          ${allArticles.length > 6 ? `<span class="section-more">${t('lastAdded')}</span>` : ''}
        </div>
        <div class="grid articles">
          ${lastArticles.map(item => renderArticleCard(item)).join('')}
        </div>
        ${lastArticles.length === 0 ? renderEmpty() : ''}
      </section>

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
  // Escape HTML
  text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Split into blocks
  const blocks = text.split(/\n\n+/);
  let html = '';
  let inList = false;
  let listType = '';

  for (let block of blocks) {
    block = block.trim();
    if (!block) continue;

    // Close list if needed
    if (inList && !block.match(/^[-*\d]\.\s/)) {
      html += listType === 'ul' ? '</ul>' : '</ol>';
      inList = false;
    }

    // Headers
    if (block.match(/^#{1,6}\s/)) {
      const level = block.match(/^(#{1,6})\s/)[1].length;
      const content = block.replace(/^#{1,6}\s/, '');
      html += `<h${level}>${inlineFormat(content)}</h${level}>`;
      continue;
    }

    // Blockquote
    if (block.match(/^>\s/)) {
      const content = block.replace(/^>\s?/gm, '');
      html += `<blockquote>${inlineFormat(content)}</blockquote>`;
      continue;
    }

    // Unordered list
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

    // Ordered list
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

    // Regular paragraph
    html += `<p>${inlineFormat(block)}</p>`;
  }

  if (inList) html += listType === 'ul' ? '</ul>' : '</ol>';

  return `<div class="markdown-body">${html}</div>`;
}

function inlineFormat(text) {
  // Code
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Bold
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Italic
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // Links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  // Line breaks within block
  text = text.replace(/\n/g, '<br>');
  return text;
}

// ===== DETAIL PAGE =====
function renderDetail(type, id) {
  const collection = type === 'book' ? DB.books : type === 'article' ? DB.articles : DB.images;
  const item = collection.find(i => i.id === id);
  if (!item) return renderMain();

  const title = getVal(item.title);
  const author = getVal(item.author);
  const desc = getVal(item.description);
  const isImage = type === 'image';
  const isBook = type === 'book';
  const isMk = item.file && item.file.toLowerCase().endsWith('.mk');

  // AI badge
  const aiBadge = item.isAITranslated ? `<div class="ai-badge">${t('aiTranslated')}</div>` : '';

  // For books with multiple files
  let fileButtons = '';
  let viewerContent = '';
  let actionButtons = '';

  if (isBook && item.files) {
    const langs = Object.keys(item.files);
    if (langs.length > 1) {
      fileButtons = `
        <div class="version-selector">
          <span class="version-label">${t('selectVersion')}</span>
          <div class="version-btns">
            ${langs.map(l => `
              <button class="version-btn ${l === state.lang ? 'active' : ''}" 
                onclick="selectVersion('${item.id}', '${l}')">${l.toUpperCase()}</button>
            `).join('')}
          </div>
        </div>
      `;
    }
    const defaultLang = item.files[state.lang] ? state.lang : langs[0];
    const defaultFile = item.files[defaultLang];
    viewerContent = `<iframe src="${defaultFile}" id="book-viewer" title="${title}"></iframe>`;

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
    `;
  } else if (isImage) {
    viewerContent = `<img src="${item.file}" alt="${title}" style="max-width:100%; border-radius:8px;">`;
    actionButtons = `<div class="detail-actions"><a href="${item.file}" download class="detail-btn primary">${t('download')}</a></div>`;
  } else if (isMk) {
    // Markdown file — load and render
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
        ${aiBadge}
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
}

// ===== ACTIONS =====
function goTo(type, id) {
  window.location.hash = `#/${type}/${id}`;
}

function onSearch(value) {
  state.search = value;
  // Re-render only main content, not search bar
  const app = document.getElementById('app');
  if (state.route === '#/' || state.route === '') {
    app.innerHTML = renderMain();
  }
}

function onCategory(value) {
  state.category = value;
  const app = document.getElementById('app');
  if (state.route === '#/' || state.route === '') {
    app.innerHTML = renderMain();
  }
}

function setLang(lang) {
  state.lang = lang;
  localStorage.setItem('bjarmkirja-lang', lang);
  updateLangButtons();
  renderSearchBar();
  router();
  updateHeaderText();
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
  applyTheme();
  updateLangButtons();
  renderSearchBar();
  router();
});
