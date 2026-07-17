(() => {
  'use strict';

  const WHATSAPP_NUMBER = '201006530760';
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

  document.querySelectorAll('[data-order]').forEach((button) => {
    button.addEventListener('click', () => orderProduct(button));
  });

  document.querySelectorAll('[data-whatsapp]').forEach((button) => {
    button.addEventListener('click', () => {
      openWhatsApp('مرحباً Elite Digital Hub، أريد الاستفسار عن الاشتراكات المتاحة.');
    });
  });

  document.querySelector('#current-year').textContent = String(new Date().getFullYear());
})();
