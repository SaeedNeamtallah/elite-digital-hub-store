(() => {
  'use strict';

  const WHATSAPP_NUMBER = '201006530760';
  const state = { filter: 'all', query: '' };

  const productCards = [...document.querySelectorAll('.product-card')];
  const filterButtons = [...document.querySelectorAll('.filter-tab')];
  const searchInput = document.querySelector('#product-search');
  const emptyState = document.querySelector('#empty-state');
  const resetFilters = document.querySelector('#reset-filters');

  function normalize(value) {
    return String(value)
      .toLocaleLowerCase('ar')
      .normalize('NFD')
      .replace(/[\u064B-\u065F\u0670]/g, '')
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .trim();
  }

  function applyFilters() {
    const query = normalize(state.query);
    let visibleCount = 0;

    productCards.forEach((card) => {
      const matchesCategory = state.filter === 'all' || card.dataset.category === state.filter;
      const matchesSearch = !query || normalize(card.dataset.name).includes(query);
      const visible = matchesCategory && matchesSearch;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    emptyState.hidden = visibleCount > 0;
  }

  function setFilter(filter) {
    state.filter = filter;
    filterButtons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    applyFilters();
  }

  function openWhatsApp(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function orderProduct(button) {
    const product = button.dataset.order;
    const price = button.dataset.price;
    const message = [
      'مرحباً Elite Digital Hub 👋',
      '',
      `أريد طلب: ${product}`,
      `السعر: ${price} جنيه`,
      '',
      'أرجو تأكيد التوفر وبدء التفعيل.'
    ].join('\n');

    openWhatsApp(message);
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => setFilter(button.dataset.filter));
  });

  searchInput.addEventListener('input', () => {
    state.query = searchInput.value;
    applyFilters();
  });

  resetFilters.addEventListener('click', () => {
    searchInput.value = '';
    state.query = '';
    setFilter('all');
    searchInput.focus();
  });

  document.querySelectorAll('[data-order]').forEach((button) => {
    button.addEventListener('click', () => orderProduct(button));
  });

  document.querySelectorAll('[data-whatsapp]').forEach((button) => {
    button.addEventListener('click', () => {
      openWhatsApp('مرحباً Elite Digital Hub، أريد الاستفسار عن الاشتراكات المتاحة.');
    });
  });

  document.querySelector('#current-year').textContent = String(new Date().getFullYear());
  applyFilters();
})();
