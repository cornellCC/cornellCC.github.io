const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); menu.focus();
  }
});
const form = document.querySelector('#brief-form');
if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const draft = `Cornell Consulting Consulting Club\nInquiry draft — not submitted\n\nName: ${data.get('name')}\nOrganization: ${data.get('club') || 'Not specified'}\nArea of interest: ${data.get('interest')}\n\n${data.get('message')}\n`;
  const url = URL.createObjectURL(new Blob([draft], {type: 'text/plain;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = 'cccc-inquiry-draft.txt';
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('.form-status').textContent = 'Your draft is ready to download. It has not been submitted.';
});
