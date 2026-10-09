const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('is-open', !expanded);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}));
const dialog = document.querySelector('#brief-dialog');
const form = document.querySelector('#brief-form');
document.querySelector('#open-brief').addEventListener('click', () => dialog.showModal());
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const bounds = dialog.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close(); } });
document.querySelector('[data-interest]').addEventListener('click', event => { event.preventDefault(); form.elements.interest.value = event.currentTarget.dataset.interest; dialog.showModal(); });
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const draft = `Cornell Consulting Consulting Club\nInquiry draft — not submitted\n\nName: ${data.get('name')}\nOrganization: ${data.get('club') || 'Not specified'}\nArea of interest: ${data.get('interest')}\n\n${data.get('message')}\n`;
  const url = URL.createObjectURL(new Blob([draft], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = 'cccc-inquiry-draft.txt'; document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('.form-status').textContent = 'Your draft is ready to download. It has not been submitted.';
});
