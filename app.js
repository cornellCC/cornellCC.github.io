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
document.querySelectorAll('[data-profile]').forEach(button => button.addEventListener('click', () => {
  document.getElementById(button.dataset.profile).showModal();
}));
document.querySelectorAll('dialog.profile').forEach(dialog => {
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.querySelector('.profile-close').addEventListener('click', () => dialog.close());
});
const form = document.querySelector('#brief-form');
if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const interest = data.get('interest');
  const subject = `CCCC inquiry: ${interest}`;
  const body = `Hello Cornell Consulting Consulting Club,\n\n${data.get('message')}\n\nName: ${data.get('name')}\nOrganization: ${data.get('club') || 'Not specified'}\nArea of interest: ${interest}`;
  const mailto = `mailto:cornellconsultingconsulting@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('.form-status').textContent = 'Opening a message in your email app…';
  window.location.href = mailto;
});
