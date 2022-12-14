
import '../scss/app.scss';

import Swup from '../../../swup/src/index.js';

const options = {
  containers: ['#swup', '#nav'],
  cache: true,
  linkSelector: `a[href^="${window.location.origin}"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])`,
  plugins: [],
};

const swup = new Swup(options);
window.swup = swup;

let modalCloseUrl = null;
const setModalCloseUrl = e => {
  const wasFilterSet = Boolean(new URL(window.location.href).searchParams.get('filter'));
  if( wasFilterSet ) modalCloseUrl = window.location.href;
}
swup.on('transitionStart', setModalCloseUrl);

const applyModalCloseUrl = e => {
  if( modalCloseUrl == null ) return;
  document.querySelectorAll('[data-apply-modal-close-url]').forEach(el => el.href = modalCloseUrl);
}
swup.on('contentReplaced', applyModalCloseUrl);

const closeModalOnEscape = e => {
  if( e.key !== 'Escape' ) return;
  const closeLink = document.querySelector('a.character_close');
  if( !closeLink ) return;
  closeLink.click();
}
window.addEventListener('keydown', closeModalOnEscape)