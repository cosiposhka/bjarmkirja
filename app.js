// ===== STATE =====
let state = {
  lang: localStorage.getItem('bjarmkirja-lang') || 'ru',
  search: '',
  category: 'all',
  route: window.location.hash || '#/'
};

const t = (key) => DB.translations[state.lang][key] || key;
const getVal = (field) => {
  if (typeof field === 'string') return field;
  return field[state.lang] || field.ru || field.en || '';
};

// ===== ROUTER =====
function router() {
  const hash = window.location.hash || '#/';
  state.route = hash;
  const app = document.getElementById('app');

  if (hash === '#/' || hash === '') {
    app.innerHTML = renderHome();
  } else if (hash.startsWith('#/book/')) {
    const id = hash.replace('#/book/', '');
    app.innerHTML = renderDetail('book', id);
  } else if (hash.startsWith('#/article/')) {
    const id = hash.replace('#/article/', '');
    app.innerHTML = renderDetail('article', id);
  } else if (hash.startsWith('#/image/')) {
    const id = hash.replace('#/image/', '');
    app.innerHTML = renderDetail('image', id);
  } else {
    app.innerHTML = renderHome();
  }
  window.scrollTo(0, 0);
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

// ===== RENDER HOME =====
function renderHome() {
  const featured = DB.books.filter(b => b.featured);
  const articles = DB.articles;
  const images = DB.images;

  return `
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

    <main class="main">
      <section class="section">
        <h2 class="section-title"><span class="icon">★</span> ${t('featured')}</h2>
        <div class="grid compact">
          ${featured.map(item => renderCard(item)).join('')}
        </div>
      </section>

      <section class="section">
        <h2 class="section-title"><span class="icon">◈</span> ${t('books')}</h2>
        <div class="grid">
          ${filterItems(DB.books).map(item => renderCard(item)).join('')}
        </div>
        ${filterItems(DB.books).length === 0 ? renderEmpty() : ''}
      </section>

      <section class="section">
        <h2 class="section-title"><span class="icon">◉</span> ${t('articles')}</h2>
        <div class="grid articles">
          ${filterItems(DB.articles).map(item => renderArticleCard(item)).join('')}
        </div>
        ${filterItems(DB.articles).length === 0 ? renderEmpty() : ''}
      </section>

      <section class="section">
        <h2 class="section-title"><span class="icon">✻</span> ${t('gallery')}</h2>
        <div class="grid gallery">
          ${filterItems(DB.images).map(item => renderGalleryCard(item)).join('')}
        </div>
        ${filterItems(DB.images).length === 0 ? renderEmpty() : ''}
      </section>
    </main>
  `;
}

// ===== CARDS =====
function renderCard(item) {
  const title = getVal(item.title);
  const author = getVal(item.author);
  const desc = getVal(item.description);
  const typeLabel = item.type === 'book' ? t('books') : item.type;

  return `
    <div class="card" onclick="goTo('${item.type}', '${item.id}')">
      <div class="card-cover">
        ${item.cover ? `<img src="${item.cover}" alt="${title}">` : `<div class="card-cover-placeholder">📖</div>`}
        <span class="card-type-badge">${typeLabel}</span>
      </div>
      <div class="card-body">
        <div class="card-title">${title}</div>
        <div class="card-meta">${author} · ${t(item.category)}</div>
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
      ${item.cover ? `<img src="${item.cover}" alt="${title}" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:8px;margin-bottom:12px;">` : ''}
      <div class="article-card-title">${title}</div>
      <div class="article-card-meta">${author} · ${t(item.category)}</div>
      <div class="article-card-desc">${desc}</div>
    </div>
  `;
}

function renderGalleryCard(item) {
  const title = getVal(item.title);
  const author = getVal(item.author);

  return `
    <div class="gallery-card" onclick="goTo('image', '${item.id}')">
      <div class="gallery-card-img">
        <img src="${item.file}" alt="${title}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=font-size:40px;opacity:0.15>🖼️</div>'">
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
      <div class="empty-text">Попробуйте изменить запрос или категорию</div>
    </div>
  `;
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
  const isArticle = type === 'article';
  const isPdf = item.file && item.file.toLowerCase().endsWith('.pdf');

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
        <div class="detail-actions">
          ${isImage 
            ? `<a href="${item.file}" download class="detail-btn primary">${t('download')}</a>`
            : `<a href="${item.file}" target="_blank" class="detail-btn primary">${t('openInBrowser')}</a>
               <a href="${item.file}" download class="detail-btn secondary">${t('download')}</a>`
          }
        </div>
      </div>

      <div class="content-viewer">
        ${isImage 
          ? `<img src="${item.file}" alt="${title}" style="max-width:100%; border-radius:8px;">`
          : isPdf
            ? `<iframe src="${item.file}" title="${title}" style="width:100%;min-height:800px;border:none;border-radius:8px;"></iframe>`
            : `<iframe src="${item.file}" title="${title}" style="width:100%;min-height:600px;border:none;border-radius:8px;"></iframe>`
        }
      </div>
    </main>
  `;
}

// ===== ACTIONS =====
function goTo(type, id) {
  window.location.hash = `#/${type}/${id}`;
}

function onSearch(value) {
  state.search = value;
  router();
}

function onCategory(value) {
  state.category = value;
  router();
}

function setLang(lang) {
  state.lang = lang;
  localStorage.setItem('bjarmkirja-lang', lang);
  updateLangButtons();
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
  updateLangButtons();
  router();
});
